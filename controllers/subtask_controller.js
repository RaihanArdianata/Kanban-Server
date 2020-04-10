const { SubTask , Project , Task} = require('../models')

class Controller {
    static FindAll(req, res, next) {
        console.log(req.body);
        
        SubTask.findAll({
            where:{
                ProjectId: req.headers.id_project
            },
            include: [{
                model:Task
            }]
        })
            .then((result) => {
                return res.status(200).json(result)
            })
            .catch((err) => {
                return next(err)
            })
    }

    static FindByPk(req, res, next) {

    }

    static Create(req, res, next) {
        const subTask = {
            title: req.body.title,
            description: req.body.description,
            ProjectId: +req.body.ProjectId,
            Category: +req.body.Category,
            UserId: req.CurrentUserId
        }
        console.log(subTask);

        SubTask.create(subTask)
            .then((result) => {
                return res.status(201).json(result)
            })
            .catch((err) => {
                return next(err)
            })
    }

    static Update(req, res, next) {

    }

    static Patch(req, res, next) {

    }

    static Delete(req, res, next) {
        const id = req.params.id
        console.log('masuk del');

        SubTask.destroy({
            where: {
                id
            }
        })
            .then((result) => {
                return res.status(200).json(result)
            })
            .catch((err) => {
                return next(err)
            })
    }
}


module.exports = Controller

