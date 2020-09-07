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
        models.Opt.find()
          .then(opts => {
            res.render('products/opt', {
                opts,
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
      const opt = req.body.opt.trim().replace(/ +(?= )/g, '');
    if(!opt) {
        res.json({
            ok: false,
            error: 'Всі поля повинні бути заповнені!',
            fields: ['opt']
          });
      } else if (opt < 0) {
        res.json({
          ok: false,
          error: 'Оптова ціна не може бути менше 0!',
          fields: ['opt']
        });
      } else {

        models.Opt.create({
            opt
        }).then(opts => {
            console.log(opts);
            res.json({
            ok: true
          });            
        }).catch(err =>{
            console.log(err);
            console.log(opts);
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
        models.Opt.findByIdAndRemove(id)
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
      models.Opt.findById(id
      )
      .then(opts => {
         res.render('products/optedit', {
          opts,
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

router.get('/edit/edits/:id/:opt', (req, res, next) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const useradmin = req.session.userAdmin;

  const id = req.params.id.trim().replace(/ +(?= )/g, '');
  const opt = req.params.opt.trim().replace(/ +(?= )/g, '');

  
  if(!userId || !userLogin || !useradmin) {
    res.redirect('/');
  } else {
    if (!id) {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    } else {
        models.Opt.findByIdAndUpdate(id, {
          opt: opt
        }, 
        {
          new: true
        }
      )
      .then(opts => {
        models.Client.find()
        .then(clients => {
         res.render('tables/pithtable', {
          opts,
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
