const mongoose = require('mongoose');

class Visitor {
  constructor(){
    this.schema = mongoose.Schema({
      name: String,
      count: { type: Number, default: 1 },
    }, { collection: 'visitors' });

    return mongoose.model('Visitor', this.schema);
  }
}

module.exports = Visitor;