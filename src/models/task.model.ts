import { Schema, model, Model, Document, Types } from 'mongoose'

interface ITask extends Document {
  description: string,
  completed: boolean,
  due: Date,
  tags: Array<string>,
  owner: Types.ObjectId,
}

const TaskSchema: Schema = new Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    due: {
      type: Date,
      required: false,
      default: null,
    },
    tags: {
      type: Array,
      required: false
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const Task: Model<ITask> = model('Task', TaskSchema)

module.exports = Task
