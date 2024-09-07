import UserModel from "../../../database/models/user.model.js";
import handleFlashMessage from "../../utils/flashMessage.js";
import getFlashMessages from "../../utils/getFlashMessages.js";
import { comparePassword, hashPassword } from "../../utils/hashAndCompare.js";



/* ========== Render Register Page ========== */
const registerDisplay = (req, res) => {
    const { error, data, validationError } = getFlashMessages(req);
    res.render('register', {
        error,
        validationError,
        data,
    });
    // req.session.destroy();
    return;
};

/* ========== Handle Register ========== */
const handleRegister = async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userIsExist = await UserModel.findOne({ email });
    if (userIsExist) {
        return handleFlashMessage(req, res, "Email already exists");
    }

    // Hash the password
    const hashedPassword = hashPassword({ plaintext: password });

    // Create and save the new user
    const user = new UserModel({
        name,
        email,
        password: hashedPassword,
    });
    await user.save();

    // Redirect to login page
    res.redirect('/auth/login');
};

/* ========== Render Login Page ========== */
const loginDisplay = (req, res) => {
    const { error, data, validationError } = getFlashMessages(req);
    res.render('login', {
        error,
        validationError,
        data,
    });
    // req.session.destroy();
    return;
};

/* ========== Handle Login ========== */
const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const userIsExist = await UserModel.findOne({ email });
    if (!userIsExist) {
        return handleFlashMessage(req, res, "Email does not exist");
    }

    // Check if password matches
    const matchPassword = comparePassword({ plaintext: password, hashValue: userIsExist.password });
    if (!matchPassword) {
        return handleFlashMessage(req, res, "Invalid password");
    }

    req.session.user = {
        id: userIsExist._id.toString(),
        name: userIsExist.name,
        email: userIsExist.email
    }

    return res.redirect('/tasks');

};


/* ========== Handle Logout ========== */

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/auth/login');
        }
        res.redirect('/auth/login');
    });
};

export { handleLogin, handleRegister, loginDisplay, logout, registerDisplay };

