import express, { Express, Request, Response } from 'express'
import { PORT } from '../secrets';
import { rootRouter } from './route';

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.send('App is running');
});

app.use('/api', rootRouter)

app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`);
});