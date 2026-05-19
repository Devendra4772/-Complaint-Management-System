const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'], 
    default: 'Pending' 
  },
  priority: { type: String, default: 'Normal' },
  department: { type: String, default: 'General' },
  aiSummary: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
