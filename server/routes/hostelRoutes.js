const express = require('express');
const { createHostel, getHostels, getHostelById, updateHostel, deleteHostel } = require('../controllers/hostelController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router
    .route('/')
    .post(protect, createHostel)
    .get(getHostels);

router
    .route('/:id')
    .get(getHostelById)
    .put(protect, updateHostel)
    .delete(protect, deleteHostel);

module.exports = router;
