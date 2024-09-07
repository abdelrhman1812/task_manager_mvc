const handleFlashMessage = (req, res, message) => {
    req.flash("error", message);
    req.flash('data', req.body);
    return res.redirect('back');
};

export default handleFlashMessage;