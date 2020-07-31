const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { verifyAccount } = require("./mail");
const { User } = require("../models");
const { Response } = require("../utils/response");
const { JWT_SECRET } = process.env;
const logger = require("../logger");

async function CreateUser(req, res) {
  try {
    const { email, password } = req.body;
    const data = {
      email,
      password,
    };
    const isUserExists = await User.findOne({ where: { email } });
    if (isUserExists) {
      return Response(res, 200, "Email already taken", null);
    }
    const generateRandomString = (length = 6) =>
      Math.random().toString(20).substr(2, length);
    const code = generateRandomString();
    let today = new Date();
    today.setHours(today.getHours() + 1);
    data.code = code;
    data.expires_in = today;
    const newUser = await new User(data);
    await newUser.save();
    res.json(newUser);
    await verifyAccount(email, code);
  } catch (err) {
    logger.log({
      level: "error",
      message: `Can't create User ${err}`,
      label: "api",
    });
    throw new Error(`Can't create User ${err}`);
  }
}

async function ActivateAccount(req, res) {
  try {
    const { code } = req.body;
    const { email } = req.user;

    if (!code) {
      return Response(res, 401, "Code is Required", null);
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return Response(res, 401, "User Not found", null);
    }
    if (user.expires_in <= new Date()) {
      return Response(res, 401, "Time Expires", null);
    }

    if (user.code === code) {
      const update = await User.update(
        { is_active: true },
        { where: { email } }
      );
      if (update[0] === 1) {
        return Response(res, 200, "Success", { success: true });
      }
    }

    return Response(res, 200, "Code Mismatch", null);
  } catch (err) {
    throw new Error(`Can't activate Account ${err}`);
  }
}

async function LoginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return Response(res, 200, `email and password is required`, null);
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return Response(res, 200, "Success", null);
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return Response(res, 401, "UnAuthorized", null);
    }

    const payload = { id: user.id, role: user.role, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 });
    return Response(res, 200, "Success", `Bearer ${token}`);
  } catch (err) {
    logger.log({
      level: "error",
      message: `Can't login User ${err}`,
      label: "api",
    });
    throw new Error(`Can't login to the System ${err}`);
  }
}

module.exports = {
  CreateUser,
  LoginUser,
  ActivateAccount,
};
