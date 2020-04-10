const { User } = require('../models')
const { gen_token } = require('../helper/jwt')
const { decode_password } = require('../helper/bcrypt')

class Controller {

    static login(req, res, next) {
        const user = {
            email: req.body.email,
            password: req.body.password
        }

        User.findOne({
            where: {
                email: user.email
            }
        })
            .then((result) => {
                if (result) {
                    const compare = decode_password(user.password, result.password)
                    if (compare) {
                        const payload = {
                            id: result.id,
                            email: result.email
                        }
                        const token = gen_token(payload)
                        return res.status(201).json({
                            access_token: token
                        })
                    } else {
                        return next({
                            name: "NotFound",
                            error: [{
                                status: 404,
                                messase: 'Email/Password Salah'
                            }]
                        })
                    }
                } else {
                    return next({
                        name: "NotFound",
                        error: [{
                            status: 404,
                            messase: 'Email/Password Salah'
                        }]
                    })
                }
            })
            .catch((err) => {
                return next(err)
            })
    }

    static register(req, res, next) {
        const user = {
            email: req.body.email,
            password: req.body.password
        }

        User.create(user)
            .then((result) => {
                const payload = {
                    id: result.id,
                    email: result.email
                }
                const token = gen_token(payload)
                return res.status(200).json({
                    id: result.id,
                    email: result.email,
                    token: token
                })
            })
            .catch((err) => {
                return next(err)
            })
    }

    static FindAll(req, res, next) {

    }

    static FindByPk(req, res, next) {

    }

    static Create(req, res, next) {

    }

    static Update(req, res, next) {

    }

    static Delete(req, res, next) {

    }
}


module.exports = Controller

