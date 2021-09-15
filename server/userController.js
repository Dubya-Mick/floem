const mongoose = require('mongoose');
const models = require('./models');

const userController = {};

const createUser = (username) => {
  return {
    username: username,
    poems: [
      {
        rawPoem: '',
        title: 'My First Poem',
        isStuttering: false,
        stanza: []
      }
    ]
  }
}

userController.getUsers = async (req, res, next) => {
  try {
    const users = await models.User.find({});
    console.log('poems', users[0].poems[0]._id)
    console.log('logged from middleware get users', users);
    res.locals.users = users;
    next();
  } catch (err) {
    next({
      log: 'something went wrong in getUsers',
      status: 500,
      message: { err: err }
    })
  }
}

userController.addUser = async (req, res, next) => { 
  const { username } = req.query;
  const newUser = createUser(username);

  try {
    const user = await models.User.create(newUser);
    res.locals.user = user;
    return next();
  } catch (err) {
    return next({
      log: 'something went wrong in addUser',
      status: 500,
      message: { err: err }
    })
  }


}

module.exports = userController;