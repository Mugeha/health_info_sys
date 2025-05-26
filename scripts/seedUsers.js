const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // adjust as needed
require('dotenv').config(); // Just in case .env isn't auto-loaded

// Validate required env vars
['ADMIN_EMAIL', 'ADMIN_PASS', 'STAFF_EMAIL', 'STAFF_PASS', 'GUEST_EMAIL', 'GUEST_PASS'].forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`❌ Missing environment variable: ${key}`);
  }
});

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
  await mongoose.connect('mongodb://localhost:27017/ev');

  try {
    await User.deleteMany({});
    console.log('🧨 Old users wiped.');

    for (let user of users) {
      console.log(`🔑 Hashing password for: ${user.username}`);
      console.log(`📧 Email: ${user.email}`);
      console.log(`👤 Role: ${user.role}`);

      const hashedPassword = await bcrypt.hash(user.password, 12);
      const newUser = new User({
        ...user,
        password: hashedPassword,
      });

      await newUser.save();
      console.log(`✅ Seeded: ${user.username} (${user.role})`);
    }

    console.log('🎉 All users seeded successfully.');
  } catch (err) {
    console.error('❌ Error seeding users:', err);
  } finally {
    mongoose.disconnect();
  }
}

seedUsers();
