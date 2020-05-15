import { Request, Response } from "express";
import { redis } from "../redis";
import { User } from "../entities/User";

export const confirmEmail = async (req: Request, res: Response) => {
    const {id} = req.params;
    console.log(req);
    const userId = await redis.get(id);
    if(userId) {
        await User.update({id: userId}, {confirmed: true});
        await redis.del(id);
        res.redirect("http://localhost:3000/");
    } else {
        res.send("Invalid email");
    }
}