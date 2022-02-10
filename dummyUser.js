/* 
    need to add basic functions for creating and editing users
*/

const userDB = require("./users.json")
const users = userDB.users

function addUser( name, age, address, address2, address3, zipcode){
    if (name, age, address, address3, zipcode) {
        users.push( { name, age, address, address2, address3, zipcode, libraryNumber: createLibNum(), booksOut: [] } )
    }
}

function getCurrentUser(id) {
    return users.find( user => user.libraryNumber === id)
}

function deleteUser(id){
    const index = users.findIndex( user => user.libraryNumber === id)

    if(index !== -1) {
        users.splice(index, 1)[0]
    }
}

function createLibNum(){
    const numAttempt = (Math.random() * (999999999 - 000000001) + 000000001).toString().padStart(9, "0")
    const getNums = users.filter( user => user.libraryNumber)
    if (getNums.includes(numAttempt)) {
        return createLibNum()
    } else {
        return numAttempt
    }
}

module.exports = {
    addUser,
    getCurrentUser,
    deleteUser,
}