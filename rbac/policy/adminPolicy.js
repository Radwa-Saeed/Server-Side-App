const { GET_USERS, REVIEW_REPORT, BLOCK_POST, BLOCK_USER, GET_POSTS } = require("../../modules/admin/endPoints");
const { CREATE_ADV, UPDATE_ADV, DELETE_ADV, GET_ADV } = require("../../modules/adv/endPoints");

module.exports=[GET_USERS,GET_POSTS,REVIEW_REPORT,BLOCK_POST,BLOCK_USER,
    CREATE_ADV,UPDATE_ADV,DELETE_ADV,GET_ADV]