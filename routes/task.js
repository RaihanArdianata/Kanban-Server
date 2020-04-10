const router = require('express').Router()
const controller = require('../controllers/task_controller.js')
const subtask = require('./subtask.js')

router.get('/', controller.FindAll)
router.post('/', controller.Create)
router.patch('/:task_id', controller.Patch)
router.get('/:task_id', controller.FindByPk)
router.delete('/:task_id', controller.Delete)

module.exports = router