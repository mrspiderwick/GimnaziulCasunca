const { Schema, model } = require('mongoose');

const Elev = new Schema({
    IDNP: { type: String, unique: true, required: true, default: '' },
    Name: { type: String, required: true, default: '' },
    Surname: { type: String, required: true, default: '' },
    Class: {type: Number, required: true},
    Romana: {type: String, required: false},
    Chimie: {type: String, required: false},
    Mate: {type: String, required: false},
    Info: {type: String, required: false},
    Bio: {type: String, required: false},
    Moral_spirit: {type: String, required: false}
});

module.exports = model('Elev', Elev);
