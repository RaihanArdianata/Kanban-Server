const { Task, SubTask, User } = require('../models')

class Controller {
    static FindAll(req, res, next) {
        console.log(req.query.id_project);
        
        Task.findAll({
            order: [
                ['id', 'ASC'],
            ],
            include: [{
                model: SubTask,
                where:{
                    ProjectId: req.query.id_project
                },
                order: [
                    ['id', 'ASC'],
                ],
                required : false,
                include:[{
                    model: User,
                    require : false
                }]
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
        console.log('masuk task');

        const task = {
            task_name: req.body.task_name,
            // ProjectId: req.ProjectId
        }

        Task.create(task)
            .then((result) => {
                return res.status(201).json(result)
            })
            .catch((err) => {
                return next(err)
            })
    }

    static Update(req, res, next) {

    }

    static Patch(req, res, next){
        const id = req.params.task_id
        const task_name = {
            task_name : req.body.task_name
        }
        Task.update(task_name, {
            where:{
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

    static Delete(req, res, next) {
        const id = req.params.task_id

        Task.destroy({
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

