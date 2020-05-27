import { OAuth2Strategy } from "passport-google-oauth";
import * as passport from "passport";
import { User } from "../entities/User";
import * as jwt from 'jsonwebtoken';



passport.serializeUser((user:any, done) => {
    //console.log("Serialization called!!!!");
    console.log(user);
    done(null, user);
    
  });
  
  passport.deserializeUser(async (user: User, done) => {
    console.log("DeSerialization called!!!!")
    const existingUser = await User.findOne({email: user.email});
    done(null, existingUser);
  });
  

passport.use(new OAuth2Strategy({
    clientID: `377461905177-b0hvfv0orimrsaugebel6drqrl4uqhde.apps.googleusercontent.com`,
    clientSecret: `WCh3xwHnrlbeld-vq0jrejZF`,
    callbackURL: `/auth/google/callback`,
    
    
    
  },
  async(accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({email: profile._json.email});
      if(existingUser){
        return done(null, existingUser);
    }

    const user = User.create({
        email: profile._json.email,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        confirmed: true,
        password: jwt.sign(accessToken, 'secret')
    })
    await user.save();
    done(null, user);
  }
));