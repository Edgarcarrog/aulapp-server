
const { Schema, model } = require('mongoose');

const subjectSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    grades: {
      type: Array,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model('Subject', subjectSchema);