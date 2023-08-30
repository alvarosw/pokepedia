import axios, { Axios } from 'axios';

export default class PokeApiService {
  apiInstance: Axios;
  constructor() {
    this.apiInstance = axios.create({ baseURL: process.env.POKE_API_HOST });
  }

  async listPokemon(limit = 20, page?: number) {
    const { data: { results, count } } = await this.apiInstance.get('pokemon', {
      params: {
        limit,
        ...(page && {
          offset: page * limit
        })
      }
    });

    const pokemons = await Promise.all(
      results.map(({ name }) => this.getPokemon(name))
    );

    const data = pokemons.map(({ name, images }) => ({
      name,
      image: images.default
    }));

    const totalPages = Math.floor(count / limit);
    return {
      prev: page ? page - 1 : null,
      next: (page || 0) < totalPages ? (page || 0) + 1 : null,
      totalPages,
      data
    };
  }

  async getPokemon(name: string): Promise<IPokemon> {
    const { data } = await this.apiInstance.get('pokemon/' + name);
    return this.sanitizePokemonData(data);
  }

  private sanitizePokemonData(rawPokemon: RawPokemon): IPokemon {
    let pokemon: IPokemon = {
      id: rawPokemon.id,
      name: rawPokemon.name,
      weight: rawPokemon.weight,
      height: rawPokemon.height,
      abilities: rawPokemon.abilities.map(({ is_hidden, ability }) => ({
        name: ability.name,
        isHidden: is_hidden
      })).sort((a, b) => a.name.localeCompare(b.name)), // sorted alphabetically
      images: {
        default: rawPokemon.sprites.other['official-artwork'].front_default,
        shiny: rawPokemon.sprites.other['official-artwork'].front_shiny
      },
      stats: rawPokemon.stats.map(({ stat, base_stat }) => ({
        name: stat.name,
        value: base_stat
      }))
    };

    return pokemon;
  }
}