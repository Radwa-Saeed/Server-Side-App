const isAuthorized = require('../../../common/authorization/isAuthorized');
const reqValid = require('../../../common/validationJoi/reqValid');
const { creatadv, updateadv, deleteadv, getalladv } = require('../controllers/advControllers');
const { CREATE_ADV, DELETE_ADV, UPDATE_ADV, GET_ADV } = require('../endPoints');
const { create_advValidationSchema, update_advValidationSchema, delete_advValidationSchema } = require('../validation/advValid');

const router = require('express').Router();

router.post('/createadv',isAuthorized(CREATE_ADV),reqValid(create_advValidationSchema),creatadv) // localhost:5000/createadv
router.put('/updateadv',isAuthorized(UPDATE_ADV),reqValid(update_advValidationSchema),updateadv) // localhost:5000/updateadv
router.delete('/deleteadv',isAuthorized(DELETE_ADV),reqValid(delete_advValidationSchema),deleteadv) // localhost:5000/deleteadv
router.get('/getadv',isAuthorized(GET_ADV),getalladv) // localhost:5000/getadv
module.exports=router