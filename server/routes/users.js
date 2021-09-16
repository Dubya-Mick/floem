const express = require('express');

const userController = require('../userController');

const router = express.Router();

router.get(
  '/',
  userController.getUser,
  userController.addIds,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
)

router.post(
  '/',
  userController.addUser,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
)

router.put(
  '/',
  userController.updatePoems,
  userController.addIds,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }



)



module.exports = router;