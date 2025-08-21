const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

const router = express.Router();

router.get("/" , authMiddleware, roleMiddleware("admin"), userController.getAllUsers);
router.get("/:id", authMiddleware, userController.getUserById); 
router.put("/:id", authMiddleware, userController.updateUser); 
router.delete("/:id", authMiddleware, userController.deleteUserById);

module.exports = router;