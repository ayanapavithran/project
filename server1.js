const express = require('express'), bodyParser = require('body-parser'), app = express(), cors = require('cors'), PORT = 50003;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const Utilities = require('./authen/Utilities');
const mysql = require('mysql');
app.use('/', (req, res, next) => {
    console.log('Request Came from:', req.ip, "::", req.path, ":", req.method);
    console.log('Request Details ::: Params:', req.params, ", Queries:", req.query, ", Body:", req.body);
    res.header("Access-Control-Allow-Origin");
    next();
});
app.get('/api/v1/login',(req,res)=>res.send("hii"))
app.post('/api/v1/register', (req,res)=>{
    const fname = req.body.fname;
    const lname= req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    if(!fname)
            throw "Please Enter First Name!";

        if (!email)
            throw "Please Enter Email Id!";

        if (!password)
            throw "Please Enter Password!";
    db.query("INSERT INTO user_details (fname,lname,email,password) VALUES (?,?, ?,?)",
     [fname,lname,email,password,cpassword],
      (err, result) => {
        if(err) {
            console.log("Error Occured :", err);
        }
        else{
            res.json({message :"success"});
            
        }
      });
});


app.post('/api/v1/login', (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        throw "Invalid Credentials!";   
    }

    db.query("SELECT * FROM user_details WHERE email = ? AND password = ?",
     [email,password],
      (err, result) => {
           if(err || result.length==0) {
             res.status(500).send({error: "login failed"});
            }
            else{
                res.status(200).send({success:"login successs.."}) 
           
            }
        });
   
});
app.post('/api/v1/reset/password', (req,res)=>{
 
    const password = req.body.password;
    const userId = req.body.userId;
    db.query("UPDATE user_details SET password = ? WHERE id = ?", [password, userId], (err, res) => {
        if (err) {
            console.error("Update password error ::", err);
        
        } else {
            console.log("ur password has been resetted")
            
        } 
        }
    );
});
app.post('/api/v1/reset/password/validate', (req,res)=>{
    const id= req.body.id;
    const authentication = req.body.authentication;
    
    db.query("SELECT * FROM authentication WHERE id = ? AND authentication = ?", [id, authentication], (err, res) => {
        if (err) {
            console.error("User Authentication Error ::", err);
            
        } 
        if(res && res.length > 0) {
            const previosTime = new Date(res[0].created_on);
            const lasTime = Utilities.addMinutesToDate(previosTime, 15);
            const currentTime = new Date();
            console.log(previosTime, lasTime, currentTime);
            const greater = Utilities.compareDates(currentTime, lasTime);
            sql.query("DELETE FROM authentication WHERE id = ? AND authentication = ?", [id, authentication], (err, resp) => {
                if (err) {
                    console.error("User Authentication Deletion Error ::", err);
                
                } else {
                    console.log("Authentication Deleted",resp);
                
                }
            });
            if(greater > 0) {
                console.log("Token Expired!");
                throw "This token got expired. Please try again later!";
            }else {
                res.json(Utilities.Response(0, "Success", { id: result[0].user_id }));
            }
        }else throw "Invalid Credentials!";
    });
   
});
app.post('/api/v1/forget/password', (req,res)=>{
     
    const email = req.body.email;
    db.query("SELECT * FROM user_details WHERE email = ? ", email, (err, result) => {
        if (err) {
            console.error("User GetById Error ::", err);
            
        } 
        if (result && result.length === 1) {

            console.log("Generating key Length");
            const length = Utilities.getRandomNumber(56, 256);
            console.log("Generating auth key of length:", length);
            const authKey = Utilities.generateAuthKey(length);
            console.log("Generated Auth Key:", authKey);
            
            console.log("Generating Authentication");
            
            const email = req.body.email;
            const authentication = req.body.authentication;
            db.query("INSERT INTO authentication (user_Id,email,authentication) VALUES (?,?, ?)",[result[0].id,email,authKey], (err, res) => {
                if (err) {
                    console.error("Authentication insertion error ::", err);
                
                } else {
                    console.log("1 Row inserted");
                    
                }
                 console.log("Insertion Success!");
                 console.log("Generating Email Template");
                 const template = Utilities.getMailTemplate(email, result, authKey);
                 console.log("Got Template:", template);
                 console.log("Trying to send mail...");
                 const send =  Utilities.sendMail(email, "Reset Your Password", "", template);
                 console.log("GOT RESULTS", send);  
            
            });
        }else throw "This email is not registered!";
    });
});

app.listen(PORT, err => {
    if (err)
        return console.error(`Error while starting app, Error:: ${err}`);
    console.log(`Server started and is listening on ${PORT}`);
});

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    database: "auth",
    user: "root",
    password: "ayana123"
});

db.connect(function (err) {
    if (err) throw err;
    console.log('Connected to Database...');
});
app.get('api/v1/get', (req,res)=>{
   
    
    db.query("SELECT * FROM user_details " ,
      (err, res) => {
           
             res.send(result);
            
        }
    );
   
});

