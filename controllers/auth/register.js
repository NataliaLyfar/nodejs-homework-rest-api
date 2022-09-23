const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { RequestError } = require("../../helpers");
const { User } = require("../../models/user");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, `User with ${email} already exist`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const result = await User.create({ name, email, avatarURL, password: hashPassword });
  res.status(201).json({
    user: {
      name: result.name,
      email: result.email,
      avatar: result.avatarURL,
    },
  });
};

module.exports = register;
