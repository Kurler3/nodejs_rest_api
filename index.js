
///////////////////////////////////////
// IMPORTS  ///////////////////////////
///////////////////////////////////////

// IMPORT EXPRESS
const express = require("express");

// CONTROLLER
const controller = require("./controllers/index");

// CONSTANTS
const { V1_BASE_URL } = require("./utils/constants");
const { commonErrorHandler } = require("./utils/functions");
const createUpdateMiddlware = require("./middleware/createUpdateMiddlware");


///////////////////////////////////////
// INIT APP  //////////////////////////
///////////////////////////////////////

// INIT EXPRESS APP
const app = express();


///////////////////////////////////////
// USE EXPRESS MIDDLEWARE /////////////
///////////////////////////////////////

// AUTOMATICALLY DECODE ENCODED URLS
app.use(express.urlencoded({extended: true}));

// PARSE THE BODY (comes as JSON => get as JS Object in code)
app.use(express.json());


///////////////////////////////////////
// GET ROUTES /////////////////////////
///////////////////////////////////////

// DEFAULT
app.get(V1_BASE_URL, (req, res) => {
    res.send("Miguel says hello :D")
});

// LIST ALL (WITHOUT PAGINATION)
app.get(`${V1_BASE_URL}/list`, controller.listAllController);

// GET SINGLE ARTICLE BY ID
app.get(`${V1_BASE_URL}/getById/:articleId`, controller.getArticleByIdController);

// LIST ALL ARTICLES BY AUTHOR ID
app.get(`${V1_BASE_URL}/listByAuthorId/:authorId`, controller.listByAuthorIdController);


///////////////////////////////////////
// POST ROUTES  ///////////////////////
///////////////////////////////////////

// CREATE ARTICLE
app.post(`${V1_BASE_URL}/create`, createUpdateMiddlware , controller.createdArticleController);

///////////////////////////////////////
// PATCH ROUTES  //////////////////////
///////////////////////////////////////

app.patch(`${V1_BASE_URL}/update`, createUpdateMiddlware, controller.updateArticleController);

///////////////////////////////////////
// COMMON ERROR HANDLER ///////////////
///////////////////////////////////////

// INTERNAL SERVER ERROR
app.use((error, req, res, next) => {

    return commonErrorHandler(
        res,
        error,
        "Something happened in the server!"
    );
});

///////////////////////////////////////
// RUN SERVER /////////////////////////
///////////////////////////////////////

app.listen(4000, () => {
    console.log("The server is running on port 4000!")
});