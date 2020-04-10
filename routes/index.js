const router = require('express').Router()
const user = require('./user.js')
const project = require('./project')
const task = require('./task.js')
const autenticate = require('../middleware/autentication')
const subtask = require('./subtask.js')
const member = require('./member.js')

router.use('/user', user)

router.use(autenticate)
router.use('/project', project)
router.use('/task', task)
router.use('/subtask', subtask)
router.use('/member', member)


module.exports = router