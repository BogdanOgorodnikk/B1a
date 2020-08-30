const express = require('express');
const router = express.Router();

const models = require('../models');


router.post('/:table', (req, res) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;

    if(!userId || !userLogin) {
        res.redirect('/')
    } else {
      const headline = req.body.headline.trim().replace(/ +(?= )/g, '');
      const post = req.body.post;
      const owner = req.body.owner;

    if(!headline) {
        res.json({
            ok: false,
            error: 'Всі поля повинні бути заповнені!',
            fields: ['headline']
          });
      } else if (headline.length < 3 || headline.length > 32) {
        res.json({
          ok: false,
          error: 'Довжина назви таблиці від 3 до 32 символів!',
          fields: ['headline']
        });
      } else if (owner != userId) {
        res.json({
          ok: false,
          error: 'Ви не адміністратор!',
          fields: ['owner']
        });
      } else {
        models.Client.create({   
            headline,
            post,
            owner
        }).then(client => {
            console.log(client);
            res.json({
            ok: true
          });            
        }).catch(err =>{
            console.log(!headline, "Помилка: Поля не заповнені");
            console.log(headline.length < 3, "Помилка: Довжина має бути більше 3 символів");
            console.log(headline.length > 32, "Помилка: Довжина має бути менше 32 символів");
            console.log(owner != userId, "Помилка: Ви не власник");
            console.log(err);
            console.log(client);
            res.json({
            ok: false
          }); 
        });
      }  
    }
});


module.exports = router;