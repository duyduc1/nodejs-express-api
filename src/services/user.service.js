const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

class UserService {
    async getAllUsers() {
        return await User.find({});
    }

    async getUserById(id) {
        return await User.findById(id);
    }

    async create(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = new User({ ...data, password: hashedPassword });
        return user.save();
    }

    async findByEmail(email) {
        return User.findOne({ email });
    }

    async checkPassword(rawPassword, hashedPassword) {
        return bcrypt.compare(rawPassword, hashedPassword);
    }

    async updateUser(id , data) {
        return User.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteUserById(id) {
        return User.findByIdAndDelete(id);
    }

    // forgot password
    async generateResetToken(email) {
        const user = await User.findOne({ email });
        if (!user) return null;

        const token = crypto.randomBytes(32).toString("hex");
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        await user.save();

        return { user, token };
    }
}

module.exports = new UserService();