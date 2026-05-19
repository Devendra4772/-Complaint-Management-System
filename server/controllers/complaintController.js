const Complaint = require('../models/Complaint');

// Create a complaint
exports.createComplaint = async (req, res) => {
  try {

    const {
      title,
      description,
      category
    } = req.body;

    const text =
      `${title} ${description} ${category}`.toLowerCase();

    let priority = "Normal";
    let department = "General";

    // Water complaints
    if (
      text.includes("water") ||
      text.includes("leak") ||
      text.includes("pipeline")
    ) {
      priority = "High";
      department = "Water Department";
    }

    // Electricity complaints
    else if (
      text.includes("electricity") ||
      text.includes("power")
    ) {
      priority = "High";
      department = "Electricity Department";
    }

    // Garbage complaints
    else if (
      text.includes("garbage") ||
      text.includes("waste")
    ) {
      priority = "Medium";
      department = "Sanitation Department";
    }

    const complaint = await Complaint.create({
      ...req.body,
      priority: priority,
      department: department
    });

    res.status(201).json(complaint);

  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message
    });
  }
};

// Get all complaints
exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update complaint status
exports.updateComplaint = async (req, res) => {
  try {
    const { status } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    res.status(200).json(complaint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a complaint
exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    res.status(200).json({ message: 'Complaint deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search complaints
exports.searchComplaints = async (req, res) => {
  try {
    const { location, category } = req.query;
    let query = {};
    if (location) query.location = { $regex: location, $options: 'i' };
    if (category) query.category = category;

    const complaints = await Complaint.find(query);
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
