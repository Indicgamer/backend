const express = require('express');
const session = require('express-session');
const cors = require('cors');

const PORT = 3000;
const app = express();

//middlewares
app.use(express.json());
let thirtyDays = 1000 * 60 * 60 * 24 * 30; //30 days worth of milliseconds
app.use(session({
    secret:"MySecret",
    resave:false,
    saveUninitialized:false,
    cookie: {
        maxAge: thirtyDays,
        sameSite: "none",
    }
}));

app.use(cors({
    origin: true,
    credentials: true,
}));


const validateSession = (req, res, next) => {
    if(req.session.isLoggedIn){
        next();
    }else{
        res.status(401).json({message:"Unauthenticated"});
    }
}

//routes
app.use('/api/auth', require('./routes/authRouter'));
app.use("/api/prod", validateSession,require('./routes/prodRouter'));




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});