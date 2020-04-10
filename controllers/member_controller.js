const { Member, User, Project} = require('../models')

class Controller{
    static FindAll(req, res, next){
        console.log(req.CurrentUserId);
        
        Member.findAll({
            where:{
                UserId: req.CurrentUserId
            }
        })
            .then((result)=>{
                return res.status(200).json(result)
            })
            .catch((err)=>{
                return next(err)
            })
    }

    static FindByPk(req, res, next){

    }

    static Create(req, res, next){
        console.log('ini email',req.body.email);
        
        User.findOne({
            where:{
                email : req.body.email
            }
        })
            .then((result)=>{
                if(result){
                    const data = {
                        ProjectId : req.body.ProjectId,
                        UserId : result.id,
                        Owner : req.CurrentUserId
                    }
                    Project.findOne({
                        where:{
                            Owner: data.Owner,
                            id: data.ProjectId
                        }
                    })
                        .then((result)=>{
                            
                            if(result){
                                console.log(result);
                                console.log(data);
                                Member.create(data)
                                    .then((result)=>{
                                        console.log(result);
                                        
                                        return res.status(201).json(result)
                                    })
                                    .catch((err)=>{
                                        console.log(err);
                                        
                                        return next(err)
                                    })
                            }
                            else{
                                return next({
                                    name:"UnAuthorized",
                                    errors:[{
                                        code:403,
                                        message: 'Not Owner This Project'
                                    }]
                                })
                            }
                        })
                        .catch((err)=>{
                            return next(err)
                        })
                }else{
                    return next({
                        name:"NotFound",
                        errors:[{
                            code:404,
                            message:'User Not Found'
                        }]
                    })
                }
            })
            .catch((err)=>{
                return next(err)
            })
    }

    static Update(req, res, next){

    }

    static Delete(req, res, next){

    }
}


module.exports = Controller

