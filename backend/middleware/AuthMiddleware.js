import jwt from 'jsonwebtoken';


const authMiddleware = async (req, res, next) => {
    const {token} = req.headers;

    console.log("Token:", token);

    if(!token){
        return res.status(401).json({success:false ,message: "Error at token not found stage, Unauthorized! Login Again"});
    }

    try{
        console.log("Token verification started");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        next();
    }catch(error){
        console.log(error);
        return res.status(500).json({success:false, message: "Internal Server Error"});
    }
}


export {authMiddleware} ;