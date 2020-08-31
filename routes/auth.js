const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');

const models = require('../models');


router.post('/register', (req, res) => {
  const login = req.body.login;
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;

  if(!login || !password || !passwordConfirm) {
    res.json({
        ok: false,
        error: 'Всі поля повинні бути заповнені!',
        fields: ['login', 'password', 'passwordConfirm']
      });
  } else if (login.length < 3 || login.length > 16) {
    res.json({
      ok: false,
      error: 'Довжина логіна від 3 до 16 символів!',
      fields: ['login']
    });
  } else if (password.length < 6 || password.length > 16) {
    res.json({
      ok: false,
      error: 'Довжина пароля від 6 до 16 символоів!',
      fields: ['password']
    });
  } else if (password !== passwordConfirm) {
    res.json({
      ok: false,
      error: 'Пароли не співпадають!',
      fields: ['password', 'passwordConfirm']
    });
  } else {
    models.User.findOne( {
        login
    }).then(user => {
        if(!user) {
            bcrypt.hash(password, null, null, (err, hash) => {
                models.User.create({
                login,
                password: hash
                }).then(user => {
                    console.log(user);
                    req.session.userId = user.id;
                    req.session.userLogin = user.login;
                    req.session.userAdmin = user.isAdmin;
                    req.session.userLogist = user.isLogist;
                    req.session.userAccountant = user.isAccountant;
                    req.session.userAccountantnotnal = user.isAccountantnotnal;
                    req.session.userManager = user.isManager;
                    req.session.userBan = user.ban;
                    req.session.userPassword = user.password;
                    res.json({
                    ok: true
                  });
                }).catch(err => {
                    console.log(err);
                    res.json({
                    ok: false,
                    error: 'Помилка, спробуйте пізніше!'
                  });
                });
            });
        } else {
            res.json({
                ok: false,
                error: "Данне ім'я зайняте!",
                fields: ['login']
            });
        }
    });


  }
});

router.post('/login', (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  if(!login || !password) {
    res.json({
        ok: false,
        error: 'Всі поля повинні бути заповнені',
        fields: ['login', 'password']
      });
  }  else {
    models.User.findOne({
      login
    }).then(user => {
      if(!user) {
        res.json({
          ok: false,
          error: "Логін і пароль невірні!",
          fields: ['login', 'password']
        });
      } else {
        bcrypt.compare(password, user.password, function(err, result){
          if(!result) {
            res.json({
              ok: false,
              error: "Логін і пароль невірні!",
              fields: ['login', 'password']
            });
          } else {
            req.session.userId = user.id;
            req.session.userLogin = user.login;
            req.session.userAdmin = user.isAdmin;
            req.session.userLogist = user.isLogist;
            req.session.userAccountant = user.isAccountant;
            req.session.userAccountantnotnal = user.isAccountantnotnal;
            req.session.userManager = user.isManager;
            req.session.userBan = user.ban;
            req.session.userPassword = user.password;
            res.json({
              ok: true
            });
          }
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.json({
      ok: false,
      error: 'Помилка, спробуйте пізніше!'
    });
  });
  }
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;