const express = require('express');
const router = express.Router();

const models = require('../models');


router.get('/', (req, res) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
    const useradmin = req.session.userAdmin;
    const useraccountantnotnal = req.session.userAccountantnotnal;
    const useraccountant = req.session.userAccountant;
    
    if(!userId || !userLogin || !useradmin && !useraccountantnotnal && !useraccountant) {
      res.redirect('/');
    } else {
        models.Product.find()
        .then(products => {
            models.Client.find()
             .then(clients => {
                 models.User.find() 
                  .then(users => {
                    res.render('tables/tablepaynotnal', {
                        products,
                        clients,
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
    }   
});

module.exports = router;

