
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');

const MongoStore = require('connect-mongo')(session);

const config = require('./config');
const routes = require('./routes');

//database
mongoose.Promise = global.Promise;
mongoose.set('debug', config.IS_PRODUCTION);
mongoose.connection
  .on('error', error => console.log(error))
  .on('close', () => console.log('Database connection closed.'))
  .once('open', () => {
    const info = mongoose.connections[0];
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  });

mongoose.connect(config.MONGO_URL, { useMongoClient: true });

//express
const app = express();

// sessions
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

//sets and uses
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  '/javascripts',
  express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist'))
);

//routes
app.get('/', (req, res) => {
  const id = req.session.userId;
  const login = req.session.userLogin;
  const admin = req.session.userAdmin;
  const logist = req.session.userLogist;
  const accountant = req.session.userAccountant;
  const accountantnotnal = req.session.userAccountantnotnal;
  const manager = req.session.userManager;
  const ban = req.session.userBan;
  
  res.render('index', {
    user: {
      id,
      login,
      admin,
      logist,
      accountant,
      manager,
      accountantnotnal,
      ban
    }
  });
});
app.get('/sign_in', (req, res) => {
  res.render('sign_in');
});
app.get('/sign_up', (req, res) => {
  res.render('sign_up');
});



app.use('/api/auth', routes.auth);
app.use('/post', routes.post);
app.use('/tables', routes.my_table);
app.use('/tables', routes.client);
app.use('/products', routes.product);
app.use('/products', routes.productadd);
app.use('/allusers', routes.alluser);
app.use('/productsedit', routes.productedit);
app.use('/clientborgs', routes.clientborg);
app.use('/allselers', routes.allseler);
app.use('/allselers', routes.allseler);
app.use('/clientpiths', routes.clientpith);
app.use('/pithsedit', routes.pithedit);
app.use('/moneys', routes.money);
app.use('/mypays', routes.mypay);
app.use('/paynotnals', routes.paynotnal);
app.use('/paynals', routes.paynal);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render('error', {
    message: error.message,
    error: !config.IS_PRODUCTION ? error : {}
  });
});


app.listen(config.PORT, () => 
console.log(`Example app listening on port ${config.PORT}!`)
);