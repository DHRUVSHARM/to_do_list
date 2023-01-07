//this is where we will set up the mongoose js module and export it
const mongoose=require('mongoose');
//require the library
mongoose.connect('mongodb://localhost/to_do_list_db');
//connect to local database
const db=mongoose.connection;
//used to access the db
//console.log(db);

db.on('error' , console.error.bind(console , 'error connecting to db'));

db.once('open' , function(){
    console.log('connected to database!!!!!!!!!!!!');
});
