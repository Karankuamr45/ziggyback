import express from 'express';
import router from './router/web.js';
import connectdb from './db/connectdb.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
const app=express();
const port=process.env.PORT||5000;
const DATABASE_URL=process.env.DATABASE_URL||"mongodb+srv://karan:karan12712@cluster0.z9qdea3.mongodb.net/";

connectdb(DATABASE_URL)




// Use cors middleware
app.use(cors());

// Middleware for serving static files
app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));

// Middleware for parsing JSON requests
app.use(bodyParser.json());



app.use('/',router);

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})


