const { STATUS_CODES } = require("../utils/constants");
const data = require("../data.json");
const { commonErrorHandler } = require("../utils/functions");


module.exports = function getArticleByIdController(req, res) {

    try {

        // GET ID FROM PARAMS
        let articleId = req.params.articleId;

        // IF DIDN'T PASS => THROW ERROR
        if(!articleId) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                message: "To get an article by id, you are required to specify the id"
            });
        }

        // CONVERT TO INT
        articleId = parseInt(articleId);
        
        // IF NaN  (CAN'T BE CONVERT TO A NUMBER)
        if(!articleId) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                message: "Article id must be a integer!"
            })
        }

        // TRY TO FIND IN DATA
        const articleFound = data.find((article) => article.id === articleId);

        // IF DIDN'T FIND => THROW ERROR
        if(!articleFound) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                message: `Article with id "${articleId}" not found!`,
            });
        }

        // ALL GOOD => SEND ARTICLE TO CLIENT
        res.status(STATUS_CODES.OK).json(articleFound);

    } catch (error) {

        return commonErrorHandler(
            res,
            error,
            "Something wrong happened while getting article by id..."
        );
    }

}