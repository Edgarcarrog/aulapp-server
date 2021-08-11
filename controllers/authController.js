const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.authenticateUser = async (req, res) => {
  //revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    const correctPass =
      user === null ? false : await bcrypt.compare(password, user.password);

    if (!correctPass) {
      return res.status(400).json({ msg: "Usuario o password incorrecto" });
    }

    //crear y firmar el JsonWebToken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 60 * 60 * 24,
      },
      (error, token) => {
        if (error) throw error;
        res.status(200).json({ msg: "Bienvenido", token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.userAuthenticated = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
