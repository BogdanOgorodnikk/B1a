const express = require('express');
const router = express.Router();

const models = require('../models');

router.get('/:id', (req, res, next) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const useradmin = req.session.userAdmin;
  const usermanager = req.session.userManager;

  const id = req.params.id.trim().replace(/ +(?= )/g, '');
  
  if(!userId || !userLogin || !useradmin && !usermanager) {
    res.redirect('/');
  }  else {
      if (!id) {
          const err = new Error('Not Found');
          err.status = 404;
          next(err);
      } else {
        models.Pith.findById(id
      )
      .then(piths => {
            res.render('tables/pithedit', {
              piths,
          user: {
            id: userId,
            login: userLogin,
            admin: useradmin,
            manager: usermanager
          }
        });  
        
      })  
      }
    }   
});

router.get('/:id/:data/:title/:number/:price/:rosdb/:math', (req, res, next) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const useradmin = req.session.userAdmin;
  const usermanager = req.session.userManager;

  const id = req.params.id.trim().replace(/ +(?= )/g, '');
  const data = req.params.data.trim().replace(/ +(?= )/g, '');
  const title = req.params.title.trim().replace(/ +(?= )/g, '');
  const number = req.params.number.trim().replace(/ +(?= )/g, '');
  const price = req.params.price.trim().replace(/ +(?= )/g, '');
  const rosdb = req.params.rosdb.trim().replace(/ +(?= )/g, '');
  const math = req.params.math.trim().replace(/ +(?= )/g, '');

  
  if(!userId || !userLogin || !useradmin && !usermanager) {
    res.redirect('/');
  } else {
    if (!id) {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    } else if(price < 0 || number < 0) {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    } else {
        models.Pith.findByIdAndUpdate(id, {data: data, title: title, number: number, price: price, rosdb: rosdb, math: math}, {new: true}
      )
      .then(pithsedit => {
        res.render('tables/pithedit', {
          pithsedit,
          user: {
            id: userId,
            login: userLogin,
            admin: useradmin,
            manager: usermanager
          }
        });
        res.redirect('back');
      })
      
      
    }   
  }
});
  
module.exports = router;

