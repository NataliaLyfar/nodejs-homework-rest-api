const jwt = require("jsonwebtoken");
const { RequestError } = require("../../helpers");

const { User } = require("../../models/user");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw RequestError(401, `Email is  or password is wrong`);
  }
  if (!user.verify) {
    throw RequestError(401, "Email not verify");
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: {
      email,
      subscription,
    },
  });
};

module.exports = login;
