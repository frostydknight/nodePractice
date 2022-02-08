const express = require("express")
const bodyParser = require("body-parser")
const library = require("./data.json")

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())


app.get("/", (_, res) => {
    res.send("Your express app")
})

app.get('/books', (_, res) => {
    const bookList = library.books.map( book => book.name)
    res.json({bookList})
})

app.get('/books/details', (_, res) => {
    const bookList = library.books.map( book => book)
    res.json({bookList})
})

app.post('/books', (req, res) => {
    const { name, author, description, genres } = req.body
    if (name, author, description, genres) {
        const checkBook = library.books.filter( book => book.name === name)[0]
        if(checkBook){
            res.status(400)
            res.json({ error: "Book already exist"})
        } else {
            res.status(201)
            library.books.push ({name, author, description, genres})
            res.end()
        }
    } else {
        res.status(400)
        res.json({ error: "missing details"})
    }
})
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})