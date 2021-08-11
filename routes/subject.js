
const router = require("express").Router();
const { check } = require("express-validator");
const auth = require("../middlewares/auth");

const {
  createSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
} = require("../controllers/subjectController");

// api/student
router.post(
  "/:id",
  auth,
  [
    check("name", "Agrega el nombre de la materia").notEmpty(),
  ],
  createSubject
);

router.get("/:id", auth, getSubjects);

router.put(
  "/:id",
  auth,
  updateSubject
);

router.delete("/:id", auth, deleteSubject); 

module.exports = router;
 