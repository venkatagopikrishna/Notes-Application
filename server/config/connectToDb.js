const mongoose = require('mongoose');

async function connectToDb() {
    try {
        await mongoose.connect('mongodb+srv://gopivantla:DdFYrHIKDIzjxlOt@cluster0.v5syk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log("connected to database");
    } catch (error) {
        console.log(error);
    }

}

module.exports = connectToDb