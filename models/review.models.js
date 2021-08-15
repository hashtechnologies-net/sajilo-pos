const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title for the review'],
    maxlength: 100,
  },
  text: {
    type: String,
    required: [true, 'Please add some text']
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref:'product',
    required: true,

},
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: 'customer',
    required: true,
},

status: {
    type: String,
    enum: ['Approved','Unapproved'],
    default: 'Unapproved',
    required: true,
}

});

module.exports = mongoose.model('Review', ReviewSchema);
