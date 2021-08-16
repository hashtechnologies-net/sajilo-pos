/** @format */

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Review = require('../models/review.models');
const Product= require('../models/product.models');

// @desc      Get reviews
// @route     GET /api/v1/reviews
// @route     GET /api/v1/products/:id/reviews
// @access    Public
exports.getAllReviews = asyncHandler(async (req, res, next) => {
	if (req.params.id) {
		const reviews = await Review.find({ product: req.params.id });

		return res.status(200).json({
			success: true,
			count: reviews.length,
			data: reviews,
		});
	} else {
		res.status(200).json(res.allqueryresults);
	}
});
// @desc      Get single review
// @route     GET /api/v1/reviews/:id
// @access    Public
exports.getSingleReview = asyncHandler(async (req, res, next) => {
	const review = await Review.findById(req.params.id).populate({
		path: 'product',
		select: 'product_name product_code',
	});

	if (!review) {
		return next(
			new ErrorResponse(
				`No review found with the id of ${req.params.id}`,
				404
			)
		);
	}

	res.status(200).json({
		success: true,
		data: review,
	});
});

// @desc      Add review
// @route     POST /api/v1/products/:id/reviews
// @access    Private
exports.addReview = asyncHandler(async (req, res, next) => {
req.body.customer= req.customer.id;
  let products = req.body.product;
  const product= await Product.findOne({_id:products})
  if (!product) {
    return next(
      new ErrorResponse(
        `No product with the id of ${req.body.product}`,
        404
      )
    );
  }
//customer cannot review the same product twice
let count=0
let review = await Review.find({product:products});
review.forEach((item)=>{
  if(item.customer==req.customer.id)
  {
    count++;
  }
});

if(count==0)
{
  review = await Review.create(req.body);
    res.status(201).json({
        success: true,
        data: review
      });
    }
    return next(
      new ErrorResponse("You cannot review the same product more than once",400)
    )
    
});

// @desc      Update review
// @route     PUT /api/v1/reviews/:id
// @access    Private
exports.updateReview = asyncHandler(async (req, res, next) => {
	let review = await Review.findById(req.params.id);

	if (!review) {
		return next(
			new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
		);
	}

	// Make sure product belongs to vendor or admin
	review = await Review.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		success: true,
		data: review,
	});
});

// @desc      Delete review
// @route     DELETE /api/v1/reviews/:id
// @access    Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
	const review = await Review.findById(req.params.id);

	if (!review) {
		return next(
			new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
		);
	}

	//   // Make sure review belongs to user or user is admin
	//   if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
	//     return next(new ErrorResponse(`Not authorized to update review`, 401));
	//   }

	await review.remove();

	res.status(200).json({
		success: true,
		data: {},
	});
});


exports.reviewStatus = asyncHandler(async (req, res, next) => {
    let review = await Review.findById(req.params.id);
    
    
  
    if (!review) {
      return next(
        new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
      );
    }

     let products=review.product
  
    let product=await Product.findOne(products);
    if(product.created_by==req.creator.id){
    if(review.status==='Unapproved'){
        req.body.status='Approved'
    }
  }
  else{
    return next(
      new ErrorResponse('This product was not created by you',400)
    )
  }

    // Make sure product belongs to vendor or admin
    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

  
    res.status(200).json({
      success: true,
      data: review
    });
  });
