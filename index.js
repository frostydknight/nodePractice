const express = require("express")
const bodyParser = require("body-parser")
const library = require("./data.json")

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

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

app.get("/", (_, res) => {
    res.send("Your express app")
})

app.get('/books', (_, res) => {
    res.status(200)
    const bookList = library.books.map( book => book.name)
    res.json({bookList})
})

app.get('/books/details', (_, res) => {
    res.status(200)
    const bookList = library.books.map( book => book)
    res.json({bookList})
})

app.put("/books:name", (req, res) => {
    const { name, author, description, genres} = req.body
    if (name, author, description, genres) {
        if (library.books.filter( book => book.name === name)[0]) {
            res.status(200)
            pos = library.books.map( book => book.name).indexOf(name)
            library.books[pos].name = name
            library.books[pos].author = author
            library.books[pos].description = description
            library.books[pos].genres = genres
            res.end()
        }
    } else {
        res.status(400)
        res.json({error: "Book not found"})
    }
})

app.delete("/books", (req, res) => {
    const { name } = req.body
    if(name) {
        if (library.books.filter( book => book.name === name)[0]) {
            res.status(200)
            library.books.indexOf
            pos = library.books.map( book => book.name).indexOf(name)
            library.books.splice(pos, 1)
            res.end()
        }
    } else {
        res.status(400)
        res.json({ error: "Book does not exist"})
    }

})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})