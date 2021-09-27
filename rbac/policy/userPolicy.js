const { GET_ADV } = require('../../modules/adv/endPoints')
const { CREATE_POST, UPDATE_POST, DELETE_POST, GET_PROF_POST, REPORT_POST, VIEW_ADV, GETALL_POST } = require('../../modules/posts/endPoints')
const {UPDATE_PROFILE, UPDATE_PASSWORD, DEACTIVATE_ACC}=require('../../modules/users/endPoints')
module.exports=[UPDATE_PROFILE,UPDATE_PASSWORD,DEACTIVATE_ACC,
    CREATE_POST,UPDATE_POST,DELETE_POST,GET_PROF_POST,REPORT_POST,GETALL_POST,
    GET_ADV]