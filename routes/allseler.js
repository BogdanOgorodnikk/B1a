const express = require('express');
const router = express.Router();

const models = require('../models');
const user = require('../models/user');
const product = require('../models/product');


  router.get('/', (req, res, next) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
    const useradmin = req.session.userAdmin;
    const useraccountantnotnal = req.session.userAccountantnotnal;
    const useraccountant = req.session.userAccountant;
    
    if(!userId || !userLogin || !useradmin && !useraccountantnotnal && !useraccountant) {
      res.redirect('/');
    } else {
        models.Client.find(

        )
        .then(clients => {
            models.Product.find(
            ).then(products => {
                    models.Product.aggregate([ 
                      {  
                        $group :{ _id: "$id",
                          number: {
                            $sum: { $cond: {if: {$eq: ["$count", true]}, then: "$number" , else: 0} }
                          },
                          deltanal: {
                            $sum: { $cond: {if: {$eq: ["$count", true]}, then: "$deltadebtnal" , else: 0} }
                          },
                          deltanotnal: {
                            $sum: { $cond: {if: {$eq: ["$count", true]}, then: "$deltadebt" , else: 0} }
                          }
                        }
                      }]).then(proos => {
                        models.User.find(
                        ).then(users => {
                          res.render('allselers/allseler', {
                            products,
                            clients,
                            proos,
                            users,
                            user: {
                              id: userId,
                              login: userLogin,
                              admin: useradmin,
                              accountantnotnal: useraccountantnotnal,
                              accountant: useraccountant
                            }
                          });
                        })
                      })
                })
        })
      }   
  });

  router.get('/allselersum/:id/:count', (req, res, next) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
    const useradmin = req.session.userAdmin;
  
    const id = req.params.id.trim().replace(/ +(?= )/g, '');
    const count = req.params.count.trim().replace(/ +(?= )/g, '');
  
    
    if(!userId || !userLogin || !useradmin) {
      res.redirect('/');
    } else {
      if (!id) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
      } else {
          models.Product.findByIdAndUpdate(id, {count: count}, {new: true}
        )
        .then(products => {
          res.render('/', {
            products,
            user: {
              id: userId,
              login: userLogin,
              admin: useradmin
            }
          });
          res.redirect('/allselers');
        })
      }   
    }
  });

module.exports = router;

