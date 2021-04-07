const express = require('express'), bodyParser = require('body-parser'), app = express(), cors = require('cors'), PORT = 50001;
const multer = require('multer')
const config = require('./authen/config.json');
//fileUpload = require('express-fileupload'),
path = require('path')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(fileUpload());
const Utilities = require('./authen/Utilities');
const mysql = require('mysql');
app.use('/', (req, res, next) => {
    console.log('Request Came from:', req.ip, "::", req.path, ":", req.method);
    console.log('Request Details ::: Params:', req.params, ", Queries:", req.query, ", Body:", req.body);
    res.header("Access-Control-Allow-Origin");
    next();
});
app.get('/api/v1/login',(req,res)=>res.send("hii"))


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'images/'),
    filename: (req, file, cb) => {
        const filename = Date.now() + "-" + file.originalname;
        console.log("File is:", filename);
        req.file = file;
        req.filename = filename;
        cb(null, filename)}
});
const upload = multer({storage :storage});
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
            res.json({message :"Registration success"});
            
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
        if(result && result.length==1) {
            if (result[0].password === password) {
                res.json({message:"login successs..", data:{id: result[0].id,
                fname: result[0].fname,
                lname: result[0].lname,
                email,
                created_on: result[0].created_on}}) ;
                return false;
            }else
            throw "Invalid Credentials!";
        }
     });
   
});
app.get('/api/v1/users/list', (req,res)=>{
    
    db.query("SELECT * FROM user_details",

      (err, result) => {
        if(result && result.length>0) {
            const users = result;
            console.log("userrrrrr",users);
             res.status(200).json({users}) ;
                return false;
            }else
            throw "Invalid Credentials!";
        }
     );
   
});
app.post('/api/v1/reset/password', (req,res)=>{
 
    const password = req.body.password;
    const userId = req.body.userId;
    db.query("UPDATE user_details SET password = ? WHERE id = ?", [password, userId], (err, resp) => {
        if (err) {
            console.error("Update password error ::", err);
        
        } else {
            res.json({message:"ur password has been resetted"});
            
        } 
        }
    );
});
app.post('/api/v1/reset/password/validate', (req,res)=>{
    const id= req.body.id;
    const auth = req.body.auth;
    
    db.query("SELECT * FROM authentication WHERE id = ? AND authentication = ?", [id, auth], (err, resp) => {
        if (err) {
            console.error("User Authentication Error ::", err);
            
        } 
        console.log("result",resp)
        if(resp && resp.length > 0) {
            const previosTime = new Date(resp[0].created_on);
            const lasTime = Utilities.addMinutesToDate(previosTime, 15);
            const currentTime = new Date();
            console.log(previosTime, lasTime, currentTime);
            const greater = Utilities.compareDates(currentTime, lasTime);
            db.query("DELETE FROM authentication WHERE id = ? AND authentication = ?", [id, auth], (err, respo) => {
                if (err) {
                    console.error("User Authentication Deletion Error ::", err);
                
                } else {
                    console.log("Authentication Deleted",);
                
                }
            });
            if(greater > 0) {
                console.log("Token Expired!");
                throw "This token got expired. Please try again later!";
            }else {
                res.json({ id: resp[0].user_id });
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
            
        
            const userid = result[0].id;
            const authentication = authKey;
            console.log("user id",userid);
            console.log("mail",email);
            console.log("authky",authentication);
            db.query("INSERT INTO authentication (user_Id,email,authentication) VALUES (?,?, ?)",[userid,email,authKey], (err, result) => {
                if (err) {
                    console.error("Authentication insertion error ::", err);
                
                } else {
                    console.log("1 Row inserted");
                    
                }
                 console.log("Insertion Success!");
                 console.log("Generating Email Template" ,result.insertId);
                 const template = Utilities.getMailTemplate(email, result.insertId, authKey);
                 console.log("Got Template:", template);
                 console.log("Trying to send mail...");
                 const send =  Utilities.sendMail(email, "Reset Your Password", "", template);
                 console.log("GOT RESULTS", send);  
            
            });
            res.json({message:"reset password link has been sent to your registerd email"});
        }else throw "This email is not registered!";
    });
});
app.post('/api/v1/images/upload/:id',upload.single("imageFile") ,(req,resp)=>{
       const {
              id
        } = req.params;
        const {
             file
        } = req;
    console.log("Request came with::", id, file.filename);

    if (!id) {
        throw "Invalid User Id!";
    }

    console.log("INSERTING", id, file.filename);
    db.query("INSERT INTO images (user_id, image_path) values (?,?)", [id, file.filename], (err, res) => {
    if (err) {
        console.error("Images insertion error ::", err);
    } else {
        console.log("inserted");
        resp.json({message:"1 Row inserted"});
    }
    });
})
app.get('/api/v1/images/load/:id', (req,res)=>{
    const {
        id
    } = req.params;
    console.log("Request came with::", id);

    if (!id) {
      throw "Invalid Image Id!";
    }
    console.log("Getting image details with id:", id);
                    db.query("SELECT * FROM images WHERE id = ?", [id], (err, respo) => {
                     try {
                        if (err) {
                              console.error("Images Select Error ::", err);
                        } if (respo && respo.length > 0) {
                            const currentImg = respo[0];
                            const p = path.join(__dirname, config.imagePath + currentImg.image_path);
                            console.log("IMAGE PATH:", p);
                            res.sendFile(p);
                               console.log("Images Details:", respo[0]);
                        }else throw "Image not Found!";
                     }catch(err) {
                        console.log("ERROR ::", err);
                     }
                    
                    });
});
app.get('/api/v1/images/getall/:id', (req,res)=>{
    const {
        id
    } = req.params;
    console.log("Request came with::", id);

    if (!id) {
         throw "Invalid User Id!";
    }  
    console.log("Getting image details with", id);
         db.query("SELECT * FROM images WHERE user_id = ?", [id], (err, result) => {
            try { 
            if (err) {
                    console.error("Images Select Error ::", err);
            }
            if(result && result.length > 0) {
                console.log("resultssssssss",result);
                const images = result.map(val => ({ file: `http://localhost:50001/api/v1/images/load/${val.id}` }));
                console.log(images);
                res.status(200).json({images}) ;
            }else throw "No Images Found!";
        }catch(err) {
            console.log("ERROR ::", err);
         }
    
        });
});



// app.post('/api/v1/gallery', (req, res) => {
//     const image = req.body.image;
//     const images = [];
//     db.query("INSERT INTO user_img (image) VALUES (?)",
//          [image],
//           (err, result) => {
//             if(err) {
//                 console.log("Error Occured :", err);
//             }
//             else{
//                 res.json({message :"image uploaded"});
            
//             }
//           });
//     });

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


