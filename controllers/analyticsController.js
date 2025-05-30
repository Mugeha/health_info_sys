const Client = require('../models/Client');
const Program = require('../models/Program');

const getClientAnalyticsSummary = async (req, res) => {
  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const last7Days = new Date(now);
    last7Days.setDate(now.getDate() - 7);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

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

    const newClientsToday = await Client.countDocuments({ createdAt: { $gte: startOfToday } });
    const newClientsLast7Days = await Client.countDocuments({ createdAt: { $gte: last7Days } });

    // Group by month (returns array like [{ _id: 1, count: 5 }, ...] for Jan, Feb, etc.)
    const monthlyClients = await Client.aggregate([
      {
        $match: { createdAt: { $gte: startOfYear } }
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.json({
      totalClients,
      totalPrograms,
      enrolledClients,
      genderBreakdown,
      ageRanges,
      timeStats: {
        newClientsToday,
        newClientsLast7Days,
        monthlyClientsThisYear: monthlyClients,
      }
    });

  } catch (error) {
    console.error('Analytics Error:', error);
    res.status(500).json({ error: 'Server error while fetching analytics' });
  }
};

module.exports = {
  getClientAnalyticsSummary,
};
