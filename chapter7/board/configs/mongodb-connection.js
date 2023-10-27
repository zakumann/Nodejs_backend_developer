const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://samuel742:Gunzaku42th@test.htaezp5.mongodb.net/?retryWrites=true&w=majority";

module.exports = function (callback) {
    return MongoClient.connect(uri, callback);
  };