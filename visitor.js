const mongoose = require('mongoose');

class Visitor {
  constructor(schema){
    this.model = mongoose.model('Visitor', schema);
    this.response = 'El visitante fue almacenado con éxito';
  }

  addVisitor(data) {
    let visitor = new this.model(data);
    visitor.save((error) => {
        if (error) return handleError(error);
    });
    return this.response;
  }
}

module.exports = Visitor;