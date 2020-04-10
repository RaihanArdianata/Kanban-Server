const router = require('express').Router()
const autorization_project = require('../middleware/autorization.js').autorization_project
const controller = require('../controllers/project_controllers.js')

router.get('/', controller.FindAll)
router.get('/organisation', controller.findByMember)
router.post('/', controller.Create)
router.patch('/:id', autorization_project, controller.Patch )
router.get('/:id', autorization_project, controller.FindByPk)
router.delete('/:id', autorization_project, controller.Delete)

module.exports = router