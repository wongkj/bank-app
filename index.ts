import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import accountRoutes from './src/routes/accountRoutes';

dotenv.config();

mongoose.connect("mongodb://wongkj11:wongkj11@mongo:27017/?authSource=admin")
    .then(() => console.log("successfully connected to DB"))
    .catch((error) => console.log(`failed to connect to DB:\n\n${error}`));


const app = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Bank TypeScript App is running');
});

app.use(express.json())

app.use("/api/v1/account", accountRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at url address http://localhost:${port}`);
});