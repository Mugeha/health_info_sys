const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User'); // Adjust path if needed

dotenv.config(); // Load .env

// Debug .env variables
console.log('[DEBUG] ADMIN_EMAIL:', process.env.ADMIN_EMAIL);
console.log('[DEBUG] STAFF_EMAIL:', process.env.STAFF_EMAIL);
console.log('[DEBUG] GUEST_EMAIL:', process.env.GUEST_EMAIL);
console.log('[DEBUG] ADMIN_PASS:', process.env.ADMIN_PASS ? '[HIDDEN]' : 'undefined');
console.log('[DEBUG] STAFF_PASS:', process.env.STAFF_PASS ? '[HIDDEN]' : 'undefined');
console.log('[DEBUG] GUEST_PASS:', process.env.GUEST_PASS ? '[HIDDEN]' : 'undefined');

// Determine connection URI
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ev';
console.log('🔗 Connecting to MongoDB at:', MONGO_URI);

const users = [
  {
    username: 'adminuser',
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASS,
    role: 'admin',
  },
  {
    username: 'staffuser',
    email: process.env.STAFF_EMAIL,
    password: process.env.STAFF_PASS,
    role: 'staff',
  },
  {
    username: 'guestuser',
    email: process.env.GUEST_EMAIL,
    password: process.env.GUEST_PASS,
    role: 'guest',
  },
];

async function seedUsers() {
  await mongoose.connect(MONGO_URI);

  try {
    console.log('🚀 Starting user seeding...');

    for (let user of users) {
      console.log(`🔍 Checking user: ${user.email}`);

      if (!user.email || !user.password) {
        console.error(`❌ Missing credentials for user: ${user.username}`);
        continue;
      }

      const exists = await User.findOne({ email: user.email });

      if (exists) {
        console.log(`⚠️  User already exists: ${user.email} (${exists.role})`);
        continue;
      }

      // const hashedPassword = await bcrypt.hash(user.password, 12);

      const newUser = new User({
        ...user,
        // password: hashedPassword,
          password: user.password, 

      });

      await newUser.save();
      console.log(`✅ Created: ${newUser.username} (${newUser.role})`);
    }

    console.log('🎉 Seeding complete.');
  } catch (err) {
    console.error('❌ Error during seeding:', err);
  } finally {
    await mongoose.disconnect();
  }
}

seedUsers();
