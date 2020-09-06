const express = require('express');
const router = express.Router();

const models = require('../models');


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
        models.Product.findById(id
        )
        .then(product => {
          models.Client.find()
          .then(clients => {
           res.render('products/producteditmoney', {
            product,
            clients,
            user: {
              id: userId,
              login: userLogin,
              admin: useradmin
            }
          }); 
          }) 
          
        })
      }   
    }
  });

  router.get('/adminmoney/:id/:title/:nal/:notnal', (req, res, next) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
    const useradmin = req.session.userAdmin;
    const id = req.params.id.trim().replace(/ +(?= )/g, '');
    const title = req.params.title.trim().replace(/ +(?= )/g, '');
    const nal = req.params.nal.trim().replace(/ +(?= )/g, '');
    const notnal = req.params.notnal.trim().replace(/ +(?= )/g, '');


    if(!userId || !userLogin || !useradmin) {
      res.redirect('/');
    } else {
      if (!id) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
      } else {
        models.Product.findByIdAndUpdate(id, {
          title: title,
          nal: nal,
          notnal: notnal,
          debts: 0 - nal - notnal,}, {new: true}
        )
        .then(product => {
          res.render('allusers/alluserdone', {
            product,
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

