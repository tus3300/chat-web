import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,//MS
        httpOnly: true,//prevent from XSS atck, cross-site scripting atck
        sameSite: 'strict',//prevent CSRF atck, cross-site request forgery atck
        secure: process.env.NODE_ENV !== 'developement',
    })
}

export default generateTokenAndSetCookie;