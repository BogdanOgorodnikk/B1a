const express = require('express');
const router = express.Router();

const models = require('../models');

router.get('/', (req, res) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
    const useradmin = req.session.userAdmin;

    if(!userId || !userLogin || !useradmin) {
        res.redirect('/')
    } else {
        models.Number.find()
          .then(numbers => {
            res.render('products/number', {
                numbers,
              user: {
                id: userId,
                login: userLogin,
                admin: useradmin
              }
            }); 
          }) 
    }
});

router.post('/', (req, res) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
    const useradmin = req.session.userAdmin;

    if(!userId || !userLogin || !useradmin) {
        res.redirect('/')
    } else {
      const number = req.body.number.trim().replace(/ +(?= )/g, '');
    if(!number) {
        res.json({
            ok: false,
            error: 'Всі поля повинні бути заповнені!',
            fields: ['number']
          });
      } else if (number < 0) {
        res.json({
          ok: false,
          error: 'Кількість не може бути менше 0!',
          fields: ['number']
        });
      } else {

        models.Number.create({
            number
        }).then(numbers => {
            console.log(numbers);
            res.json({
            ok: true
          });            
        }).catch(err =>{
            console.log(err);
            console.log(numbers);
            res.json({
            ok: false
          }); 
        });
      }  
    }
});

router.get('/:id', (req, res, next) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const useradmin = req.session.userAdmin;
  const id = req.params.id.trim().replace(/ +(?= )/g, '');
 
  if(!userId || !userLogin || !useradmin) {
    res.redirect('/')
}  else {
    if (!id) {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
      } else {
        models.Number.findByIdAndRemove(id)
      .then(cli => {
        models.Post.find()
          .then(post => {
            res.render('tables/table', {
            cli,
            user: {
              id: userId,
              login: userLogin,
              admin: useradmin
            }
          });
          })
          
      res.redirect('back');
      })
      }      
}
});

router.get('/edit/:id', (req, res, next) => {
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
      models.Number.findById(id
      )
      .then(numbers => {
         res.render('products/numberedit', {
          numbers,
          user: {
            id: userId,
            login: userLogin,
            admin: useradmin
          }
        }); 
        
      })
    }   
  }
});

router.get('/edit/edits/:id/:number', (req, res, next) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const useradmin = req.session.userAdmin;

  const id = req.params.id.trim().replace(/ +(?= )/g, '');
  const number = req.params.number.trim().replace(/ +(?= )/g, '');

  
  if(!userId || !userLogin || !useradmin) {
    res.redirect('/');
  } else {
    if (!id) {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    } else {
        models.Number.findByIdAndUpdate(id, {
          number: number
        }, 
        {
          new: true
        }
      )
      .then(numbers => {
        models.Client.find()
        .then(clients => {
         res.render('tables/pithtable', {
          numbers,
          user: {
            id: userId,
            login: userLogin,
            admin: useradmin
          }
         }); 
        })
        res.redirect('back');
      })
    }
  }
});

module.exports = router;
