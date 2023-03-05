const listAllController = require("./listAll.controller.js");
const getArticleByIdController = require("./getArticleById.controller.js");
const listByAuthorIdController = require("./listByAuthorId.controller.js");
const createdArticleController = require("./createArticle.controller.js");
const updateArticleController = require("./updateArticle.controller.js");

module.exports = {
    listAllController,
    getArticleByIdController,
    listByAuthorIdController,
    createdArticleController,
    updateArticleController,
};