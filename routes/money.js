const express = require('express');
const router = express.Router();
const moment = require('moment');
moment.locale('ru');

const models = require('../models');
const user = require('../models/user');
const product = require('../models/product');


router.get('/', (req, res) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
    const useradmin = req.session.userAdmin;
    
    if(!userId || !userLogin || !useradmin) {
      res.redirect('/');
    } else {
        models.User.find()
        .then(users => {
            res.render('tables/tablemoney', {
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
    }  else {
        if (!id) {
            const err = new Error('Not Found');
            err.status = 404;
            next(err);
        } else {
          models.User.findById(id)
            .then(users => {
                models.Product.find()
                 .then(products => {
                     models.Client.find()
                     .then(clients => {
                        res.render('tables/tablemanagermoney', {
                            users,
                            products,
                            clients,
                            moment,
                            user: {
                                id: userId,
                                login: userLogin,
                                admin: useradmin
                            }
                        }); 
                     })
                 })
            })  
          }
        }   
 });

 router.get('/oplataedit/:id', (req, res, next) => {
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
          models.Product.findById(id)
        .then(products => {
           res.render('tables/tablemoneyedit', {
            products,
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


  router.get('/oplataedit/adm/:id/:nal', (req, res, next) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
    const useradmin = req.session.userAdmin;
    const id = req.params.id.trim().replace(/ +(?= )/g, '');
    const nal = req.params.nal.trim().replace(/ +(?= )/g, '');
  
    
    if(!userId || !userLogin || !useradmin) {
      res.redirect('/');
    } else {
      if (!id) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
      } else {
          models.Product.findByIdAndUpdate(id, {
            nal: nal,
            debts: 0 - nal,
            different: nal
          }, 
          {
            new: true
          }
        )
        .then(posts => {
          models.Client.find()
          .then(clients => {
           res.render('tables/edittown', {
            posts,
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

