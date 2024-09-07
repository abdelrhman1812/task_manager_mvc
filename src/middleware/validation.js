const validate = (schema, url) => {

    return (req, res, next) => {
        const { error } = schema.validate(req.body)
        if (!error) {
            next()
        } else {
            let errorMsg = error.details.map((err) => err?.message)
            req.flash("validationError", errorMsg)
            req.flash('data', req.body)
            res.redirect(url)
        }
    }

}

export default validate