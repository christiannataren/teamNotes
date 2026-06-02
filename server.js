require('dotenv').config();
const { env } = require('node:process');
const db = require("./models/db.js")
const express = require('express')
const app = express()
const userRoutes = require("./routes/userRoute.js")
const categoryRoute = require("./routes/categoryRoute.js")
const teamsRoute = require("./routes/teamRoute.js")
const notesRoute = require("./routes/noteRoute.js")
const auth = require("./auth/auth.js")
const swaggerUi = require('swagger-ui-express');
const cors = require("cors")
const swaggerDocument = require('./swagger-output.json');

const GitHubStrategy = require("passport-github2").Strategy
const passport = require("passport")
const session = require("express-session")
const userModel = require("./models/userModel.js");
const utils = require('./utils/utils.js');
const strings = require('./utils/strings.js');
const { ObjectId } = require('mongodb');



app.use(express.json())


app.use(session({
    secret: env.SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.session())
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}))
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return next(utils.constructError("Malformed JSON"));
    }
    next(err);
});

app.use(auth.verifySesion)


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use("/users", userRoutes)
app.use("/categories", categoryRoute)
app.use("/teams", teamsRoute)
app.use("/notes", notesRoute)

app.get("/login", passport.authenticate('github'), (req, res) => { })
app.get("/", home)
app.get("/github/callback", passport.authenticate('github', {
    failureRedirect: "/api-docs", session: false
})
    , (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    })

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    async function (accessToken, refreshToken, profile, done) {
        //User.findOrCreate({ githubId: profile.id }, function (err, user) {
        const userGH = await userModel.getGithubUser(profile.id)
        if (!userGH) {
            const user = await userModel.insertUser({ name: profile.displayName, username: profile.username, githubId: profile.id })
        }
        return done(null, profile);
        //});
    }
));
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use((err, req, res, next) => {
    if (err.stack) {
        console.error(err.stack);
    }

    if (!err.custom) {
        err.message = "ERROR INTERNAL SERVER"
    }
    res.status(err.status || 500).json({
        error: {
            message: err.message,
        }
    });
});



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on('SIGINT', async () => {
    await db.close();
    process.exit(0);
});


async function home(req, res, next) {
    if (req._id) {
        const user = await userModel.getUserById(req._id)
        res.status(200).json({ sharedId: user.username })
    } else {
        return next(utils.constructError(strings.UNAUTHORIZED))
    }
}