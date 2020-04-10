const {decode_token} = require('../helper/jwt.js')
const {User} = require('../models')

function autentiaction(req, res, next) {
    try {
        const decoded = decode_token(req.headers.access_token);
        User.findOne({
            where:{
                id: decoded.id
            }
        })
            .then((result)=>{
                if(result){
                    req.CurrentUserId = result.id
                    return next()
                }else{
                    return next({
                        name: "NotFound",
                        errors: [{
                            status: 404,
                            message: "User not Found Please Login First"
                        }]
                    })
                }
            })
            .catch((err)=>{
                return next({
                    name: 'NotAutenticate',
                    error: [{
                        status: 401,
                        message: 'User Not Autenticate'
                    }]
                })
            })
    } catch (err) {
        // err
        return next(err)
    }
}

module.exports = autentiaction