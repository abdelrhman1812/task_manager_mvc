import Joi from "joi"

const registerValidation = Joi.object({
    name: Joi.string().min(3).max(12).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{3,40}$/)
        .message('must start with an uppercase letter and be between 4 and 40 characters long like A123456')
})

const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{3,40}$/)
        .message('must start with an uppercase letter and be between 4 and 40 characters long like A123456')

})


export { loginValidation, registerValidation }
