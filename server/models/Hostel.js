const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a hostel name'],
    },
    location: {
        type: String,
        required: [true, 'Please add a location'],
        index: true
    },
    city: {
        type: String,
        default: 'Peshawar',
        index: true
    },
    area: {
        type: String,
        index: true
    },
    address: {
        type: String,
    },
    description: {
        type: String,
    },
    furnished: {
        type: String,
        default: 'Furnished'
    },
    coordinates: {
        lat: { type: Number },
        lng: { type: Number }
    },
    capacity: {
        type: Number,
        required: [true, 'Please add capacity (Total Beds)'],
    },
    wardenName: {
        type: String,
        required: [true, 'Please add warden name'],
    },
    contactNumber: {
        type: String,
        required: [true, 'Please add contact number'],
    },
    price: {
        type: String,
        default: "Contact for pricing",
    },
    gender: {
        type: String,
        default: "All Genders",
        index: true
    },
    image: {
        type: String,
        default: "https://via.placeholder.com/400x300",
    },
    images: {
        type: [String],
        default: [],
    },
    tag: {
        type: String,
        default: "",
    },
    amenities: {
        type: [String],
        default: [],
    },
    warden: {
        type: mongoose.Schema.ObjectId,
        ref: 'Warden',
        required: false,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Hostel', hostelSchema);
