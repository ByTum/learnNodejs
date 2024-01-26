const express = require('express');
const reviewContoller = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewContoller.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewContoller.setTourUserIds,
    reviewContoller.createReview
  );

router
  .route('/:id')
  .patch(reviewContoller.updateReview)
  .delete(reviewContoller.deleteReview);

module.exports = router;
