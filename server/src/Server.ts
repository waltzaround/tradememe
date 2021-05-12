import express from 'express';
import { connectToDb } from './Connections';
import cors from 'cors';
import config from './config';
import registerRoutes from './routes';
import bodyParser  from 'body-parser'

function startServer() {
    const app = express();
    app.use(cors())
    app.use(bodyParser.json())
    registerRoutes(app);
    app.listen(config.port, function() {
        connectToDb().then(() => {
            console.log("Backend ready");
        });
    });
}

startServer();

