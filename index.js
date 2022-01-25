const express = require('express');
const port = 7000;
const app = express();
const path = require('path')
const db = require('./config/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const bodyParser = require("body-parser")
const Handlebars = require("handlebars");
const expHBS = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const xlsx = require('xlsx');


app.use(bodyParser.urlencoded({ extended: true }));
// set the view engine
var hbs = expHBS.create({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname,'views/layout'),
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views/layout'));
app.use(express.urlencoded());
app.use(express.static(path.resolve(__dirname, 'public')));
// app.get('/', (req,res)=>{
//     res.render('home')
// })
//  app.get('/',(req,res)=>{
//      res.send("hello world")
//  })

// fetching the data from database
app.get('/', function(req, res){
    // console.log(req.myNmae);
     User.find({}, function(err, users){
     
         if(err){
             console.log('Error in fetching contacts from db');
             return;
         }
         return  res.render('main',{selUsers:users});
  
    
  });
  });

 // action for creating the user
 app.post('/create-user', function(req, res){
    // contactList.push(req.body);
     User.create({
        name: req.body.name,
         email: req.body.email,
         mobile: req.body.mobile
     }, function(err, newUser){
         if(err){console.log('error in creating a contact',err);
       return;}
   
       console.log('*******', newUser);
       return res.redirect('back');
     });
   
     
   });
   
   // action for creating the task by user
   
 // action for creating the user
 app.post('/create-task', function(req, res){
    // contactList.push(req.body);
     Task.create({
        user: req.body.user,
         task: req.body.task,
         status: req.body.status
     }, function(err, newTask){
         if(err){console.log('error in creating a contact',err);
       return;}
   
       console.log('*******', newTask);
       return res.redirect('back');
     });
   
     
   });
// action for exporting the data into excel
app.post('/exportdata', (req, res)=>{
 let wb = xlsx.utils.book_new();
 User.find((err,data)=>{
   if(err){
     console.log("erorr",err)
   }else{
     let temp = JSON.stringify(data);
     temp = JSON.parse(temp);
     let ws = xlsx.utils.json_to_sheet(temp);
     let down = __dirname + '/public/exportdata.xlsx'
     xlsx.utils.book_append_sheet(wb,ws,"sheet1")
     xlsx.writeFile(wb, down)
     res.download(down);
   }
 })

 
})   
app.post('/exporttask', (req, res)=>{
  let wb = xlsx.utils.book_new();
  Task.find((err,data)=>{
    if(err){
      console.log("erorr",err)
    }else{
      let temp = JSON.stringify(data);
      temp = JSON.parse(temp);
      let ws = xlsx.utils.json_to_sheet(temp);
      let down = __dirname + '/public/exporttask.xlsx'
      xlsx.utils.book_append_sheet(wb,ws,"sheet1")
      xlsx.writeFile(wb, down)
      res.download(down);
    }
  })
 
  
 })   
app.listen(port, function(err){
    if(err){
        console.log('Error in running the server', err);
    }

    console.log('yup!, my express server is running on port:', port);
});