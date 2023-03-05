const { STATUS_CODES } = require("../utils/constants");
const { commonErrorHandler } = require("../utils/functions");
const fs = require("fs");
const data = require("../data.json");

module.exports = function updateArticleController(req, res) {
    
    try {
     
        // GET BODY
        const body = req.body;

       // FIND OLD ARTICLE
       const oldArticleIndex = data.findIndex((article) => article.id === body.id);

        // IF DIDN'T FIND => THROW ERROR
        if(oldArticleIndex === -1) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                message: `Article with id "${body.id}" not found!`
            });
        }

        // CREATE NEW UPDATED ONE
        const newArticle = {
            ...data[oldArticleIndex],
            ...body,
        };
        
        // UPDATE THE ARRAY
        data[oldArticleIndex] = newArticle;

        // WRITE TO LOCAL FILE
        fs.writeFileSync("data.json", JSON.stringify(data));

        // RETURN OK RESPONSE WITH UPDATED ARTICLE
        res.status(STATUS_CODES.OK).json(newArticle);

    } catch (error) {
        return commonErrorHandler(
            res, 
            error,
            "Something went wrong while creating an article..."
        )
    }
};
