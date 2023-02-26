const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    select: false,
  },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
