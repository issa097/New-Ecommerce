// passportConfig.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/users");
require("dotenv").config();


passport.serializeUser((user, done) => {
  done(null, { id: user.google_id, email: user.email, displayName: user.username, user_id: user.user_id });
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.client_ID,
  clientSecret: process.env.client_Secret,
  callbackURL: process.env.callback_URL,
  passReqToCallback: true,

},
  // async (request, accessToken, refreshToken, profile, done) => {
  //   console.log(profile)
  //   try {
  //     const { displayName, emails, photos, id, user_id } = profile;
  //     console.log("😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂", id)
  //     const emailss = emails[0].value
  //     const photoss = photos[0].value
  //     const rolee = "user"
  //     console.log(profile, "😊😊😊😊")
  //     const user = await User.insertUser(displayName, emailss, photoss, rolee, id, user_id);

  //     await User.setActiveStatus(user.user_id, true);

  //     done(null, user);
  //   } catch (error) {
  //     done(error, null);
  //   }
  // }));
  async (request, accessToken, refreshToken, profile, done) => {
    console.log(profile);
    try {
      const { displayName, emails, photos, id, user_id } = profile;
      console.log("😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂", id);
      const email = emails[0].value;
      console.log(email)
      const photoss = photos[0].value;
      const rolee = "user";
      console.log(profile, "😊😊😊😊");

      // Check if the user already exists based on email
      const result = await User.getEmail(email);
      console.log("first", result)

      if (result.rows.length > 0) {
        const existingUser = result.rows[0];
        // User already exists, update any necessary information
        existingUser.displayName = displayName;
        existingUser.email = email;
        existingUser.photo = photoss;
        existingUser.role = rolee;
        console.log(existingUser, "dsafsdfsfd")

        // Save the updated user
        await User.updateUsers(existingUser.user_id, existingUser.username, existingUser.email, existingUser.user_img, existingUser.role, existingUser.google_id); // Make sure you have a save method in your User model

        // Set the user as active (assuming setActiveStatus is a function in your User model)
        await User.setActiveStatus(existingUser.user_id, true);

        // Pass the user to the rest of the authentication flow
        done(null, existingUser);
      } else {
        // User does not exist, create a new user
        const newUser = await User.insertUser(displayName, email, photoss, rolee, id, user_id);

        // Set the new user as active
        await User.setActiveStatus(newUser.user_id, true);

        // Pass the new user to the rest of the authentication flow
        done(null, newUser);
      }
    } catch (error) {
      done(error, null);
    }
  }));



module.exports = passport;
