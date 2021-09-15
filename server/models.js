const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://TheDumper:dump@cluster0.ma35n.mongodb.net/floem?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'floem'
})
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log(error));


const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  poems: [{
    rawPoem: String,
    title: String,
    isStuttering: Boolean,
    stanza: [Schema.Types.Mixed]
  }]
});

const User = mongoose.model('user', userSchema);

module.exports = { User };