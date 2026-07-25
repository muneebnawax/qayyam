const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const compression = require('compression');

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Compress responses
app.use(compression());

// Body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Enable CORS for all origins
app.use(cors());

// Route files
const hostelRoutes = require('./routes/hostelRoutes');
const authRoutes = require('./routes/authRoutes');

// API Health Check
app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'Qayyam Backend API is live', timestamp: new Date() });
});

// Mount routers
app.use('/api/hostels', hostelRoutes);
app.use('/api/auth', authRoutes);

// Connect to database
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error('CRITICAL ERROR: MONGO_URI is missing from environment variables!');
            return;
        }
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`MongoDB Connection Error: ${err.message}`);
    }
};

connectDB();

// Serve static build if client dist exists
const clientDistPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
    app.use(express.static(clientDistPath));
    app.get('/{*splat}', (req, res) => {
        res.sendFile(path.resolve(clientDistPath, 'index.html'));
    });
} else {
    app.get('/', (req, res) => res.json({ success: true, message: 'Qayyam Backend API is running' }));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

