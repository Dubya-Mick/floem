const mongoose = require('mongoose');
const models = require('./models');
const uniqid = require('uniqid');

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

userController.getUser = async (req, res, next) => {
  try {
    const { username } = req.query;

    const user = await models.User.findOne({ username: username });
    res.locals.user = user;
    console.log('rezzzyy locals', res.locals.user)
    return next();
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

userController.updatePoems = async (req, res, next) => {
  const newPoems = req.body.poems;
  const { username } = req.query;

  try {
    const updatedUser = await models.User.findOneAndUpdate(
      { username: username },
      { poems: newPoems},
      { new: true }
    );

    res.locals.user = updatedUser;
    return next();
      
  } catch (error) {
    return next({
      log: 'something went wrong in updatePoems',
      status: 500,
      message: {err: error}
    })
  }
}

userController.addIds = (req, res, next) => {
  if (!res.locals.user) {
    return next({
      log: 'something went wrong in addIds: no updatedUser on res.locals',
      status: 500,
    })
  }
  const { poems } = res.locals.user;
  console.log(poems);
  const poemsWithIds = poems.map(poem => {

    const stanzaWithIds = poem.stanza.map(word => {
      return {
        ...word,
        id: uniqid()
      }
    });

    return {
      ...poem.toObject(), 
      stanza: stanzaWithIds
    }
  })

  res.locals.user.poems = poemsWithIds;
  console.log('add ids', res.locals.user)
  return next();
}

module.exports = userController;