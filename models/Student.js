const { Schema, model } = require("mongoose");

const studentSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    fatherLastname: {
      type: String,
      required: true,
      trim: true,
    },
    motherLastname: {
      type: String,
      required: true,
      trim: true,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
    diagnostic: {
      type: [Number],
      default: [10, 10, 10, 10, 10, 10, 10, 10],
    },
    diagnosticAvr: {
      type: Number,
      default: 10,
    },
    firstPartial: {
      type: [Number],
      default: [10, 10, 10, 10, 10, 10, 10, 10],
    },
    firstPartialAvr: {
      type: Number,
      default: 10,
    },
    secondPartial: {
      type: [Number],
      default: [10, 10, 10, 10, 10, 10, 10, 10],
    },
    secondPartialAvr: {
      type: Number,
      default: 10,
    },
    thirdPartial: {
      type: [Number],
      default: [10, 10, 10, 10, 10, 10, 10, 10],
    },
    thirdPartialAvr: {
      type: Number,
      default: 10,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Student", studentSchema);
