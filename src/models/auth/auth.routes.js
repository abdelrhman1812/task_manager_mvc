import { Router } from "express";
import { accessIfLoggedIn } from "../../middleware/authentication.js";
import validate from "../../middleware/validation.js";
import { handleLogin, handleRegister, loginDisplay, logout, registerDisplay } from "./auth.controller.js";
import { loginValidation, registerValidation } from "./auth.validation.js";

const authRouter = Router();



/* Get Register Page */
authRouter.get('/register', accessIfLoggedIn, registerDisplay)

/*  Register  */
authRouter.post('/handleRegister', validate(registerValidation, '/auth/register'), handleRegister)



/* Get Login Page */
authRouter.get('/login', accessIfLoggedIn, loginDisplay)
/*  Login  */
authRouter.post('/handleLogin', validate(loginValidation, '/auth/login'), handleLogin)


/* Logout */

authRouter.get('/logout', logout)
export default authRouter;