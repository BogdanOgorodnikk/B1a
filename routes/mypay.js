const express = require('express');
const router = express.Router();

const models = require('../models');


router.get('/', (req, res) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
    const usermanager = req.session.userManager;
    const useraccountantnotnal = req.session.userAccountantnotnal;
    const useraccountant = req.session.userAccountant;
    
    if(!userId || !userLogin || !usermanager && !useraccountantnotnal && !useraccountant) {
      res.redirect('/');
    } else {
        models.Product.find()
        .then(products => {
            models.Client.find()
             .then(clients => {
                res.render('tables/tablepay', {
                    products,
                    clients,
                    user: {
                        id: userId,
                        login: userLogin,
                        manager: usermanager,
                        accountantnotnal: useraccountantnotnal,
                        accountant: useraccountant
                    }
                });
             })
        })
    }   
});

module.exports = router;

