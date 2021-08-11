const Student = require("../models/Student");
const { validationResult } = require("express-validator");

exports.createStudent = async (req, res) => {
  //revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //extraer email y password
  const { name, fatherLastname, motherLastname } = req.body;
  const groupId = req.params.id;
  try {
    let student = await Student.findOne({
      name,
      fatherLastname,
      motherLastname,
    });
    if (student) {
      return res.status(400).json({ msg: "El estudiante ya existe" });
    }
    student = new Student(req.body);
    student.group = groupId;
    await student.save();

    return res.status(200).json(student);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Hubo un error");
  }
};

exports.getOneStudent = async (req, res) => {
  //extraer id del grupo
  const id = req.params.id;

  try {
    const student = await Student.findById(id);
    return res.status(200).json(student);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Hubo un error");
  }
};

exports.getStudents = async (req, res) => {
  //extraer id del grupo
  const groupId = req.params.id;
  const { partial, avr } = req.query;
  try {
    const students = await Student.find({ group: groupId })
      .select(
        `_id
       name fatherLastname motherLastname group ${partial} ${avr}`
      )
      .sort({
        fatherLastname: 1,
        motherLastname: 1,
        name: 1,
      });
    return res.status(200).json(students);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Hubo un error");
  }
};

exports.updateStudent = async (req, res) => {
  //revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //extraer id del estudiante
  const studentId = req.params.id;

  try {
    let student = await Student.findById(studentId);

    if (!student) {
      return res.status(400).json({ msg: "El estudiante no existe" });
    }

    student = await Student.findByIdAndUpdate(studentId, req.body, {
      new: true,
    });

    return res.status(200).json(student);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Hubo un error");
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    let student = await Student.findById(studentId);

    if (!student) {
      return res.status(400).json({ msg: "El estudiante no existe" });
    }

    student = await Student.findByIdAndDelete(studentId);

    return res.status(200).json({ msg: "Estudiante eliminado", student });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Hubo un error");
  }
};
