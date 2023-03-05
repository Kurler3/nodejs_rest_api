const { STATUS_CODES } = require("../utils/constants");
const { commonErrorHandler } = require("../utils/functions")
const uuid = require("uuid");
const fs = require("fs");

const jsonData = fs.readFileSync("../data.json");

const data = JSON.parse(jsonData)


module.exports = function createArticleController(req, res) {
    try {
        
        // GET BODY
        const body = req.body;

        // CREATE NEW ARTICLE
        const newArticle = {
            id: uuid.v4(),
            createdAt: new Date().toJSON(),
            ...body,
        };
        
        // ADD TO DATA FILE
        data.push(newArticle);

        // WRITE TO LOCAL FILE
        fs.writeFileSync("data.json", JSON.stringify(data));

        console.log("CREATED!", JSON.parse(fs.readFileSync("data.json")))

        // RETURN CREATE RESPONSE WITH NEW ARTICLE
        res.status(STATUS_CODES.CREATED).json(newArticle);

    } catch (error) {
        return commonErrorHandler(
            res, 
            error,
            "Something went wrong while creating an article..."
        )
    }
}