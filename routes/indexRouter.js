const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');
const uploadImageMiddleware = require('../middlewares/uploadImage');

router.get('/', PaymentController.index);

router.get('/new-payment', PaymentController.create);
router.post('/new-payment', PaymentController.createAction);
router.get('/edit-payment/:id', PaymentController.update);
router.post('/edit-payment/:id', PaymentController.updateAction);
router.post('/delete-payment', PaymentController.delete);
router.get('/upload-spreadsheets', PaymentController.upload);
router.post('/upload-spreadsheets', 
    uploadImageMiddleware.uploadImage, 
    PaymentController.uploadAction
);

module.exports = router;