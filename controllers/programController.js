const Program = require('../models/Program');

exports.createProgram = async (req, res) => {
  const { name, description } = req.body;

  try {
    const existing = await Program.findOne({ name });
    if (existing) return res.status(400).json({ message: 'Program already exists' });

    const program = await Program.create({ name, description });
    res.status(201).json(program);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create program', error: err.message });
  }
};

exports.getPrograms = async (req, res) => {
  try {
    const programs = await Program.find();
    res.status(200).json(programs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching programs', error: err.message });
  }
};
