const express = require('express');
const router = express.Router();

const models = require('../models');


router.post('/:product', (req, res) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
    const userlogist = req.session.userLogist;
    const userAdmin = req.session.userAdmin;

    if(!userId || !userLogin) {
        res.redirect('/')
    } else {
      const order = req.body.order.trim().replace(/ +(?= )/g, '');
      const car = req.body.car.trim().replace(/ +(?= )/g, '');
      const firms = req.body.firms.trim().replace(/ +(?= )/g, '');
      const title = req.body.title.trim().replace(/ +(?= )/g, '');
      const opt = req.body.opt.trim().replace(/ +(?= )/g, '');
      const number = req.body.number.trim().replace(/ +(?= )/g, '');
      const delivery = req.body.delivery.trim().replace(/ +(?= )/g, '');
      const deliverynotnal = req.body.deliverynotnal.trim().replace(/ +(?= )/g, '');
      const datal = req.body.datal.trim().replace(/ +(?= )/g, '');
      const client = req.body.client;
      const owner = req.body.owner;

    if(!order || !firms || !title || !opt || !number || !datal || !car) {
        res.json({
            ok: false,
            error: 'Поля "№ замовлення", "Номер машини", "Дата", "Назва фірми", "Назва товару", "Оптова ціна", "Кількість" повинні бути заповнені!',
            fields: ['order','firms','title','opt','number','datal', 'car']
          });
      } else if (order.length < 1 || order.length > 64 || firms.length < 1 || firms.length > 64) {
        res.json({
          ok: false,
          error: 'Довжина назви таблиці від 1 до 64 символів!',
          fields: ['order','firms']
        });
      } else if (delivery > 0 && deliverynotnal > 0) {
        res.json({
          ok: false,
          error: 'Ціна за "Доставку налічкою" та ціна за "Доставку безнал" не можуть бути введеними одночасно!',
          fields: ['delivery','deliverynotnal']
        });
      } else if (delivery < 0 || deliverynotnal < 0) {
        res.json({
          ok: false,
          error: 'Ціна за "Доставку налічкою" та ціна за "Доставку безнал" не можуть бути менше 0!',
          fields: ['delivery','deliverynotnal']
        });
      } else if (number <= 0 || opt <= 0) {
        res.json({
          ok: false,
          error: '"Кількість" чи "Оптова ціна" не можуть бути менше 0!',
          fields: ['number','opt']
        });
      } else if (!userlogist && !userAdmin) {
        res.json({
          ok: false,
          error: 'Ви не логіст чи адміністратор'
        });
      } else {
        models.Product.create({ 
            order,
            car,
            firms,
            datal,
            opt,
            client,
            title,
            number,
            delivery,
            deliverynotnal,
            owner
        }).then(product => {
            console.log(product);
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

router.post('/proplataman/:products', (req, res) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const userAdmin = req.session.userAdmin;
  const usermanager = req.session.userManager;

  if(!userId || !userLogin) {
      res.redirect('/')
  } else {
    const title = req.body.title.trim().replace(/ +(?= )/g, '');
    const datal = req.body.datal.trim().replace(/ +(?= )/g, '');
    const nal = req.body.nal.trim().replace(/ +(?= )/g, '');
    const client = req.body.client;
    const owner = req.body.owner;

    if(!datal || !title) {
      res.json({
          ok: false,
          error: 'Поля "Дата", "Операція" повинні бути заповнені!',
          fields: ['datal','title']
        });
    } else if (!usermanager && !userAdmin) {
      res.json({
        ok: false,
        error: 'Ви не менеджер'
      });
    } else if (nal <= 0) {
      res.json({
        ok: false,
        error: 'Сума грошей не може бути менше 0!',
        fields: ['nal']
      });
    } else if (nal.length < 1) {
      res.json({
        ok: false,
        error: 'Поле "Сума налічки" пусте!',
        fields: ['nal']
      });
    } else {
      models.Product.create({ 
          title,
          datal,
          nal,
          debts: 0 - nal,
          different: nal,
          client,
          owner
      }).then(product => {
          console.log(product);
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
router.post('/proplatanal/:products', (req, res) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const useraccountant = req.session.userAccountant;

  if(!userId || !userLogin) {
      res.redirect('/')
  } else {
    const title = req.body.title.trim().replace(/ +(?= )/g, '');
    const datal = req.body.datal.trim().replace(/ +(?= )/g, '');
    const nal = req.body.nal.trim().replace(/ +(?= )/g, '');
    const client = req.body.client;
    const owner = req.body.owner;

    if(!datal || !title || !nal) {
      res.json({
          ok: false,
          error: 'Поля "Дата", "Операція", "Налічка" повинні бути заповнені!',
          fields: ['datal','title', 'nal']
        });
    } else if (!useraccountant) {
      res.json({
        ok: false,
        error: 'Ви не бухгалтер'
      });
    } else if (nal <= 0) {
      res.json({
        ok: false,
        error: 'Сума грошей не може бути менше 0!',
        fields: ['nal']
      });
    } else {
      models.Product.create({ 
          title,
          datal,
          nal,
          debts: 0 - nal,
          different: 0 + nal,
          client,
          owner
      }).then(product => {
          console.log(product);
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
router.post('/proplatanotnal/:products', (req, res) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const useraccountantnotnal = req.session.userAccountantnotnal;

  if(!userId || !userLogin) {
      res.redirect('/')
  } else {
    const title = req.body.title.trim().replace(/ +(?= )/g, '');
    const datal = req.body.datal.trim().replace(/ +(?= )/g, '');
    const notnal = req.body.notnal.trim().replace(/ +(?= )/g, '');
    const client = req.body.client;
    const owner = req.body.owner;

    if(!datal || !title || !notnal) {
      res.json({
          ok: false,
          error: 'Поля "Дата", "Операція", "Безнал" повинні бути заповнені!',
          fields: ['datal','title', 'notnal']
        });
    } else if (notnal <= 0) {
      res.json({
        ok: false,
        error: 'Сума грошей безналу не може бути менше 0!',
        fields: ['notnal']
      });
    } else if (!useraccountantnotnal) {
      res.json({
        ok: false,
        error: 'Ви не бухгалтер'
      });
    } else {
      models.Product.create({ 
          title,
          datal,
          notnal,
          debts: 0 - notnal,
          different: 0 + notnal,
          client,
          owner
      }).then(product => {
          console.log(product);
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
router.post('/proplatadm/:products', (req, res) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const userAdmin = req.session.userAdmin;

  if(!userId || !userLogin) {
      res.redirect('/')
  } else {
    const title = req.body.title.trim().replace(/ +(?= )/g, '');
    const datal = req.body.datal.trim().replace(/ +(?= )/g, '');
    const nal = req.body.nal.trim().replace(/ +(?= )/g, '');
    const notnal = req.body.notnal.trim().replace(/ +(?= )/g, '');
    const client = req.body.client;
    const owner = req.body.owner;

    if(!datal || !title) {
      res.json({
          ok: false,
          error: 'Поля "Дата", "Операція" повинні бути заповнені!',
          fields: ['datal','title']
        });
    } else if (!userAdmin) {
      res.json({
        ok: false,
        error: 'Ви не адміністратор'
      });
    } else {
      models.Product.create({ 
          title,
          datal,
          nal,
          notnal,
          debts: 0 - nal - notnal,
          different: nal + notnal,
          client,
          owner
      }).then(product => {
          console.log(product);
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

module.exports = router;