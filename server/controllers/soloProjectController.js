const db = require('../models/soloProjectModels');
const Session = require('../models/sessionModels');

const soloProjectController = {};

// added getAllUsers for testing purpose
soloProjectController.getAllUsers = (req, res, next) => {
  const findAllUsers = `SELECT * FROM users`;
  db.query(findAllUsers)
    .then(data => {
      if(!data.rows[0]){
        res.locals.allUsers = 'no user in db';
      }
      else{
        res.locals.allUsers = data.rows;
      }
      return next();
    })
    .catch((e) => {
      return next({log: 'getAllUsers failed', message: e.detail});});
};

soloProjectController.createUser = (req, res, next) => {
  const { fn, ln, email, pw } = req.body;
  const insertUser = `INSERT INTO users (fn, ln, email, pw) VALUES ('${fn}', '${ln}', '${email}', '${pw}')`;

  db.query(insertUser)
    .then(data => {
      return next();
    })
    .catch((e) => {
      return next({log: 'createUser failed', message: e.detail});});
  
};

soloProjectController.getUser = (req, res, next) => {
  const findUser = `SELECT * FROM users WHERE email = '${req.query.email}'`;
  db.query(findUser)
    .then(data => {
      if(!data.rows[0]){
        res.locals.user = 'no user';
      }
      else{
        res.locals.user = data.rows[0];
      }
      return next();
    })
    .catch((e) => {
      return next({log: 'getUser failed', message: e.detail});});
};

soloProjectController.createOrder = (req, res, next) => {
  const { userid, link, note } = req.body;
  const insertOrder = `INSERT INTO orders (userid, link, note) VALUES ('${userid}', '${link}', '${note}')`;

  db.query(insertOrder)
    .then(data => {
      return next();
    })
    .catch((e) => {
      return next({log: 'createOrder failed', message: e.detail});});
};

soloProjectController.getOrder = (req, res, next) => {
  const findOrder = `SELECT * FROM orders WHERE userid = '${req.query.userid}' ORDER BY orderid`;
  db.query(findOrder)
    .then(data => {
      if(!data.rows[0]){
        res.locals.order = 'no order';
      }
      else{
        res.locals.order = data.rows;
      }
      return next();
    })
    .catch((e) => {
      return next({log: 'getOrder failed', message: e.detail});});
};

soloProjectController.quoteAccepted = (req, res, next) => {
  const quoteAccepted = `UPDATE orders SET agreequote = 'yes' WHERE orderid = '${req.query.orderid}'`;
  db.query(quoteAccepted)
    .then(data => {
      return next();
    })
    .catch((e) => {
      return next({log: 'quoteAccepted failed', message: e.detail});});
};

soloProjectController.deleteOrder = (req, res, next) => {
  const deleteOrder = `DELETE FROM orders WHERE orderid = '${req.query.orderid}'`;
  db.query(deleteOrder)
    .then(data => {
      return next();
    })
    .catch((e) => {
      return next({log: 'deleteOrder failed', message: e.detail});});
};

// Mongoose
soloProjectController.startSession = (req, res, next) => {
  Session.create({cookieId: res.locals.user.userid})
    .then(data => {return next();})
    .catch((e) => {return next();});
};

// Mongoose
soloProjectController.hasSession = (req, res, next) => {

  Session.findOne({cookieId: req.cookies.userid}).then(document => {
    if(!document){
      res.locals.user = null;
      return next();
    }
    const findUser = `SELECT * FROM users WHERE userid = '${document.cookieId}'`;

    db.query(findUser)
      .then(data => {
        res.locals.user = data.rows[0];
        return next();
      });
  })
    .catch((e) => {
      return next({log: 'hasSession failed', message: e.detail});});
};

// Mongoose
soloProjectController.deleteSession = (req, res, next) => {
  Session.deleteOne({cookieId: req.query.userid}).then(document => {
    return next();
  })
    .catch((e) => {
      return next({log: 'deleteSession failed', message: e.detail});});
};

// Set cookie
soloProjectController.setUseridCookie = (req, res, next) => {
  if(res.locals.user.userid){
    res.cookie('userid', res.locals.user.userid);
  }
    
  return next();
};

module.exports = soloProjectController;
