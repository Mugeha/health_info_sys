const Client = require('../models/Client');
const Program = require('../models/Program');

const getClientAnalyticsSummary = async (req, res) => {
  try {
    const totalClients = await Client.countDocuments();
    const totalPrograms = await Program.countDocuments();
    const enrolledClients = await Client.countDocuments({ enrolled: true });

    const genderBreakdown = {
      male: await Client.countDocuments({ gender: 'Male' }),
      female: await Client.countDocuments({ gender: 'Female' }),
      other: await Client.countDocuments({ gender: { $nin: ['Male', 'Female'] } }),
    };

    const ageRanges = {
      '0-18': await Client.countDocuments({ age: { $lte: 18 } }),
      '19-30': await Client.countDocuments({ age: { $gte: 19, $lte: 30 } }),
      '31-50': await Client.countDocuments({ age: { $gte: 31, $lte: 50 } }),
      '50+': await Client.countDocuments({ age: { $gt: 50 } }),
    };

    res.json({
      totalClients,
      totalPrograms,
      enrolledClients,
      genderBreakdown,
      ageRanges,
    });
  } catch (error) {
    console.error('Analytics Error:', error);
    res.status(500).json({ error: 'Server error while fetching analytics' });
  }
};

module.exports = {
  getClientAnalyticsSummary,
};
