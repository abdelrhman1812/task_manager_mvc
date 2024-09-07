import Joi from "joi";
const addTaskValidation = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(50).required()
});

const updateTaskValidation = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(50).required()
});
export { updateTaskValidation };
export default addTaskValidation