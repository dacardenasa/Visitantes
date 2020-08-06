const Model = require("../models/visitor");

class Visitor {
  constructor() {
    this.model = new Model();
  }

  async saveVisitor({ name } = data) {
    await this.model.findOne({ name: name }, (error, visitor) => {
      if (error) return handleError(error);

      const addNewVisitor = async () => {
        let newVisitor = new this.model({ name: name });
        await newVisitor.save((error) => {
          if (error) return handleError(error);
        });
      }
      
      if (visitor === null) {
        addNewVisitor();
      } else if (visitor.name === 'Anónimo'){
        addNewVisitor();
      } else {
        visitor.count += 1;
        visitor.save((error) => {
          if (error) return handleError(error);
        });
      }
    });
  }

  async listVisitors() {
    return await this.model.find((err, visitors) => {
        if (err) return handleError(err);
        return visitors;
    });
  }
}

module.exports = Visitor;
