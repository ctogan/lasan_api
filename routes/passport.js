const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require('../models').User;

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: '466171963780-if78nhnamd4if7uadurdiijp7v2spcoh.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback : true
    },
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            let existingUser = await User.findOne({ 'google.id': profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }
    
    console.log('Creating new user...');
    const newUser = new User({
    method: 'google',
        google: {

            id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value
        }
    });
    
    await newUser.save();

    return done(null, newUser);
        }
        catch (error) {
            return done(error, false)
        }
    }
    ));
}