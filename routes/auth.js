const router = require("express").Router();

const {
  authenticateUser,
  userAuthenticated,
} = require("../controllers/authController");
const { check } = require("express-validator");
const auth = require("../middlewares/auth");

// api/auth
router.post(
  "/",
  [
    check("email", "Agrega un email válido").isEmail(),
    check("password", "El password debe tener mínimo 6 caracteres").isLength({
      min: 6,
    }),
  ],
  authenticateUser
);

router.get("/", auth, userAuthenticated);

module.exports = router;
