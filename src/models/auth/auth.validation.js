import Joi from "joi"

const registerValidation = Joi.object({
    name: Joi.string().min(3).max(12).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{3,40}$/)
})

const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{3,40}$/)
})


export { loginValidation, registerValidation }
