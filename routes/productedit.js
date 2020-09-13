const express = require('express');
const router = express.Router();

const models = require('../models');
const user = require('../models/user');
const product = require('../models/product');


  router.get('/:id', (req, res, next) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
    const useradmin = req.session.userAdmin;
    const useraccountant = req.session.userAccountant;
    const useraccountantnotnal = req.session.userAccountantnotnal;
    const id = req.params.id.trim().replace(/ +(?= )/g, '');
    
    if(!userId || !userLogin || !useradmin && !useraccountant && !useraccountantnotnal) {
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
           res.render('products/productedit', {
            product,
            clients,
            user: {
              id: userId,
              login: userLogin,
              admin: useradmin,
              accountant: useraccountant,
              accountantnotnal: useraccountantnotnal
            }
          }); 
          }) 
          
        })
      }   
    }
  });


  router.get('/accountant/:id/:price/:delivery/:number/:pricenotnal/:deliverynotnal/:opt/:deltadebtnal/:deltadebt', (req, res, next) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
    const useradmin = req.session.userAdmin;
    const useraccountant = req.session.userAccountant;
    const id = req.params.id.trim().replace(/ +(?= )/g, '');
    const price = req.params.price.trim().replace(/ +(?= )/g, '');
    const delivery = req.params.delivery.trim().replace(/ +(?= )/g, '');
    const deliverynotnal = req.params.deliverynotnal.trim().replace(/ +(?= )/g, '');
    const number = req.params.number.trim().replace(/ +(?= )/g, '');
    const pricenotnal = req.params.pricenotnal.trim().replace(/ +(?= )/g, '');
    const opt = req.params.opt.trim().replace(/ +(?= )/g, '');
    const deltadebtnal = req.params.deltadebtnal.trim().replace(/ +(?= )/g, '');
    const deltadebt = req.params.deltadebt.trim().replace(/ +(?= )/g, '');

    
    if(!userId || !userLogin || !useradmin && !useraccountant) {
      res.redirect('/');
    } else {
      if (!id) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
      } else {
        if(price < 0 || delivery < 0 || number < 0) {
          const err = new Error('Not Found');
          err.status = 404;
          next(err);
        } else {
          models.Product.findByIdAndUpdate(id, {
            price: price, 
            debt: (price*number)-delivery, 
            debts: (price*number) - delivery, 
            deltadebtnal: ((price-pricenotnal)*number)-delivery,
            deltadebt: ((pricenotnal- opt) * number) - deliverynotnal,
            sumsell: price * number,
            deltatonnal: deltadebtnal / number,
            deltatonnotnal: deltadebt / number
          }, 
          {
            new: true
          }
        )
        .then(product => {
          models.Client.find()
          .then(clients => {
           res.render('tables/pithtable', {
            product,
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
    }
  });

  router.get('/accountantnotnal/:id/:pricenotnal/:opt/:deliverynotnal/:number/:price/:delivery/:deltadebtnal/:deltadebt', (req, res, next) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
    const useradmin = req.session.userAdmin;
    const useraccountantnotnal = req.session.userAccountantnotnal;
    const id = req.params.id.trim().replace(/ +(?= )/g, '');
    const pricenotnal = req.params.pricenotnal.trim().replace(/ +(?= )/g, '');
    const opt = req.params.opt.trim().replace(/ +(?= )/g, '');
    const deliverynotnal = req.params.deliverynotnal.trim().replace(/ +(?= )/g, '');
    const number = req.params.number.trim().replace(/ +(?= )/g, '');
    const price = req.params.price.trim().replace(/ +(?= )/g, '');
    const delivery = req.params.delivery.trim().replace(/ +(?= )/g, '');
    const deltadebtnal = req.params.deltadebtnal.trim().replace(/ +(?= )/g, '');
    const deltadebt = req.params.deltadebt.trim().replace(/ +(?= )/g, '');
    
    if(!userId || !userLogin || !useradmin && !useraccountantnotnal) {
      res.redirect('/');
    } else {
      if (!id) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
      } else {
        if(pricenotnal < 0 || deliverynotnal < 0 || number < 0 || opt < 0) {
          const err = new Error('Not Found');
          err.status = 404;
          next(err);
        } else {
          models.Product.findByIdAndUpdate(id, {
            pricenotnal: pricenotnal, 
            deltadebt: ((pricenotnal- opt) * number) - deliverynotnal,
            deltadebtnal: ((price-pricenotnal)*number)-delivery,
            deltatonnal: deltadebtnal / number,
            deltatonnotnal: deltadebt / number
            }, {new: true}
        )
        .then(product => {
          models.Client.find()
          .then(clients => {
           res.render('tables/pithtable', {
            product,
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
    }
  });

  router.get('/admin/:id/:order/:firms/:datal/:title/:number/:delivery/:price/:opt/:nal/:notnal/:pricenotnal/:deliverynotnal/:deltadebtnal/:deltadebt/:client', (req, res, next) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
    const useradmin = req.session.userAdmin;
    const id = req.params.id.trim().replace(/ +(?= )/g, '');
    const order = req.params.order.trim().replace(/ +(?= )/g, '');
    const firms = req.params.firms.trim().replace(/ +(?= )/g, '');
    const datal = req.params.datal.trim().replace(/ +(?= )/g, '');
    const title = req.params.title.trim().replace(/ +(?= )/g, '');
    const number = req.params.number.trim().replace(/ +(?= )/g, '');
    const delivery = req.params.delivery.trim().replace(/ +(?= )/g, '');
    const price = req.params.price.trim().replace(/ +(?= )/g, '');
    const opt = req.params.opt.trim().replace(/ +(?= )/g, '');
    const nal = req.params.nal.trim().replace(/ +(?= )/g, '');
    const notnal = req.params.notnal.trim().replace(/ +(?= )/g, '');
    const pricenotnal = req.params.pricenotnal.trim().replace(/ +(?= )/g, '');
    const deliverynotnal = req.params.deliverynotnal.trim().replace(/ +(?= )/g, '');
    const deltadebtnal = req.params.deltadebtnal.trim().replace(/ +(?= )/g, '');
    const deltadebt = req.params.deltadebt.trim().replace(/ +(?= )/g, '');
    const client = req.params.client.trim().replace(/ +(?= )/g, '');


    if(!userId || !userLogin || !useradmin) {
      res.redirect('/');
    } else {
      if (!id) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
      } else {
        models.Product.findByIdAndUpdate(id, {
          order: order,
          firms: firms,
          datal: datal,
          title: title,
          number: number,
          delivery: delivery,
          price: price,
          opt: opt,
          nal: nal,
          notnal: notnal,
          pricenotnal: pricenotnal,
          deliverynotnal: deliverynotnal,
          debt: (price*number)-delivery, 
          debts: ((price*number)-delivery)-nal-notnal,
          deltadebt: ((pricenotnal- opt) * number) - deliverynotnal,
          deltadebtnal: ((price-pricenotnal)*number)-delivery,
          sumsell: price * number,
          deltatonnal: deltadebtnal / number,
          deltatonnotnal: deltadebt / number,
          client: client}, {new: true}
        )
        .then(product => {
          models.Client.find()
          .then(clients => {
            res.render('tables/pithtable', {
            product,
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

