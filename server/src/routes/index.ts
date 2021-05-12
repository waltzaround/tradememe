import { Router } from 'express';
import auction from './Auction';

export default (app: Router) => {
	auction(app);
	return app
}