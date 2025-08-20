const User = require("../models/User.model");
const bcrypt = require("bcrypt");

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
}

module.exports = new UserService();