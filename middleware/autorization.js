const {Project, SubTask} = require('../models')

function autorization_subtask(req, res, next) {
    console.log(req.params.id);
    
    SubTask.findOne({
        where:{
            id: req.params.id
        }
    })
        .then((result)=>{
            console.log('result');
            
            if(result){
                if(req.CurrentUserId == result.UserId){
                    return next()
                }else{
                    return next({
                        name: "UnAuthorized",
                        error:[{
                            status:403,
                            message: "user not authorized"
                        }]
                    })
                }
            }else{
                
                return res.status(404).json({
                    name: "NotFound",
                    error: [{
                        status: 404,
                        message: "Data not found"
                    }]
                })
            }
        })
        .catch((err)=>{
            console.log(err);
            return next(err)
        })
}

function autorization_project(req, res, next) {

    Project.findOne({
        where:{
            id: req.params.id
        }
    })
        .then((result)=>{

            if(result){
                if(req.CurrentUserId = result.Owner){
                    req.ProjectId = result.id
                    return next()

                }else{
                    return next({
                        name: "UnAuthorized",
                        error:[{
                            status:403,
                            message: "user not authorized"
                        }]
                    })
                }
            }else{
                return next({
                    name: "NotFound",
                    error:[{
                        status: 404,
                        message: "Data not found"
                    }]
                })
            }
        })
        .catch((err)=>{
            return next(err)
        })
}

module.exports = {
    autorization_subtask,
    autorization_project
}