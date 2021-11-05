const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
	
    customer_id: {
        type: mongoose.Schema.ObjectId,
        ref: "customer",
        required: true
    },

    description: [
		{
			product: {
				type: mongoose.Schema.ObjectId,
				ref: 'product',
				required: true,
			},
			stock: {
				type: Number,
				required: [true, 'Please add the stock number'],
			},
		},
	],
    
    status: {
        type: String,
		enum: ['Received','Packaging','Delivered'],
        required: true,
	},

    created_at: {
		type: Date,
		default: Date.now,
	},

    total_amount: {

        type: Number,
        required: true
    },

    payment_status: {
        type:String,
        enum: ['Cash On Delivery','Paid'],
        required: true

    }
})

module.exports = mongoose.model('order', OrderSchema);