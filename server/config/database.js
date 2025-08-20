const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/college_management_system';
    console.log('Connecting to MongoDB:', mongoURI);
    
    const conn = await mongoose.connect(mongoURI, {
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      }
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });

    return true; // Return true on successful connection

  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    console.error('Please ensure MongoDB is running and accessible');
    console.error('You can install MongoDB from: https://docs.mongodb.com/manual/installation/');
    console.error('Or use MongoDB Atlas (cloud): https://www.mongodb.com/atlas');
    
    // Don't exit the process, let the server continue with limited functionality
    console.log('Server will continue without database connection');
    return false;
  }
};

module.exports = connectDB;
