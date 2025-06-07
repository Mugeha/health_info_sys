const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const clientSchema = new mongoose.Schema({
  publicId: {
    type: String,
    default: uuidv4,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: true
  },
  age: Number,
  gender: String,
  contact: String,
  enrolledPrograms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program'
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
