const express = require('express');
const soloProjectController = require('../controllers/soloProjectController');

const router = express.Router();

router.post('/createuser', soloProjectController.createUser, (req, res) => res.status(200).json('create user done'));

router.get('/getuser', soloProjectController.getUser, soloProjectController.startSession, soloProjectController.setUseridCookie, (req, res) => res.status(200).json(res.locals.user));

router.get('/getsession', soloProjectController.hasSession, (req, res) => res.status(200).json(res.locals.user));

router.delete('/deletesession', soloProjectController.deleteSession, (req, res) => res.status(200).json('session deleted'));

router.post('/createorder', soloProjectController.createOrder, (req, res) => res.status(200).json('create order done'));

router.get('/getorder', soloProjectController.getOrder, (req, res) => res.status(200).json(res.locals.order));



router.patch('/quoteaccepted', soloProjectController.quoteAccepted, (req, res) => res.status(200).json('quote accepted'));

router.delete('/deleteorder', soloProjectController.deleteOrder, (req, res) => res.status(200).json('order deleted'));


module.exports = router;