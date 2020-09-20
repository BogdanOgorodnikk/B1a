const express = require('express');
const router = express.Router();

const models = require('../models');


router.get('/', (req, res) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
    const useradmin = req.session.userAdmin;
    const useraccountant = req.session.userAccountant;
    
    if(!userId || !userLogin || !useradmin && !useraccountant) {
      res.redirect('/');
    } else {
        models.Pith.find()
        .then(piths => {
            models.Client.find()
            .then(clients => {
                    res.render('tables/allpith', {
                        piths,
                        clients,
                        user: {
                            id: userId,
                            login: userLogin,
                            admin: useradmin,
                            accountant: useraccountant
                        }
                    });
            })
        })
    }   
});

module.exports = router;

