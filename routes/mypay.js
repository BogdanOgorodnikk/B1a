const express = require('express');
const router = express.Router();

const models = require('../models');


router.get('/', (req, res) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
    const usermanager = req.session.userManager;
    
    if(!userId || !userLogin || !usermanager) {
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
                    }
                });
             })
        })
    }   
});

module.exports = router;

