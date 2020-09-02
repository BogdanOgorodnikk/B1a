const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const models = require('../models');
const user = require('../models/user');


router.get('/', (req, res) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const useradmin = req.session.userAdmin;
  if(!userId || !userLogin || !useradmin) {
    res.redirect('/');
  } else {
  models.User.find({
    
  }).then(users => {
      res.render('allusers/alluser', {
        users,
        user: {
          id: userId,
          login: userLogin,
          admin: useradmin
        }
     });
  })
  }
});

router.get('/:id', (req, res, next) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const useradmin = req.session.userAdmin;
  const id = req.params.id.trim().replace(/ +(?= )/g, '');
  
  if(!userId || !userLogin || !useradmin) {
    res.redirect('/');
  } else {
    if (!id) {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    } else {
      models.User.findById(id
      )
      .then(users => {
        res.render('allusers/alluseredit', {
          users,
          user: {
            id: userId,
            login: userLogin,
            admin: useradmin
          }
        });
        console.log(login);
      })
    }   
  }
});


router.get('/changepass/:id', (req, res, next) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const useradmin = req.session.userAdmin;
  const id = req.params.id.trim().replace(/ +(?= )/g, '');
  
  if(!userId || !userLogin || !useradmin) {
    res.redirect('/');
  } else {
    if (!id) {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    } else {
      models.User.findById(id
      )
      .then(users => {
        res.render('allusers/changepass', {
          users,
          user: {
            id: userId,
            login: userLogin,
            admin: useradmin
          }
        });
        console.log(login);
      })
    }   
  }
});

router.get('/changepass/:id/:password', (req, res, next) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const useradmin = req.session.userAdmin;
  const id = req.params.id.trim().replace(/ +(?= )/g, '');
  const password = req.params.password.trim().replace(/ +(?= )/g, '');


  
  if(!userId || !userLogin || !useradmin) {
    res.redirect('/');
  } else {
    if (!id) {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    } else {
      bcrypt.hash(password, null, null, (err, hash) => { 
       models.User.findByIdAndUpdate(id, {
        password: hash
        }, {new: true}
      )
      .then(users => {
        res.render('allusers/changepass', {
          users,
          user: {
            id: userId,
            login: userLogin,
            admin: useradmin
          }
        });
        res.redirect('back');
      }) 
      })
      
    }   
  }
});

router.get('/:id/:login/:isAdmin/:isLogist/:isAccountant/:isAccountantnotnal/:isManager/:ban', (req, res, next) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const useradmin = req.session.userAdmin;
  const id = req.params.id.trim().replace(/ +(?= )/g, '');
  const login = req.params.login.trim().replace(/ +(?= )/g, '');
  const isAdmin = req.params.isAdmin.trim().replace(/ +(?= )/g, '');
  const isLogist = req.params.isLogist.trim().replace(/ +(?= )/g, '');
  const isAccountant = req.params.isAccountant.trim().replace(/ +(?= )/g, '');
  const isAccountantnotnal = req.params.isAccountantnotnal.trim().replace(/ +(?= )/g, '');
  const isManager = req.params.isManager.trim().replace(/ +(?= )/g, '');
  const ban = req.params.ban.trim().replace(/ +(?= )/g, '');


  
  if(!userId || !userLogin || !useradmin) {
    res.redirect('/');
  } else {
    if (!id) {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    } else {
       models.User.findByIdAndUpdate(id, {
        login: login, 
        isAdmin: isAdmin, 
        isLogist: isLogist, 
        isAccountant: isAccountant,
        isAccountantnotnal: isAccountantnotnal, 
        isManager: isManager,
        ban: ban
        }, {new: true}
      )
      .then(users => {
        res.render('allusers/alluserdone', {
          users,
          user: {
            id: userId,
            login: userLogin,
            admin: useradmin
          }
        });
        res.redirect('back');
      })
      
    }   
  }
});

module.exports = router;

