const mongoose = require( 'mongoose' );

//let MONGODB_URL = "mongodb://" + process.env.VOIPDB_USER + ":" + process.env.VOIPDB_PASSWORD + "@" + process.env.VOIPDB_DB_IP + ":" + process.env.VOIPDB_DB_PORT + "/" + process.env.VOIPDB_DBNAME;
//let MONGODB_URL = "mongodb://" + VOIPDB_USER + ":" + VOIPDB_PASSWORD + "@" + VOIPDB_DB_IP + ":" + VOIPDB_DB_PORT + "/" + VOIPDB_DBNAME;
let MONGODB_URL = "mongodb://localhost/voipsms"
mongoose.connect(MONGODB_URL, { useNewUrlParser: true });

mongoose.connection.on("connected", function(){
    console.log(`MongoDB conected successfully`);
});

mongoose.connection.on("error", function(error){
    console.log(`Mongoose default connection error:${error}`);
});

mongoose.connection.on('disconnected', function () {  
    console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
    mongoose.connection.close(function () { 
      console.log('Mongoose default connection disconnected through app termination'); 
        process.exit(0); 
    }); 
}); 