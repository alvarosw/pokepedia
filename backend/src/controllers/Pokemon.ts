import { Request, Response } from 'express';
import PokeApiService from '../services/PokeApi';

const service = new PokeApiService();

export default class PokemonController {
  static async getByName(req: Request, res: Response) {
    try {
      const { name } = req.params;
      const result: IPokemon = await service.getPokemon(name);

      return res.json(result);
    } catch (error) {
      return res
        .status(error.response?.status || 500)
        .send(error.response?.data || "Something went wrong. Try again later.");
    }
  }
}