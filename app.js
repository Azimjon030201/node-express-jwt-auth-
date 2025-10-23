const express = require('express');
const mongoose = require('mongoose');
const authRouter = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const {requireAuth, checkUser} = require("./middleware/authMiddleware");
const app = express();



// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const url = "mongodb://localhost:27017/node-express-jwt-auth"
const dbURI = "mongodb+srv://hazard030201_db_user:Azimjon03@cluster0.qa9sf6w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
//   .then((result) => {console.log(result)})
//   .catch((err) => console.log(err));
try {
   // const urlLocalhost = "mongodb://localhost:27017/fullProject2"
    // const url_ip = "mongodb://127.0.0.1:27017/fullProject2"
    const option = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }

    mongoose.connect(url,option  ).then((data)=>{
        if(!data){
            console.log("Db error");
        }else{
            console.log("Database connected")
        }
    })
}
 catch (error) {
    console.log(error.message)
}
// routes
app.get("*", checkUser)
app.get('/', (req, res) => res.render("home"));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRouter);


app.listen(3000, () => console.log("Server runs on port 3000"))