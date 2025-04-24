const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
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
