import { OAuth2Strategy } from "passport-google-oauth";
import * as passport from "passport";
import { User } from "../entities/User";


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
      
      
      
  }
));