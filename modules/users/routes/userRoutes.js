const router = require('express').Router()

const reqValid = require('../../../common/validationJoi/reqValid')
const { sign_upValidationSchema, sign_inValidationSchema, update_profileValidationSchema, update_passwordValidationSchema } = require('../validation/userValid')
const { sign_up, sign_in, update_profile, update_password, deactivate } = require('../controllers/userControllers')
const isAuthorized = require('../../../common/authorization/isAuthorized')
const { UPDATE_PROFILE, UPDATE_PASSWORD, DEACTIVATE_ACC } = require('../endPoints')


router.post ('/signup',reqValid(sign_upValidationSchema),sign_up) // localhost:5000/signup
router.post ('/signin',reqValid(sign_inValidationSchema),sign_in) // localhost:5000/signin
router.put ('/updateprofile',isAuthorized(UPDATE_PROFILE),reqValid(update_profileValidationSchema),update_profile) // localhost:5000/updateprofile
router.put ('/updatepassword',isAuthorized(UPDATE_PASSWORD),reqValid(update_passwordValidationSchema),update_password) // localhost:5000/updatepassword
router.delete('/deactivate',isAuthorized(DEACTIVATE_ACC),deactivate) // localhost:5000/deactivate
module.exports=router