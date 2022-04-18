import express, { Request, Response, NextFunction, } from 'express';
import { IUserSearch } from './user';
import userController from './user.controller';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name, age, phone } = req.query;
		const { users, total } = await userController.findAll({ name, age, phone } as IUserSearch);
		// https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/206
		const statusCode = users.length === total ? 200 : 206;
		return res
			.status(statusCode)
			.set('Accept-Ranges', 'users')
			.set('Content-Range', `${users.length}/${total}`)
			.send(users);
	} catch (err) {
		console.log(err);
		return res.status(500).send('An unexpected error ocurred');
	}
});

export default router;