//this is the entry point of the project
const express=require('express');
const path=require('path');
const port=8500;
//on port number 8500

const app=express();

const db=require('./config/mongoose');
const Event=require('./models/event');
//used to define the schema


app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'));

const bodyParser=require('body-parser');
app.use(express.urlencoded({extended:true}));
app.use(express.static('assets'));
//middleware to help use static files like css

//listener function that will ensure 
//that the server is running and will help to find and display on terminal error

app.listen(port , function(err){
    if(err){
        console.log('error in firing up the server' , err);
        return;
    }
    console.log('server is up and running on port number:' , port);
});

//created only for testing
/*app.get( '/' , function(req , res){
   return  res.render('error' , {
        title:"error"
    });
});*/

//the functional app will be available on the route /todolist 
/*
   functionality:
   1: add a task by giving various details about it
   2:delete a task using radio checkbox
   3:tasks data for retrieval stored on database
*/ 


app.get('/todolist' , function(req , res){
    
    
     //fetch from the database
 
 Event.find({} , function(err , events){
     if(err){
         console.log('error in fetching data' , err);return;
     }
 
     return res.render('home' , {
         title:"TODO list",
         event_list:events
     });
 });
 
 
 });
 
 app.post('/create-event' , function(req , res){
 
     //using database
    //console.log(req.body);

     Event.create({
         
         description:req.body.description,
         category:req.body.category,
         due_date:req.body.due_date


     },function(err , newEvent){
         //console.log('here');
         if(err){console.log('there is error in adding' , err);return;}
         
            // console.log('**********', newEvent);
             return res.redirect('back');
         
     });
 
     
 
 });
 
 app.post('/delete-event' , function(req , res){
     
    //here we use a method wherin the the radio button input is taken 
    //and via a button sent to this route . the unique  Objectid of the selected input is sent
    //as name: task_name in the request body which we access in id variable in this function
    //this unique id is then used to delete from database
 
     //console.log('this is the delete requets we are getting ' , req.body);
     
 
     //now we will delete from database using id 
     
 
     let id=req.body.task_delete;
    
    // console.log('id is:' , id);

     Event.findByIdAndDelete(id , function(err){
         if(err){
             console.log('error in deleting' , err);return;
         }
         console.log('**********delete successful******');
         return res.redirect('back');
     });
 });
 

