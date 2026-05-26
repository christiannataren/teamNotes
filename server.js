const db = require("./models/db.js")

const express = require('express')
const app = express()
const userRoutes = require("./routes/userRoute.js")
const categoryRoute = require("./routes/categoryRoute.js")

app.use(express.json())
app.use((req, res, next) => {
    if (!req.is("application/json")) {
        next(utils.constructError("Unsupported Request"))

    } else {
        next()
    }
})
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return next(utils.constructError("Malformed JSON"));
    }
    next(err);
});


app.use("/user", userRoutes)
app.use("/category", categoryRoute)

// app.use("/", async (req, res, next) => {
//     let d = await userModel.insertUser()
//     res.send("Hello World")

// })


app.use((err, req, res, next) => {

    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || "Internal Server Error",
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