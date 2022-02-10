const express = require("express")
const app = express()
const port = 3000

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

const library = require("./BookDataBase.json")
const users = require("./users.json")

const {createUser, getCurrentUser, deleteUser} = require("./dummyUser")

/*
    1. need to rewrite Create, Read, and Update, Delete functions for the book database
    2. need to import in user functions so that I can check out/in a book for a given user 
    3. need to add controller logic for user functions
*/

app.get("/", (_, res) => {
    res.send("Your express app")
})

app.post('/books', (req, res) => {
    const { name, author, description, isbn, genres } = req.body
    if (name, author, description, isbn, genres) {
        const checkBook = library.books.filter( book => book.isbn === isbn)[0]
        if(checkBook){
            res.status(201)
            checkBook.total += 1
            checkBook.numberIn += 1
            res.end()
        } else {
            res.status(202)
            library.books.push ({name, author, description, isbn, total: 1, numberIn: 1, genres})
            res.end()
        }
    } else {
        res.status(400)
        res.json({ error: "Missing details"})
    }
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
    const { name, author, description, isbn, genres} = req.body
    if (name, author, description, isbn, genres) {
        if (library.books.filter( book => book.isbn === isbn)[0]) {
            res.status(200)
            pos = library.books.map( book => book.name).indexOf(name)
            library.books[pos].name = name
            library.books[pos].author = author
            library.books[pos].description = description
            library.books[pos].genres = genres
            res.end()
        } else {
            res.status(400)
            res.json({error: "Book not found"})
        }
    } else {
        res.status(400)
        res.json({error: "Missing Book Details"})
    }
})

app.delete("/books", (req, res) => {
    const { isbn } = req.body
    if(isbn) {
        const findBook = library.books.filter( book => book.isbn === isbn)[0]
        if (findBook) {
            if (findBook.total > 1) {
                findBook.total -= 1
                res.status(200)
                res.end()
            } else {
                let index = library.books.findIndex( book => book.isbn === isbn)[0]
                library.books.splice(index, 1)[0]
                res.status(200)
                res.end()
            }            
        }else {
            res.status(400)
            res.json({ error: "Book does not exist"})
        }
    }else {
        res.status(400)
        res.json({ error: "Missing ISBN"})
    } 
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})