import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  taskOne: {
    type: String,
    required: true
  },
  taskTwo: {
    type: String,
    required: true
  },
  taskThree: {
    type: String,
    required: true
  },
  taskFour: {
    type: String,
    required: true
  },
  taskOneCompleted: {
    type: Boolean,
    default: false
  },
  taskTwoCompleted: {
    type: Boolean,
    default: false
  },
  taskThreeCompleted: {
    type: Boolean,
    default: false
  },
  taskFourCompleted: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
