const data = require("../data.json");
const { STATUS_CODES } = require("../utils/constants");


module.exports = function listAllController(req, res) {
    try {

        // TRY TO FIND LIMIT ON THE QUERY
        let limit = req.query.limit;

        // TRY TO FIND LAST ID
        let nextId = req.query.nextId;

        let returnData = data;

        // IF NEXT ID WAS PASSED 
        if(nextId && parseInt(nextId)) {
            nextId = parseInt(nextId);

            // FIND INDEX
            const nextIdIndex = data.findIndex((article) => article.id === nextId);

            // IF INDEX === -1 => NOT FOUND
            if(nextIdIndex === -1) {
                return res.status(STATUS_CODES.BAD_REQUEST).json({
                    message: "nextId is invalid"
                });
            }

            // SLICE THE RETURN DATA FROM THAT ID
            returnData = returnData.slice(nextIdIndex);
        }

        // NEW NEXT ID
        let newNextId;

        // IF LIMIT WAS PASSED AND THERE'S MORE DATA
        if(limit && returnData.length > limit) {
            newNextId = returnData[limit].id;
        }

        // IF LIMIT WAS PASSED 
        if(limit && parseInt(limit)) {
            limit = parseInt(limit);

            // SLICE UP UNTIL LIMIT
            returnData = returnData.slice(0, limit);
        }

        

        // SEND ALL DATA BACK TO CLIENT
        res.status(STATUS_CODES.OK).json({
            data: returnData,
            nextId: newNextId,
        });
    } catch (error) {

        const errorMessage = "Something wrong happened while listing all articles..."

        console.error(errorMessage, error);

        res.status(STATUS_CODES.INTERNAL_ERROR).json({
            message: errorMessage
        });
    }
   
}