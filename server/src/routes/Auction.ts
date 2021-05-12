import { Router, Request, Response, NextFunction } from 'express';
import { MongoClient, ObjectID } from 'mongodb';
import config from '../config';

export default (app: Router) => {
    app.get(
        '/auctions',
        async (_: Request, res: Response, next: NextFunction) => {
            try {
                const client = await MongoClient.connect(config.databaseUrl);
                var dbo = client.db("tradememe");
                const auctions = await dbo.collection("auctions").find().toArray();
                return res.status(200).json({ auctions });
            } catch (e) {
                return next(e);
            }
        },
    );
    app.get(
        '/auctions/:id',
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const client = await MongoClient.connect(config.databaseUrl);
                var dbo = client.db("tradememe");
                const auction = await dbo.collection("auctions").findOne({_id: new ObjectID(req.params.id)});
                if (!auction) return res.status(404);
                return res.status(200).json({ auction });
            } catch (e) {
                return next(e);
            }
        },
    );
}