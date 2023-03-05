
## Data

Had to ask ChatGPT to generate data for me (with the same structure you were asking for in the pdf file), because the URL you specific wasn't working.

## Running the server

First of all, make sure to run "npm i" to install the dependencies I'm using (if the node_modules folder is not present).
Then, run "npm run start". This will trigger a script I have inside package.json, that uses nodemon to run the server and listen to changes, meaning it will restart the server for you whenever you same any file.

You can also use "node index.js", if don't want to make changes to the code.

The server will then be running at: localhost:4000, or 127.0.0.1:4000

## Routes defined

All routes start by /api/v1.

The routes are:

    /list
    /getById/[ARTICLE_ID]
    /listByAuthorId/[AUTHOR_ID]
    /create
    /update

The /list route: This route returns you a list of articles. If you want, you can specify a limit and the next id of an article in the query params. It would look something like this: http://localhost:4000/api/v1/list?limit=2&nextId=5

The /getById route: This route returns a single article by the id you specify. If it doesn't find an article with that id, it will return an error. Calling it looks something like this: http://localhost:4000/api/v1/getById/3

The /listByAuthorId route: This route returns a list of articles created by a specified author id. It looks like this: http://localhost:4000/api/v1/listByAuthorId/1

The /create route: This route allows you to create a new article. You need to pass the body as a json object with the following properties: title, intro, content, author_id. The types need to be correct too. All the properties are of type string, except the author_id, which is a number.
The request would look like this: http://localhost:4000/api/v1/create

The /update route: This route allows you to update an existing article. You need to pass the body as a json object with the following properties: id, title, intro. Again, there is a validator for the types of these properties. The request would look like this: http://localhost:4000/api/v1/update

