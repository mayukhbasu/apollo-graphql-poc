import { OAuth2Strategy } from "passport-google-oauth";
import * as passport from "passport";
import { User } from "../entities/User";
import { EmailAddress } from "@sendgrid/helpers/classes";


passport.serializeUser((user, done) => {
    console.log("Serialization called!!!!")
    
  });
  
  passport.deserializeUser((id, done) => {
    console.log("DeSerialization called!!!!")
    
  });
  

passport.use(new OAuth2Strategy({
    clientID: `377461905177-b0hvfv0orimrsaugebel6drqrl4uqhde.apps.googleusercontent.com`,
    clientSecret: `WCh3xwHnrlbeld-vq0jrejZF`,
    callbackURL: `/auth/google/callback`,
    
    
    
  },
  async(accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(profile._json.email);
      const existingUser = await User.findOne({email: profile._json.email});
      if(existingUser){
        return done(null, existingUser);
    }

    const user = User.create({
        email: profile._json.email,
        password: '',
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        confirmed: true
    })
    await user.save();
    //console.log(user);
    return done(null, user);
  }
));