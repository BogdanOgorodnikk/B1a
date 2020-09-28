const express = require('express');
const router = express.Router();

const models = require('../models');
const user = require('../models/user');



router.get('/my_tables', (req, res) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const useradmin = req.session.userAdmin;
  const useraccountantnotnal = req.session.userAccountantnotnal;
  const useraccountant = req.session.userAccountant;
  const usermanager = req.session.userManager;
  const userlogist = req.session.userLogist;

    models.Post.find({
      
    })
      .then(posts => {
            res.render('tables/my_table', {
              posts,
              user: {
                id: userId,
                login: userLogin,
                admin: useradmin,
                accountantnotnal: useraccountantnotnal,
                accountant: useraccountant,
                manager: usermanager,
                logist: userlogist
              }
      })
      .catch(() => {
        throw new Error('Server Error');
      });
  });
});

router.get('/my_tables/:id', (req, res, next) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const useradmin = req.session.userAdmin;
  const usermanager = req.session.userManager;

  const id = req.params.id.trim().replace(/ +(?= )/g, '');
  
  if(!userId || !userLogin || !useradmin) {
    res.redirect('/');
  }  else {
      if (!id) {
          const err = new Error('Not Found');
          err.status = 404;
          next(err);
      } else {
        models.Post.findById(id)
          .then(posts => {
            models.User.find()
            .then(users => {
              res.render('tables/tablemanager', {
                posts,
                users,
                user: {
                  id: userId,
                  login: userLogin,
                  admin: useradmin,
                  manager: usermanager
              }
            }); 
            }) 
         })  
      }
    }   
});

router.get('/my_tables/:id/:manager/:securitymanager/:securitymanagersecond', (req, res, next) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const useradmin = req.session.userAdmin;
  const id = req.params.id.trim().replace(/ +(?= )/g, '');
  const manager = req.params.manager.trim().replace(/ +(?= )/g, '');
  const securitymanager = req.params.securitymanager.trim().replace(/ +(?= )/g, '');
  const securitymanagersecond = req.params.securitymanagersecond.trim().replace(/ +(?= )/g, '');

  
  if(!userId || !userLogin || !useradmin) {
    res.redirect('/');
  } else {
    if (!id) {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    } else {
        models.Post.findByIdAndUpdate(id, {
          manager: manager,
          securitymanager: securitymanager,
          securitymanagersecond: securitymanagersecond
        }, 
        {
          new: true
        }
      )
      .then(posts => {
        models.Client.find()
        .then(clients => {
         res.render('tables/pithtable', {
          posts,
          user: {
            id: userId,
            login: userLogin,
            admin: useradmin
          }
        }); 
        })
        res.redirect('back');
      })
    }   
  }
});




router.get('/:table', (req, res, next) => {
  const url = req.params.table.trim().replace(/ +(?= )/g, '');
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const useradmin = req.session.userAdmin;
  const userlogist = req.session.userLogist;
  const useraccountant = req.session.userAccountant;
  const useraccountantnotnal = req.session.userAccountantnotnal;
  const usermanager = req.session.userManager;

  if(!userId || !userLogin || !useradmin && !userlogist && !useraccountant && !useraccountantnotnal && !usermanager) {
    res.redirect('/');
  } else if (!url) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  } else {
    models.Post.findOne({
      url
    }).then(post => {
      if (!post) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
      } else {
        models.Client.find({
          post: post.id
        }).then(clients => {
          models.Product.aggregate([ 
            {  
              $group :{ _id: "$client",
              salary: { 
                $sum : "$debts"
               },
            }
            }
            ]).then(proos => {
              models.Pith.aggregate([ 
                {  
                  $group :{ _id: "$client",
                  salary: {
                    $sum: { $cond: {if: {$eq: ["$math", true]}, then: {$multiply: [ "$price", "$number",1.4 ]}, else: 0} }}
                  }
                }
                ]).then(sumpith => {
                  res.render('tables/table', {
                    post,
                    clients,
                    proos,
                    sumpith,
                    user: {
                      id: userId,
                      login: userLogin,
                      admin: useradmin,
                      accountant: useraccountant,
                      accountantnotnal: useraccountantnotnal,
                      manager: usermanager,
                      logist: userlogist
                    }
                  });
                })
            })

        });
      }
    });
  }
});

router.get('/:table/:owner/:id', (req, res, next) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const useradmin = req.session.userAdmin;
  const id = req.params.id.trim().replace(/ +(?= )/g, '');
  const owner = req.params.owner.trim().replace(/ +(?= )/g, '');
 
  if(!userId || !userLogin) {
    res.redirect('/')
} else if(owner != userId) {
  res.redirect('/')
} else {
    if (!id || !owner) {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
      } else {
        models.Client.findByIdAndRemove(id)
      .then(cli => {
        models.Post.find()
          .then(post => {
            res.render('tables/table', {
            cli,
            user: {
              id: userId,
              login: userLogin,
              admin: useradmin
            }
          });
          })
          
      res.redirect('back');
      })
      }      
}
});

router.get('/clientedit/:id', (req, res, next) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const useradmin = req.session.userAdmin;
  const id = req.params.id.trim().replace(/ +(?= )/g, '');
 
  if(!userId || !userLogin || !useradmin) {
    res.redirect('/')
} else {
    if (!id) {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
      } else {
        models.Post.find()
        .then(posts => {
          models.Client.findById(id)
          .then(clients => {
            res.render('tables/editclient', {
              clients,
              posts,
              user: {
                id: userId,
                login: userLogin,
                admin: useradmin
              }
            });
            res.redirect('back');
          })
        })
      }      
    }
});

router.get('/clientedit/client/:id/:headline', (req, res, next) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const useradmin = req.session.userAdmin;
  const id = req.params.id.trim().replace(/ +(?= )/g, '');
  const headline = req.params.headline.trim().replace(/ +(?= )/g, '');

  
  if(!userId || !userLogin || !useradmin) {
    res.redirect('/');
  } else {
    if (!id) {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    } else {
        models.Client.findByIdAndUpdate(id, {
          headline: headline
        }, 
        {
          new: true
        }
      )
      .then(clientss => {
        models.Client.find()
        .then(clients => {
         res.render('tables/edittown', {
          clientss,
          user: {
            id: userId,
            login: userLogin,
            admin: useradmin
          }
        }); 
        })
        res.redirect('back');
      })
    }   
  }
});

router.get('/tablesedit/:id', (req, res, next) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const useradmin = req.session.userAdmin;
  const id = req.params.id.trim().replace(/ +(?= )/g, '');
 
  if(!userId || !userLogin || !useradmin) {
    res.redirect('/')
} else {
    if (!id) {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
      } else {
        models.Post.findById(id)
      .then(posts => {
          res.render('tables/edittown', {
            posts,
            user: {
              id: userId,
              login: userLogin,
              admin: useradmin
            }
          });
      res.redirect('back');
      })
      }      
}
});

router.get('/tablesedit/town/:id/:title', (req, res, next) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const useradmin = req.session.userAdmin;
  const id = req.params.id.trim().replace(/ +(?= )/g, '');
  const title = req.params.title.trim().replace(/ +(?= )/g, '');

  
  if(!userId || !userLogin || !useradmin) {
    res.redirect('/');
  } else {
    if (!id) {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    } else {
        models.Post.findByIdAndUpdate(id, {
          title: title
        }, 
        {
          new: true
        }
      )
      .then(posts => {
        models.Client.find()
        .then(clients => {
         res.render('tables/edittown', {
          posts,
          user: {
            id: userId,
            login: userLogin,
            admin: useradmin
          }
        }); 
        })
        res.redirect('back');
      })
    }   
  }
});

router.get('/tabledelete/:id', (req, res, next) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const useradmin = req.session.userAdmin;
  const id = req.params.id.trim().replace(/ +(?= )/g, '');
 
  if(!userId || !userLogin || !useradmin) {
    res.redirect('/')
}  else {
    if (!id) {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
      } else {
        models.Post.findByIdAndRemove(id)
      .then(cli => {
        models.Post.find()
          .then(post => {
            res.render('tables/my_table', {
            cli,
            user: {
              id: userId,
              login: userLogin,
              admin: useradmin
            }
          });
          })
          
      res.redirect('back');
      })
      }      
}
});

router.get('/tablepith/:id', (req, res, next) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const useradmin = req.session.userAdmin;
  const usermanager = req.session.userManager;
  const id = req.params.id.trim().replace(/ +(?= )/g, '');

  if(!userId || !userLogin || !useradmin && !usermanager) {
    res.redirect('/');
  } else if (!id) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  } else {
    models.Post.findById(id)
    .then(post => {
      if (!post) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
      } else {
        models.Client.find()
        .then(clients => {
          models.Pith.find()
            .then(piths => {
              res.render('tables/townpith', {
                post,
                clients,
                piths,
                user: {
                  id: userId,
                  login: userLogin,
                  admin: useradmin,
                  manager: usermanager
                }
              });
            })

        });
      }
    });
  }
});

router.get('/', (req, res) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const useradmin = req.session.userAdmin;

  if(!userId || !userLogin || !useradmin) {
    res.redirect('/');
  } else {
    res.render('tables/createtable', {
      user: {
        id: userId,
        login: userLogin,
        admin: useradmin
      }
    });
  }
});

module.exports = router;