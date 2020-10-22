const dotenv = require("dotenv");

dotenv.config();

exports.MONGODB_URI = process.env.MONGODB_URI;
exports.PORT = process.env.PORT;
exports.SECRET = process.env.SECRET;
