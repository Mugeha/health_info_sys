const Client = require('../models/Client');
const Program = require('../models/Program');

exports.registerClient = async (req, res) => {
  const { name, age, gender, contact } = req.body;

  try {
    const client = await Client.create({ name, age, gender, contact });
    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ message: 'Error registering client', error: err.message });
  }
};

exports.getClients = async (req, res) => {
  const search = req.query.name;
  try {
    const clients = search
      ? await Client.find({ name: { $regex: search, $options: 'i' } })
      : await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching clients', error: err.message });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).populate('enrolledPrograms');
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.status(200).json(client);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching client profile', error: err.message });
  }
};

exports.enrollClientToPrograms = async (req, res) => {
  const { programIds } = req.body;

  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    client.enrolledPrograms.push(...programIds);
    await client.save();

    const populated = await client.populate('enrolledPrograms');
    res.status(200).json(populated);
  } catch (err) {
    res.status(500).json({ message: 'Error enrolling client', error: err.message });
  }
};
