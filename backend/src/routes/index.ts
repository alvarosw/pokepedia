import express from 'express';
import PokemonController from '../controllers/Pokemon';

const api = express.Router();

api.get('/pokemon/:name', PokemonController.getByName);

export default api;