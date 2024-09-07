const getFlashMessages = (req) => {
    return {
        error: req.flash('error'),
        data: req.flash('data')[0] || {},
        validationError: req.flash('validationError'),
    };
};

export default getFlashMessages;