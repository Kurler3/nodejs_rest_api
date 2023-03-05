const { STATUS_CODES, REQUIRED_CREATION_PROPERTIES, REQUIRED_UPDATE_PROPERTIES } = require("../utils/constants");
const { commonErrorHandler } = require("../utils/functions")
const path = require("path");

module.exports = function createUpdateMiddleware(req, res, next) {
    try {

        // GET PROPERTIES TO VALIDATE
        const propertiesToValidate = path.basename(req.url) === "create" ? REQUIRED_CREATION_PROPERTIES : REQUIRED_UPDATE_PROPERTIES;

        // GET BODY
        const body = req.body;
   
        // IF DIDN'T PASS BODY => ERROR
        if(!body || Object.keys(body).length === 0) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                message: "Body is missing"
            });
        }

        // CHECK THAT THE BODY IS AN OBJECT, NOT AN ARRAY
        if(typeof body !== "object" || Array.isArray(body)) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                message: "Body needs to be an object with properties: " + propertiesToValidate.map((property) => `,${property.name}`)
            })
        }

        // CHECK FOR THE REQUIRED PROPERTIES (title, intro, content, author_id)
        for(const requiredProperty of propertiesToValidate) {
            
            // CHECK IF IT EXISTS
            if(!body[requiredProperty.name]) {
                return res.status(STATUS_CODES.BAD_REQUEST).json({
                    message: `Missing required property "${requiredProperty.name}" in body`
                });
            }

            let isPassTypeCheck = true;

            // CHECK THE TYPE
            if(typeof body[requiredProperty.name] !== requiredProperty.type) {
                isPassTypeCheck = false;
            }

            if(!isPassTypeCheck) {
                return res.status(STATUS_CODES.BAD_REQUEST).json({
                    message: `Wrong data type for property "${requiredProperty.name}" in body. Got "${typeof body[requiredProperty.name]}", expected "${requiredProperty.type}"`
                });
            }
        }

        // IF PASSED MORE PROPERTIES THAN THE REQUIRED ONES => INVALID BODY
        if(Object.keys(body).length > propertiesToValidate.length) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                message: "Body is invalid"
            })
        }   

        // CONTINUE
        next()

    } catch (error) {
        
        return commonErrorHandler(
            res,
            error,
            "Something went wrong while validating..."
        );

    }
}