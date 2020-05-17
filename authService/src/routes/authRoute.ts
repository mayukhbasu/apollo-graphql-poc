import { Request, Response } from "express";
import passport = require("passport");

export const callback =  () => {
    passport.authenticate('facebook', (req, res) => {
        res.redirect("/");
    })
}