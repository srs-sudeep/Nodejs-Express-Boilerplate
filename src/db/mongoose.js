const mongoose = require('mongoose');
const config = require('../config/config');
const logger = require('../config/logger');

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

module.exports = connectDB;
