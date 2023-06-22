const {Schema, model} = require('mongoose')

const Prof = new Schema({
    Cod: {type: String, unique: true, required: true, def:''},
    Nume: {type: String, required: true, def:''},
    Prenume: {type: String, required: true, def:''},
    Rol: [{type: String, ref: 'Role'}]
})

module.exports = model('Profesor', Prof)
