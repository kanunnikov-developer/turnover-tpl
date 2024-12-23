const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json("Ошибка авторизации!")
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err){
            return res.status(403).json('Invalid token ')
        }

        req.user = user

        next()
    })
}

module.exports = authenticateToken