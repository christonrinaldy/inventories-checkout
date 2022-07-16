const express = require("express")
const app = express();
const port = 3001
const router = require("./router/index");

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)
app.listen(port, () => {
    console.log("app is to listening", `http://localhost:${port}`)
})

