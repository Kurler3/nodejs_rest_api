
// DEFAULT "BASE" FOR URL
const V1_BASE_URL = "/api/v1";

// STATUS CODES
const STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND:  404,
    INTERNAL_ERROR: 500,
};

// REQUIRED PROPERTIES TO CREATE AN ARTICLE
const REQUIRED_CREATION_PROPERTIES = [
    {
        name: "title", 
        type: "string",
    },
    {
        name: "intro",
        type: "string"
    },
    {
        name: "content",
        type: "string"
    },
    {
        name: "author_id",
        type: "number"
    }
];

// REQUIRED PROPERTIES TO UPDATE AN ARTICLE
const REQUIRED_UPDATE_PROPERTIES = [
    {
        name: "id",
        type: "number",
    },
    {
        name: "title",
        type: "string",
    },
    {
        name: "intro",
        type: "string",
    }
];


module.exports = {
    V1_BASE_URL,
    STATUS_CODES,
    REQUIRED_CREATION_PROPERTIES,
    REQUIRED_UPDATE_PROPERTIES
}