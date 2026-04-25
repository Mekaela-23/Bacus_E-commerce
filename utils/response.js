exports.success = (res, data, message = "success") => {
    return res.status(200).json({
        status: "Success",
        message,
       data,
    })
}

exports.error = (res, message = "Error", code = 500) => {
    return res.status(code).json({
       status: "Error",
       message
    })
}