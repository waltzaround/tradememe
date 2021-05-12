import express from 'express';
import { connectToDb } from './Connections';
import cors from 'cors';
import config from './config';
import registerRoutes from './routes';

function startServer() {
    const app = express();
    app.use(cors())
    registerRoutes(app);
    app.listen(config.port, function() {
        connectToDb().then(() => {
            console.log("Backend ready");
        });
    });
}

startServer();

