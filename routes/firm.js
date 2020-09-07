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
      models.Firm.find()
          .then(firms => {
            res.render('products/firm', {
              firms,
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
      const title = req.body.title.trim().replace(/ +(?= )/g, '');
    if(!title) {
        res.json({
            ok: false,
            error: 'Всі поля повинні бути заповнені!',
            fields: ['title']
          });
      } else if (title.length < 3 || title.length > 32) {
        res.json({
          ok: false,
          error: 'Довжина назви продукта від 3 до 32 символів!',
          fields: ['title']
        });
      } else {

        models.Firm.create({
            title
        }).then(firms => {
            console.log(firms);
            res.json({
            ok: true
          });            
        }).catch(err =>{
            console.log(title.length < 3, "Помилка: Довжина менше 3 символів!");
            console.log(title.length > 32, "Помилка: Довжина більше 32 символів!");
            console.log(!title < 3, "Помилка: Поля не заповнені!");
            console.log(err);
            console.log(firms);
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
        models.Firm.findByIdAndRemove(id)
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
      models.Firm.findById(id
      )
      .then(firms => {
         res.render('products/firmedit', {
          firms,
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

router.get('/edit/edits/:id/:title', (req, res, next) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const useradmin = req.session.userAdmin;

  const id = req.params.id.trim().replace(/ +(?= )/g, '');
  const title = req.params.title.trim().replace(/ +(?= )/g, '');

  
  if(!userId || !userLogin || !useradmin) {
    res.redirect('/');
  } else {
    if (!id) {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    } else {
        models.Firm.findByIdAndUpdate(id, {
          title: title
        }, 
        {
          new: true
        }
      )
      .then(firms => {
        models.Client.find()
        .then(clients => {
         res.render('tables/pithtable', {
          firms,
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
