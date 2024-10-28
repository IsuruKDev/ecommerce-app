import express, { Express, Request, Response } from 'express'

const app: Express = express();
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('App is running');
});

app.get('/insight', (req: Request, res: Response) => {
    res.status(200).json({ user: 'Isuru' });
})

app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`);
});