//this is the M in MVC architecture
//that is models which will interact with the database
//we will now define the db schema
const mongoose=require('mongoose');

const contactSchema=new mongoose.Schema({
  
    description:{
        type:String,
        required:true

    },
    category:{
        type:String,
        required:true
    },
    due_date:{
        type:Date,
        required:true
    }
});

const Event=mongoose.model('Event' , contactSchema);


module.exports=Event;
