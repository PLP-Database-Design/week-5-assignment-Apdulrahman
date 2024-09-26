// import some dependencies /packages
//HTTP framework for handling request

const express = require ('express');
//instance of express framework
const app =express();

// DBMS mysql
const mysql = require ('mysql2');
// cross origin resources sharing
const cors =require('cors');
// environment variable doc
const dotenv = require('dotenv');
//
app.use(express.json());
app.use(cors());
dotenv.config();

// CONNECTION TO THE DATABASE
const db = mysql.createConnection({
   host:process.env.DB_HOST, 
   user:process.env.DB_USER,
   password:process.env.DB_PASSWORD,
   database:process.env.DB_NAME
});

//CHECK WHERE THERE IS CONNECTION
db.connect((err)=> {
    // If no connection 
    if(err) return console.log("Error connecting to MYSQL")
        //IF CONNECT  WORK SUCCESSFULLY
    console.log("Connected to MYSQL as id: " , db.threadId);
})
// < yur codes goes down here

app.set('view engine' , 'ejs');
app.set('views' , __dirname + '/views');

// Data .ejs file is in views folder
const getpatientDetails = async(req, res) => {
    try{

        const [patientdata] = await db.promise().query("Select * from patients") 
        const [providerdata]= await db.promise().query("Select * from providers") 
        res.render("data", {
            results: patientdata,
            providers: providerdata
        })
    }catch(err) {
        console.log(err)
    }
}

app.get("/data", getpatientDetails)

// start the  server
app.listen(process.env.PORT, () => {
    console.log(`server listening on port ${process.env.PORT}`);

// Sending a message to a browser
console.log('sending message to browser...');

app.get('/' ,(req,res) => 
    
    {
    res.send('server started successfully!');

});

});



