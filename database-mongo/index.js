var mongoose = require('mongoose');
const axios = require('axios').default;
mongoose.connect('mongodb://localhost/mvp');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var itemSchema = mongoose.Schema({
  name: String,
  nausea: Boolean,
  pain: Boolean,
  insomnia: Boolean,
  stress: Boolean,
  rating: Number,
  rating_count: Number,
  type: String,
  thc: Number,
  short_desc: String,
  long_desc: String,
});

var Item = mongoose.model('Item', itemSchema);

var selectAll = function(callback) {
  Item.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

const addOne = (callback) => {
  Item.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};
module.exports.selectAll = selectAll;
module.exports.addOne = addOne;