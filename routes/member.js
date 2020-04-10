const router = require('express').Router()
const controller = require('../controllers/member_controller.js')

router.get('/', controller.FindAll)
router.post('/', controller.Create)

module.exports = router