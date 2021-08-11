
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {

  //revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //extraer email y password
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "Usuario ya registrado" });
    }
    user = new User(req.body);

    //hashear el password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

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
        if(error) throw error;
        return res.status(200).json({ token, msg: 'Usuario creado' });
      }
    );

  } catch (error) {
    console.log(error);
    return res.status(400).send("Hubo un error");
  }
};
