import { Request, Response } from 'express';
import PokeApiService from '../services/PokeApi';

const service = new PokeApiService();

export default class PokemonController {
  static async list(req: Request, res: Response): Promise<Response> {
    try {
      const { page, limit } = req.query;
      const result = await service.listPokemon(limit ? +limit : undefined, page ? +page : undefined);

      return res.json(result);
    } catch (error) {
      return res
        .status(error.response?.status || 500)
        .send(error.response?.data || "Something went wrong. Try again later.");
    }
  }

  static async getByName(req: Request, res: Response): Promise<Response> {
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