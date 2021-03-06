var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gamesSchema = new Schema({
    gameId: {type: String, required: true, unique: true},
    gameName: {type: String, required: false},
    views: {type: Number, required: false}
})

module.exports = gamesSchema;