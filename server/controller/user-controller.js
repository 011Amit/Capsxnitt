import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

import User from '../model/user.js';
import Token from '../model/token.js';
import dotenv from 'dotenv';
dotenv.config();

export const signupUser = async(request,response)=>{
    try{

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(request.body.password,salt);

        const user = { username: request.body.username, name:request.body.name, password:hashedPassword};
        const newUser = new User(user);
        await newUser.save();
        return response.status(200)
        .json({
            msg:'Signup Successfull'
        })

    }
    catch(error){
        return response.json({
            msg:'Erron while signup the user'
        })
    }
}
export const loginUser = async(req,res)=>{
    let user= await User.findOne({username : req.body.username});
    if(!user){
        return res.status(400).json({
            msg: 'User name does not match'
        })
    }
    try{
        let match = await bcrypt.compare(req.body.password,user.password);
        if(match){
            const accessToken= jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn:'15m'});
            const refreshToken=jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);
            const newToken = new Token({token:refreshToken});
            await newToken.save();
            return res.status(200).json({
                accessToken,refreshToken,name:user.name,username:user.username
            })
        }
        else{
           return  res.status(400).json({
                msg:'Password does not match'
            })
        }
    }
    catch(error){
        return res.status(500).json({
            msg:'Error while login in user'
        })
    }
}