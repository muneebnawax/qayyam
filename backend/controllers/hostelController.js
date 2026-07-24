const Hostel = require('../models/Hostel');

// @desc    Add a new hostel
// @route   POST /api/hostels
// @access  Public (or customize based on requirements)
exports.createHostel = async (req, res) => {
    try {
        const { name, location, capacity, wardenName, contactNumber, amenities, price, image, images, city, area, address, description, furnished, coordinates, gender } = req.body;

        const hostel = await Hostel.create({
            name,
            location,
            city,
            area,
            address,
            description,
            furnished,
            coordinates,
            gender,
            capacity,
            wardenName,
            contactNumber,
            amenities,
            price,
            image,
            images,
            warden: req.warden.id
        });

        res.status(201).json({
            success: true,
            data: hostel
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Get all hostels
// @route   GET /api/hostels
// @access  Public
exports.getHostels = async (req, res) => {
    try {
        let query = {};
        if (req.query.location) {
            // Support partial location matches (e.g. "Town" matches "University Town")
            query.location = { $regex: req.query.location, $options: 'i' };
        }
        if (req.query.gender && req.query.gender !== "All Genders") {
            // Case-insensitive exact gender match, e.g. "Male Only" maps to "Male" or handles it gracefully
            // Actually frontend passes "Male Only", we might just map it or use regex
            query.gender = { $regex: req.query.gender.replace(" Only", ""), $options: 'i' };
        }
        if (req.query.warden) {
            query.warden = req.query.warden;
        }

        const hostels = await Hostel.find(query).lean();

        res.status(200).json({
            success: true,
            count: hostels.length,
            data: hostels
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Get single hostel
// @route   GET /api/hostels/:id
// @access  Public
exports.getHostelById = async (req, res) => {
    try {
        const hostel = await Hostel.findById(req.params.id).lean();

        if (!hostel) {
            return res.status(404).json({
                success: false,
                error: 'Hostel not found'
            });
        }

        res.status(200).json({
            success: true,
            data: hostel
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Update hostel
// @route   PUT /api/hostels/:id
// @access  Private
exports.updateHostel = async (req, res) => {
    try {
        let hostel = await Hostel.findById(req.params.id);

        if (!hostel) {
            return res.status(404).json({
                success: false,
                error: 'Hostel not found'
            });
        }

        // Make sure user is hostel owner
        if (hostel.warden && hostel.warden.toString() !== req.warden.id) {
            return res.status(401).json({
                success: false,
                error: 'Not authorized to update this hostel'
            });
        }

        hostel = await Hostel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: hostel
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Delete hostel
// @route   DELETE /api/hostels/:id
// @access  Private
exports.deleteHostel = async (req, res) => {
    try {
        const hostel = await Hostel.findById(req.params.id);

        if (!hostel) {
            return res.status(404).json({
                success: false,
                error: 'Hostel not found'
            });
        }

        // Make sure user is hostel owner
        if (hostel.warden && hostel.warden.toString() !== req.warden.id) {
            return res.status(401).json({
                success: false,
                error: 'Not authorized to delete this hostel'
            });
        }

        await hostel.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};
// this i the my last project