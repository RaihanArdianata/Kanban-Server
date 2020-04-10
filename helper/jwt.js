const jwt = require('jsonwebtoken');

function gen_token(payload) {
    const token = jwt.sign(payload, process.env.SECRET);
    return token
}

function decode_token(token) {
    const decoded = jwt.verify(token, process.env.SECRET);
    return decoded
}

module.exports = {
    gen_token,
    decode_token
}