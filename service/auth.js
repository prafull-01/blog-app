const JWT= require('jsonwebtoken');
const secretKey= "#Blogify@data&secret$key";

function createTokenForUser(user){
    const payload= {
        _id: user._id,
        email: user._email,
        role: user._role
    }
    const token= JWT.sign(payload, secretKey);
    return token;
}

function validateToken(token){
    const payload= JWT.verify(token, secretKey);
    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken,
}