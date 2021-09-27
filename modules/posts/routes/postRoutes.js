const isAuthorized = require('../../../common/authorization/isAuthorized');
const { CREATE_POST, DELETE_POST, UPDATE_POST, REPORT_POST, GETALL_POST, GET_PROF_POST } = require('../endPoints');
const { creatpost, updatepost, deletepost, getprofilepost, newsfeed, reportpost, getadv } = require('../controllers/postControllers');
const reqValid = require('../../../common/validationJoi/reqValid');
const { creat_postValidationSchema, update_postValidationSchema, delete_postValidationSchema, report_postValidationSchema } = require('../validation/postValid');

const router = require('express').Router();

router.post('/createpost',isAuthorized(CREATE_POST),reqValid(creat_postValidationSchema),creatpost) // localhost:5000/createpost
router.put('/updatepost',isAuthorized(UPDATE_POST),reqValid(update_postValidationSchema),updatepost) // localhost:5000/updatepost
router.delete('/deletepost',isAuthorized(DELETE_POST),reqValid(delete_postValidationSchema),deletepost) // localhost:5000/deletepost
router.post('/reportpost',isAuthorized(REPORT_POST),reqValid(report_postValidationSchema),reportpost) // localhost:5000/reportpost 
router.post('/getprofpost',isAuthorized(GET_PROF_POST),reqValid(delete_postValidationSchema),getprofilepost) // localhost:5000/getprofpost
router.get('/newsfeed',isAuthorized(GETALL_POST),newsfeed) // localhost:5000/newsfeed 

module.exports=router