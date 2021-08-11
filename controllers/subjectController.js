
const Subject = require("../models/Subject");
const { validationResult } = require("express-validator");

exports.createSubject = async (req, res) => {

  //revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //extraer email y password
  const { name } = req.body;
  const studentId = req.params.id;
  const grades = [
      null,
      null,
      null,
      null,
  ];
  try {
    let subject = await Subject.findOne({
      name,
      student: studentId,
    });
    if (subject) {
      return res.status(400).json({ msg: "La materia ya existe" });
    }
    subject = new Subject({ name, grades});
    subject.student = studentId;
    await subject.save();

    return res.status(200).json(subject);

  } catch (error) {
    console.log(error);
    return res.status(500).send("Hubo un error");
  }
};
 
exports.getSubjects = async (req, res) => {

  //extraer id del alumno
  const studentId = req.params.id;
  try {
    const subjects = await Subject.find({ student: studentId });
    if (subjects.length === 0) {
      return res.status(400).json({ msg: "Aún no hay materias" });
    }
    return res.status(200).json(subjects);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Hubo un error");
  }
};

exports.updateSubject = async (req, res) => {

    //revisar si hay errores
    /* const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } */
  
    //extraer id del estudiante
    const subjectId = req.params.id;

    try {
      let subject = await Subject.findById(subjectId);

      if (!subject) {
        return res.status(400).json({ msg: "La materia no existe" });
      }

      subject = await Subject.findByIdAndUpdate(
        subjectId,
        req.body,
        { new: true }
      );

      return res.status(200).json(subject);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Hubo un error");
    }
  };
  
  exports.deleteSubject = async (req, res) => {
    try {
      const subjectId = req.params.id;
      let subject = await Subject.findById(subjectId);

      if (!subject) {
        return res.status(400).json({ msg: "La materia no existe" });
      }

      subject = await Subject.findByIdAndDelete(subjectId);

      return res.status(200).json({ msg: "Materia eliminada", subject });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Hubo un error");
    }
  };
   