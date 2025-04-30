const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const getl_routes_async = require('./router/general_async.js').general_async;

const app = express();

app.use(express.json());

// Middleware to handle user authentication token
app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

// Middleware to handle authentication for customer routes
app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
    if (req.session.authorization) {
        let token = req.session.authorization['accessToken'];

        // Verify JWT token
        jwt.verify(token, "access", (err, user) => {
            if (!err) {
                req.user = user;
                next(); // Proceed to the next middleware
            } else {
                return res.status(403).json({ message: "User not authenticated" });
            }
    });
    } else {
        return res.status(403).json({ message: "User not logged in" });
    }
});
 
const PORT =3333;

app.use("/customer", customer_routes);
app.use("/", genl_routes);
app.use("/async", getl_routes_async);

app.listen(PORT,()=>console.log("Server is running"));
