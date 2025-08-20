const userService = require("../services/user.service");
const response = require("../utils/response");
const { sendMail } = require("../utils/mailer");
const jwt = require("jsonwebtoken");

class AuthController {
    async register(req, res, next) {
        try {
            const {name, email, password, numberphone} = req.body;
            const existingUser = await userService.findByEmail(email);
            if(existingUser) {
                return response.error(res, 'Email already exists', 400);
            }

            const newUser = await userService.create({name, email, password, numberphone, role: "user"});

            response.created(res, { user : { id: newUser._id, name: newUser.name, email: newUser.email, numberphone: newUser.numberphone, role: newUser.role }});
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await userService.findByEmail(email);
            if (!user) {
                return response.error(res, 'Invalid email or password', 401);
            }

            const isMatch = await userService.checkPassword(password, user.password);
            if (!isMatch) {
                return response.error(res, 'Invalid email or password', 401);
            }

            const token = jwt.sign(
                { id: user._id, email: user.email, name: user.name, numberphone: user.numberphone, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRATION || '1h' } 
            );  

            response.success(res, { token, user: { id: user._id, name: user.name, email: user.email, numberphone: user.numberphone, role: user.role} });
        } catch (error) {
            next(error);
        }
    }

    async forgorPassword(req, res, next) {
        try {
            const { email } = req.body;
            const result = await userService.generateResetToken(email);
            if (!result) {
                return response.error(res, 'User not found', 404);
            }
            console.log(result);
            
            const resetUrl = `http://localhost:5000/api/auth/resetpass?token=${result.token}`;

            console.log(resetUrl);
            
            await sendMail(
                result.user.email,
                "Password Reset Request",
                `<p>You requested a password reset. Click below:</p>
                <a href="${resetUrl}">${resetUrl}</a>`
            );

            return res.json({ message: "Reset password link has been sent" }); // phải có return
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();