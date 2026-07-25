const Warden = require('../models/Warden');

// @desc    Register warden
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Create warden
        const warden = await Warden.create({
            name,
            email,
            password
        });

        sendTokenResponse(warden, 200, res);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Login warden
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Please provide an email and password' });
        }

        // Check for warden
        const warden = await Warden.findOne({ email }).select('+password');
        if (!warden) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await warden.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        sendTokenResponse(warden, 200, res);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Get current logged in warden
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
    try {
        const warden = await Warden.findById(req.warden.id).lean();
        res.status(200).json({
            success: true,
            data: warden
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Helper
const sendTokenResponse = (warden, statusCode, res) => {
    const token = warden.getSignedJwtToken();
    res.status(statusCode).json({
        success: true,
        token
    });
};
