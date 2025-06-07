const Client = require('../models/Client');
const Program = require('../models/Program');

exports.registerClient = async (req, res) => {
  const { name, age, gender, contact } = req.body;

  try {
    const client = await Client.create({ name, age, gender, contact });
    res.status(201).json({
      message: 'Client registered',
      client: {
        publicId: client.publicId,
        name: client.name,
        age: client.age,
        gender: client.gender
      }
    });
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
    console.log('Client ID from params:', req.params.id);
    
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
exports.getPublicClientProfile = async (req, res) => {
  try {
    const client = await Client.findOne({ publicId: req.params.publicId })
      .populate('enrolledPrograms', 'name');

    if (!client) return res.status(404).json({ message: 'Client not found' });

    const publicData = {
      name: client.name,
      age: client.age,
      gender: client.gender,
      enrolledPrograms: client.enrolledPrograms
    };

    res.status(200).json(publicData);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching public client profile', error: err.message });
  }
};

exports.searchClientsPublic = async (req, res) => {
  const { name } = req.query;

  try {
    const clients = name
      ? await Client.find({ name: { $regex: name, $options: 'i' } })
          .select('name age gender publicId')
      : [];

    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ message: 'Error searching clients', error: err.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting client', error: err.message });
  }
};



