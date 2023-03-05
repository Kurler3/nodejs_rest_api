const { STATUS_CODES } = require("./constants");

// COMMON ERROR HANDLER
const commonErrorHandler = (res, error, customErrorMessage) => {
    
    console.error(customErrorMessage + "" + error);

    res.status(STATUS_CODES.INTERNAL_ERROR).json({
        message: customErrorMessage
    });
};


module.exports = {
    commonErrorHandler
};