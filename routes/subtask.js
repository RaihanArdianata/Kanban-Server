const router = require('express').Router()
const controller = require('../controllers/subtask_controller.js')
const autorization_subtask = require('../middleware/autorization.js').autorization_subtask

router.get('/', controller.FindAll)
router.post('/', controller.Create)

router.get('/:id', autorization_subtask, controller.FindByPk)
router.patch('/:id',autorization_subtask,)
router.delete('/:id', controller.Delete)

module.exports = router