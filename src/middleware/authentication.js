import UserModel from "../../database/models/user.model.js";

const auth = async (req, res, next) => {
    const userId = req.session?.user?.id;

    if (!userId) {
        req.flash("error", 'Invalid session. Please log in again.');
        return res.redirect('/auth/login');
    }






    const userExist = await UserModel.findById({ _id: req.session?.user?.id });

    if (!userExist) {
        req.flash("error", 'Invalid account. Please register again.');
        return res.redirect('/auth/register');
    }

    next();

};

export const accessIfLoggedIn = (req, res, next) => {
    if (req.session?.user) {
        return res.redirect('/tasks');
    }
    next();
};

export default auth;
