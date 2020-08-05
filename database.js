const mongoose = require('mongoose');

class Database {
  constructor(environmentVar,url, settings) {
    this.url = url;
    this.settings = settings;
    this.environmentVar = environmentVar;
    this.schema = mongoose.Schema({
      date: { type: Date, default: Date.now },
      name: String,
    }, { collection: 'visitors' });
  }

  async connect() {
    try {
      await mongoose.connect(this.environmentVar || this.url, this.settings);
    } catch (error) {
      return handleError(error);
    }
  }

  getSchema() {
    return this.schema;
  }

}

module.exports = Database;