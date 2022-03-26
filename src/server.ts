import express from 'express';
import cors from 'cors';
import { router } from './routes';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')),
);

app.use(router);
app.listen(3333, () => console.log('SERVER RUNNING'));
