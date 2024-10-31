import express, { Express, Request, Response } from 'express'
import { PORT } from '../secrets';
import { rootRouter } from './route';
import { PrismaClient } from '@prisma/client';

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.send('App is running');
});
app.use(express.json());
app.use('/api', rootRouter);

export const prismaClient = new PrismaClient({
    log: ['query']
})

app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`);
});