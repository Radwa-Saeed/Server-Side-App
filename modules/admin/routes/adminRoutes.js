const isAuthorized = require('../../../common/authorization/isAuthorized');
const reqValid = require('../../../common/validationJoi/reqValid');
const { getallusers, add_admin, super_admin_signin, getall_admins, delete_admin, getallposts, review_reports, block_post, block_user } = require('../controller/adminController');
const { ADD_ADMIN, GET_ADMINS, DELETE_ADMIN, GET_USERS, GET_POSTS, REVIEW_REPORT, BLOCK_POST, BLOCK_USER } = require('../endPoints');
const { add_adminValidationSchema, delete_adminValidationSchema, superadmin_signinValidationSchema, block_postValidationSchema, block_userValidationSchema } = require('../validation/adminValid');

const router = require('express').Router();

// SUPER ADMIN ONLY ===> 1-sign in  2-take the token , 3-put the token in the bearer token field to check authorizity
router.post('/superadminsignin',reqValid(superadmin_signinValidationSchema),super_admin_signin) // localhost:5000/superadminsignin
router.post('/addadmin',isAuthorized(ADD_ADMIN),reqValid(add_adminValidationSchema),add_admin) // localhost:5000/addadmin
router.get('/getalladmins',isAuthorized(GET_ADMINS),getall_admins) // localhost:5000/getalladmins
router.delete('/deleteadmin',isAuthorized(DELETE_ADMIN),reqValid(delete_adminValidationSchema),delete_admin) // localhost:5000/deleteadmin
// ADMIN & SUPER ADMIN 
router.get('/getallusers',isAuthorized(GET_USERS),getallusers) // localhost:5000/getallusers
router.get('/getallposts',isAuthorized(GET_POSTS),getallposts) // localhost:5000/getallposts
router.get('/reviewreports',isAuthorized(REVIEW_REPORT),review_reports) // localhost:5000/reviewreports
router.put('/blockpost',isAuthorized(BLOCK_POST),reqValid(block_postValidationSchema),block_post) // localhost:5000/blockpost
router.put('/blockuser',isAuthorized(BLOCK_USER),reqValid(block_userValidationSchema),block_user) // localhost:5000/blockuser

module.exports=router
