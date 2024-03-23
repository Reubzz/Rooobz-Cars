// check api authentication here 
// Check if user is admin before allowing access to api.
require('dotenv').config()
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT;


exports.apiAuthCheck = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                console.log(err)
                return res.status(403).json({ message: 'Forbidden: Request origin not allowed' })
            }

            else {
                res.locals.role = decodedToken.role;
                res.locals.id = decodedToken.id;
                res.locals._id = decodedToken._id;
                res.locals.username = decodedToken.username;
                res.locals.name = decodedToken.name;
                res.locals.email = decodedToken.email;
                res.locals.profileImg = decodedToken.profileImg;

                if(decodedToken.role == 'admin') next();
                else return res.status(403).json({ message: 'Forbidden: Request origin not allowed' })
            }
        })
    }
    else {
        res.locals.role = "default"
        return res.status(403).send("Forbidden: Request user not an admin")
    }
}