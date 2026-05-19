const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createComplaint,
  getComplaints,
  updateComplaint,
  deleteComplaint,
  searchComplaints
} = require('../controllers/complaintController');

router.post('/', protect, createComplaint);
router.get('/', protect, getComplaints);
router.get('/search', protect, searchComplaints);
router.put('/:id', protect, updateComplaint);
router.delete('/:id', protect, deleteComplaint);

module.exports = router;
