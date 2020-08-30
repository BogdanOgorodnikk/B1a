const express = require('express');
const router = express.Router();

const models = require('../models');

router.get('/', (req, res) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
    const useradmin = req.session.userAdmin;
    if(!userId || !userLogin || !useradmin) {
      res.redirect('/');
    } else {
        models.Client.find({

        }).then(clients => {
            models.Product.aggregate([ 
            {  
              $group :{ _id: "$client",
                salary: { 
                    $sum : "$debts"
                }
               }
            }
        ]).then(proos => {
            models.Pith.aggregate([ 
                {  
                  $group :{ _id: "$client",
                  salary: {
                    $sum: { $cond: {if: {$eq: ["$math", true]}, then: {$multiply: [ "$price", "$number" ]}, else: 0} }}
                  }
                }
                ]).then(sumpith => {
                   res.render('clientborgs/clientborg', {
                clients,
                proos,
                sumpith,
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
});


module.exports = router;

