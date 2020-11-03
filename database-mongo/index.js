const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mvp');

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

const itemSchema = mongoose.Schema({
  name: String,
  Nausea: Boolean,
  Pain: Boolean,
  Sleep: Boolean,
  Stress: Boolean,
  rating: Number,
  rating_count: Number,
  type: String,
  thc: Number,
  short_desc: String,
  long_desc: String,
  img: String,
});

const Item = mongoose.model('Item', itemSchema);

const selectAll = (callback) => {
  Item.find({}, (err, items) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};
const selectSome = (data, callback) => {
  //console.log('data in db', data);
  Item.find(data, (err, items) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

const addOne = (data, callback) => {
  Item.create(data, (err, items) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};
module.exports.selectAll = selectAll;
module.exports.selectSome = selectSome;
module.exports.addOne = addOne;
