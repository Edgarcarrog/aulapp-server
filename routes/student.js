
const router = require("express").Router();
const { check } = require("express-validator");
const auth = require("../middlewares/auth");

const {
  createStudent,
  getOneStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

// api/student
router.post(
  "/:id",
  auth,
  [
    check("name", "Agrega el nombre del estudiante").notEmpty(),
    check("fatherLastname", "Agrega el apellido paterno").notEmpty(),
    check("motherLastname", "Agrega el apellido materno").notEmpty(),
  ],
  createStudent
);
 
router.get("/one-student/:id", auth, getOneStudent);

router.get("/:id", auth, getStudents);

router.put(
  "/:id",
  auth,
  updateStudent
);

router.delete("/:id", auth, deleteStudent);

module.exports = router;
 