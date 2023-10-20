import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token
    console.log(token)
    if(!token) {
        // return res.status(401).json({message: "Cookie is not here"})
        return res.redirect('/login')
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err) {
            // return res.status(403).json({message: "Cookie is not valid"})
            return res.redirect('/login')
        }
        req.user = user
        next()
    })
}