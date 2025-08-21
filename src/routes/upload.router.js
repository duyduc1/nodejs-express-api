const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../middlewares/upload.middleware');
const uploadController = require('../controllers/upload.controller');

router.post('/uploadfile', uploadMiddleware.single('image'), uploadController.uploadFile);
router.get('/', uploadController.getAllFile);
router.get('/:id', uploadController.getFileById);
router.put('/:id', uploadController.updateFile);
router.delete('/:id', uploadController.deleteFile);

module.exports = router