const { Project , Task, SubTask, Member} = require('../models')

class Controller {
    static FindAll(req, res, next) {
        
        Project.findAll({
            where:{
                Owner: req.CurrentUserId
            },
            order: [
                ['id', 'DESC'],
            ],
            include: [{
                model: SubTask,
                required : false,
                include:[{
                    model: Task,
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

    static findByMember(req, res, next){
        Project.findAll({
            order: [
                ['id', 'DESC'],
            ],
            include: [{
                model : Member,
                where:{
                    UserId : req.CurrentUserId
                }
            }]
        })
            .then((result)=>{
                return res.status(200).json(result)
            })
            .catch((err)=>{
                return next(err)
            })
        
    }

    static FindByPk(req, res, next) {
        const id = req.params.id
        Project.findByPk(id)
            .then((result) => {
                return res.status(200).json(result)
            })
            .catch((err) => {
                return next(err)
            })
    }

    static Create(req, res, next) {
        console.log(req);
        
        const project = {
            project_name: req.body.project_name,
            Owner: req.CurrentUserId
        }

        Project.create(project)
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
        const id = req.params.id
        console.log(id);
        
        const project_name = {
            project_name : req.body.project_name
        }
        Project.update(project_name, {
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
        const id = req.params.id
        console.log('masuk delete', id);
        
        Project.destroy({
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

