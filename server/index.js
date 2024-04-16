
import express from 'express';
 const app = express();
 import dotenv from 'dotenv';
 import cors from 'cors';
 

 import bodyParser from 'body-parser';
 dotenv.config();
import Connection from './database/db.js';


import Router from './routes/route.js';
app.use(cors());
app.use(bodyParser.json({extended : true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',Router);

 const PORT = 8000;
 app.listen(PORT,()=> console.log(`Server is running on Port ${PORT} `));

 const  URL = process.env.URL;
 Connection(URL);