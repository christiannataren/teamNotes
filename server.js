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
const swaggerDocument = require('./swagger-output.json');



app.use(express.json())
// app.use((req, res, next) => {
//     if (!req.is("application/json")) {
//         return next(utils.constructError("Unsupported Request"))

//     }
//      next()
// })
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

// app.use("/", async (req, res, next) => {
//     let d = await userModel.insertUser()
//     res.send("Hello World")

// })


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