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
                        $group :{ _id: "$client",
                          salary: { 
                            $sum : "$debts"
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

module.exports = router;

