const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const port = process.env.PORT || 5000;

// username:Shane-Leon 
// password:v8XkEDmoUA31d1pt 

// middleware setup
app.use(express.json({limit:"24mb"}));
app.use((express.urlencoded({limit:"24mb"})));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
  origin:'https://fashion-nova-frontend-final-y8dj.vercel.app',
  credentials:true
}));

// import image
const uploadImage = require("./src/utils/uploadImage")

// all routes
const authRoutes = require('./src/users/user.route');
const productRoutes = require('./src/products/products.route');
const reviewRoutes = require('./src/reviews/reviews.router')
const orderRoutes = require('./src/orders/orders.route');
const statsRoutes = require('./src/stats/stats.route')


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stats', statsRoutes)

main().then(()=> console.log("mongodb is successfully connected lets start coding")).catch(err => console.log(err));

async function main(){
    await mongoose.connect(process.env.DB_URL);
    app.get('/', (req, res) => {
        res.send('Hello Shane! lets start coding')
      })
}

app.post("/uploadImage", (req,res) => {
   uploadImage(req.body.image).then((url) => res.send(url)).catch((err) => res.status(500).send(err));
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})