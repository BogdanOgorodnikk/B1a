const express = require('express');
const router = express.Router();

const models = require('../models');

router.get('/add', (req, res) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
    const useradmin = req.session.userAdmin;

    if(!userId || !userLogin || !useradmin) {
        res.redirect('/')
    } else {
          res.render('generalTable/add', {
        user: {
          id: userId,
          login: userLogin,
          admin: useradmin
        }
      });  
    }
});

router.post('/add', (req, res) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
    const useradmin = req.session.userAdmin;

    if(!userId || !userLogin || !useradmin) {
        res.redirect('/')
    } else {
      const title = req.body.title.trim().replace(/ +(?= )/g, '');
    if(!title) {
        res.json({
            ok: false,
            error: 'Всі поля повинні бути заповнені!',
            fields: ['title']
          });
      } else if (title.length < 3 || title.length > 32) {
        res.json({
          ok: false,
          error: 'Довжина назви таблиці від 3 до 32 символів!',
          fields: ['title']
        });
      } else {

        models.Post.create({
            title,
            owner: userId
        }).then(post => {
            console.log(post);
            res.json({
            ok: true
          });            
        }).catch(err =>{
            console.log(title.length < 3, "Помилка: Довжина менше 3 символів!");
            console.log(title.length > 32, "Помилка: Довжина більше 32 символів!");
            console.log(!title < 3, "Помилка: Поля не заповнені!");
            console.log(err);
            console.log(post);
            res.json({
            ok: false
          }); 
        });
      }  
    }
});

module.exports = router;
