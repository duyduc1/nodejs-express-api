const express = require('express');
const userRouter = require("./user.router");
const authRouter = require("./auth.router");
const uploadRouter = require("./upload.router")

const router = express.Router();

router.use("/users", userRouter);
router.use("/auth", authRouter)
router.use("/upload", uploadRouter)

module.exports = router;