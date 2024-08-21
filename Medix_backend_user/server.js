const express = require('express')
const app = express();
const mongoose  = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

app.use(cookieParser())

const mongoUrl  = process.env.MONGO_URL;
const port = process.env.PORT || 4000;

app.listen(port, () =>{
    console.log("connected to port:", port)
})

app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://user-medix.vercel.app/');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE'); // Add other methods if needed
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type ,auth-token');
    res.status(200).end();
    cors();
  });

app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cors({
  origin: 'https://user-medix.vercel.app/',
  methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,  
  allowedHeaders:'auth-token, Content-Type'
}));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://user-medix.vercel.app/');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });

//customer medix frontend
app.use('/api/admin', require('./costumerRoutes/AdminRoute'));
app.use('/api/user', require('./costumerRoutes/UserRoute'));
app.use('/api/auth', require('./costumerRoutes/AuthRoutes'));

//product medix frontend
app.use('/api/product', require('./costumerRoutes/ProductRoute'));

//category medix frontend
app.use('/api/category', require('./costumerRoutes/CategoryRoute'))

//order medix frontend
app.use('/api/order', require('./costumerRoutes/OrderRoute'))

//cart medix frontend
app.use('/api/cart', require('./costumerRoutes/CartRoute'))

mongoose.connect(mongoUrl).then(() =>{

    console.log("Connected to mongodb :)")
}).catch((error) =>{
    console.log("Error connecting mongodb :(", error)
})