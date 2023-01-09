const mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://localhost/crud-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

// Handle any errors
db.on('error', console.error.bind(console, 'connection error:'));

// Once the connection is open, we can start performing CRUD operations
db.once('open', function() {
  console.log('Connected to the database!');
});
