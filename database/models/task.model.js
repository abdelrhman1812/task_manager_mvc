import { model, Schema, Types } from "mongoose";



const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "User"
    }
})

const TaskModel = model('Task', taskSchema);

export default TaskModel;