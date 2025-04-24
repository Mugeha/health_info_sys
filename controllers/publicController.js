const Client = require('../models/Client');

exports.getClientPublicProfile = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).populate('enrolledPrograms');
    if (!client) return res.status(404).json({ message: 'Client not found' });

    const { _id, name, age, gender, enrolledPrograms } = client;

    res.status(200).json({
      id: _id,
      name,
      age,
      gender,
      enrolledPrograms: enrolledPrograms.map(p => ({
        id: p._id,
        name: p.name,
        description: p.description
      }))
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile', error: err.message });
  }
};
