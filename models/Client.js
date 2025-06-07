const mongoose = require('mongoose');
const { nanoid } = require('nanoid'); // install this with `npm install nanoid`

const clientSchema = new mongoose.Schema({
  publicId: {
    type: String,
    default: () => nanoid(10), // e.g., "6f9K3L5aQb"
    unique: true
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
