import express, { Request, Response } from 'express';

const api = express.Router();

api.get('', (_: Request, res: Response) => res.json({ hello: 'world ' }));

export default api;