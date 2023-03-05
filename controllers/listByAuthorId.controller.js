const {customErrorMessage} = require("../utils/functions.js");
const data = require("../data.json");
const { STATUS_CODES } = require("../utils/constants.js");


module.exports = function listByAuthorIdController(req, res) {
    
    try {
      
        // GET THE AUTHOR ID
        let authorId = req.params.authorId;

        if(!authorId) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                message: "To get the list of articles made by an author, you need to provide an author id"
            });
        }

        // CONVERT TO INT
        authorId = parseInt(authorId);

        // IF NOT INTEGER => SEND ERROR
        if(!authorId) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                message: "Author id must be a integer!"
            });
        }

        // FILTER ARTICLES BY AUTHOR ID
        const articles = data.filter((article) => article.author_id === authorId);

        


        // RETURN ARTICLES
        res.status(STATUS_CODES.OK).json(articles)

    } catch (error) {
        return customErrorMessage(
            res, 
            error,
            "Something went wrong while listing articles by author id..."
        )
    }
};