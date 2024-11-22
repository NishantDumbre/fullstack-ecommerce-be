import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import cookieParser from 'cookie-parser'
import dotenv from "dotenv";
import router from "./routes/routes";
import sequelize from './config/server'
import relations from './utils/relations/relations'

dotenv.config();

const app = express();
app.use(compression());
app.use(cookieParser());

app.use(
    cors({
      origin: 'http://localhost:3000',  // Frontend URL
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,  // Allow cookies to be sent
    })
  );
  

app.use(bodyParser.json());
app.use(router)

relations()

sequelize.sync()
    .then(() => {
        app.listen(8080, ()=>{
          console.log('Connected')
        })
    })
    .catch((err) => console.log(err));
