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
          models.Client.findById(id
        )
        .then(clients => {
            models.Pith.find({
                client: clients.id
            }).then(piths => {
              models.Pith.aggregate([ 
                {  
                  $group :{ _id: "$client",
                  salary: {
                    $sum: { $cond: {if: {$eq: ["$math", true]}, then: {$multiply: [ "$price", "$number" ]}, else: 0} }
                  }
                  }
                }
                ]).then(pross => {
                  res.render('tables/pithtable', {
                clients,
                piths,
                pross,
            user: {
              id: userId,
              login: userLogin,
              admin: useradmin,
              manager: usermanager
            }
          }); 
                })
               
            })
          
        })  
        }
      }   
  });

 router.post('/:id', (req, res) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const userAdmin = req.session.userAdmin;
  const usermanager = req.session.userManager;

  if(!userId || !userLogin) {
      res.redirect('/')
  } else {
    const title = req.body.title.trim().replace(/ +(?= )/g, '');
    const number = req.body.number.trim().replace(/ +(?= )/g, '');
    const price = req.body.price.trim().replace(/ +(?= )/g, '');
    const data = req.body.data.trim().replace(/ +(?= )/g, '');
    const rosdb = req.body.rosdb.trim().replace(/ +(?= )/g, '');
    const client = req.body.client;

    if(!data || !title || !number) {
      res.json({
          ok: false,
          error: 'Поля "Дата", "Назва залишків", "Кількість залишків" повинні бути заповнені!',
          fields: ['data','title','number']
        });
    } else if (price < 0 || number < 0) {
      res.json({
        ok: false,
        error: 'Ціна або кількість не можуть бути менше 0!',
        fields: ['price','number']
      });
    } else if (!usermanager && !userAdmin) {
      res.json({
        ok: false,
        error: 'Ви не менеджер чи адміністратор'
      });
    } else {
      models.Pith.create({ 
          title,
          number,
          price,
          data,
          rosdb,
          client
      }).then(pith => {
          console.log(pith);
          res.json({
          ok: true
        });            
      }).catch(err =>{
          console.log(err);
          res.json({
          ok: false
        }); 
      });
    }  
  }
});

router.get('/pithmath/:id/:math', (req, res, next) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const useradmin = req.session.userAdmin;
  const usermanager = req.session.userManager;

  const id = req.params.id.trim().replace(/ +(?= )/g, '');
  const math = req.params.math.trim().replace(/ +(?= )/g, '');

  
  if(!userId || !userLogin || !useradmin && !usermanager) {
    res.redirect('/');
  } else {
    if (!id) {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    } else {
        models.Pith.findByIdAndUpdate(id, {math: math}, {new: true}
      )
      .then(pithsedit => {
        res.render('tables/pithtable', {
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

