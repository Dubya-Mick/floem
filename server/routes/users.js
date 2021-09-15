const express = require('express');

const userController = require('../userController');

const router = express.Router();

router.get(
  '/',
  userController.getUsers,
  (req, res) => {
    console.log('logged from router', res.locals.users);
    res.status(200).json(res.locals.users);
  }
)

router.post(
  '/',
  userController.addUser,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
)

module.exports = router;