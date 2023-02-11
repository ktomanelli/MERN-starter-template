import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { mongoConnectionString } from './config';
import { AuthController } from './Controllers/AuthController';
import { auth } from './Middleware/auth';
import cookieParser from 'cookie-parser';
import { MongooseService } from './Services/MongooseService';
import { AuthService } from './Services/AuthService';

import { MongooseController } from './Controllers/MongooseController';
import { JWT } from './jwt';
var cors = require('cors');
express.response.attachRefreshToken = async function(){
    const refresh_token = await JWT.Sign(24);
    this.cookie('refresh_token', `Bearer ${refresh_token}`,{
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24,
        path: '/',
    });
}
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
const corsOptions = {
    origin: 'https://dev.notiontools.dev',
    credentials: true,
};
app.use(cors(corsOptions));

// Auth Dependencies
const authService = new AuthService();
const authController = new AuthController(authService);

// Services
// const service = new MongooseService(Model)

//Controllers
// const controller = new MongooseController(service);


app.get('/', (req:Request,res:Response)=>res.send('app running successfully'));

app.get('/health', (req:Request,res:Response)=>res.send('todo: implement health check'));

app.get('/verifyToken', auth, (req:Request,res:Response)=> authController.verify(req,res));
app.get('/refreshToken', (req:Request,res:Response)=> authController.refreshToken(req,res));
app.post('/login', (req:Request,res:Response)=> authController.login(req,res));
app.post('/signup', (req:Request, res:Response) => authController.signup(req,res));

// Routes
// app.get('/action/:id', auth, (req:Request,res:Response)=> controller.get(req,res));
// app.get('/action', auth, (req:Request,res:Response)=> controller.getAll(req,res));
// app.post('/action/:id', auth, (req:Request,res:Response)=> controller.create(req,res));

mongoose.set("strictQuery", false);
mongoose.connect(mongoConnectionString,()=>{
    console.log("Connected to MongoDB");
    app.listen(3000, ()=>{
        console.log('app listening on 3000')
    })
});