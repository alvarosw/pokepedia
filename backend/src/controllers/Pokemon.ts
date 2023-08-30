import { Request, Response } from 'express';
import PokeApiService from '../services/PokeApi';

const service = new PokeApiService();

export default class PokemonController {
  static async getByName(req: Request, res: Response) {
    const { name } = req.params;
    const result: IPokemon = await service.getPokemon(name);

    return res.json(result);
  }
}