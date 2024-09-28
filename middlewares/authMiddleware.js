import jwt from "jsonwebtoken"

export const auth = (req, res, next)=>{
    const token = req.cookies.jsonwebtoken;
    if(token) {
        const payload = jwt.verify(token, 'idu7863etaysdgceff7126009hgs');
        req.userName = payload.userName;
        next();
    } else {
        res.status(401).send("Unauthorized! login to continue!");
    }
}