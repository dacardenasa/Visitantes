const mongoose = require('mongoose');

class Database {
  constructor(environmentVar,url, settings) {
    this.url = url;
    this.settings = settings;
    this.environmentVar = environmentVar;
  }

  async connect() {
    try {
      await mongoose.connect(this.environmentVar || this.url, this.settings);
    } catch (error) {
      return handleError(error);
    }
  }

}

module.exports = Database;