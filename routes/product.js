const express = require('express');
const router = express.Router();
const moment = require('moment');
moment.locale('ru');

const models = require('../models');
  
  router.get('/:product', (req, res, next) => {
    const url = req.params.product.trim().replace(/ +(?= )/g, '');
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
    const useradmin = req.session.userAdmin;
    const userlogist = req.session.userLogist;
    const userclien = req.session.userClien;
    const useraccountant = req.session.userAccountant;
    const useraccountantnotnal = req.session.userAccountantnotnal;
    const usermanager = req.session.userManager;

    if(!userId || !userLogin || !useradmin && !userlogist && !useraccountant && !useraccountantnotnal && !usermanager) {
      res.redirect('/');
    } else if (!url) {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    } else {
      models.Client.findOne({
        url
      }).then(client => {
        if (!client) {
          const err = new Error('Not Found');
          err.status = 404;
          next(err);
        } else {
          models.Product.find({
            client: client.id
          }).then(products => {
          models.Product.aggregate([ 
            {  
              $group :{ _id: "$client",
              salary: { 
                $sum : "$debts"
              },
              diff: {
                $sum: "$different"
              },
              number: {
                $sum: "$number"
              },
            }
            }
            ])
            .then(prosum => {
              models.Pith.aggregate([ 
                {  
                  $group :{ _id: "$client",
                  salary: {
                    $sum: { $cond: {if: {$eq: ["$math", true]}, then: {$multiply: [ "$price", "$number" ]}, else: 0} }}
                  }
                }
                ]).then(sumpith => {
                  models.User.find({
                  
                  }).then(users => {
                    res.render('products/product', {
                      client,
                      products,
                      sumpith,
                      moment,
                      prosum,
                      users,
                      user: {
                        id: userId,
                        login: userLogin,
                        admin: useradmin,
                        logist: userlogist,
                        clien: userclien,
                        accountant: useraccountant,
                        accountantnotnal: useraccountantnotnal,
                        manager: usermanager
                      }
                    });
                  })
                })
            })

          });

        }
      });
    }
  });
  
  
module.exports = router;