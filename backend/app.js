require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require("./db/connection")
const { Strategy: GoogleStrategy } = require("passport-google-oauth2");
const userDb = require('./model/userSchema')

const app = express();
const PORT = 3001;

// Middleware setup
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    credentials: true
}));

app.use(express.json());

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth2 Strategy
passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        try {


            let user = await userDb.findOne({ googleId: profile.id });
            if (!user) {
                user = new userDb({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                    image: profile.photos[0].value
                })
                await user.save()
            }
            return done(null, user)

        } catch (error) {
            return done(error, null)
        }
    }
));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user); // Save user info in session
});

passport.deserializeUser((user, done) => {
    done(null, user); // Retrieve user info from session
});



app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
    "/auth/google/callback",
    passport.authenticate("google", { successRedirect: "http://localhost:3000/dashboard", failureRedirect: "http://localhost:3000/login" }),

);

app.get("/login/success", async (req, res) => {

    if (req.user) {
        res.status(200).json({ message: "user login", user: req.user })
    } else {
        res.status(400).json({
            message:
                "Not Authorized"
        })
    }
})

app.get("/logout", (req, res, next) => {
    req.logOut(function (err) {
        if (err) { return next(err) }
        res.redirect("http://localhost:3000")
    })
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
