import axios, { Axios } from 'axios';

export default class PokeApiService {
  apiInstance: Axios;
  constructor() {
    this.apiInstance = axios.create({ baseURL: process.env.POKE_API_HOST });
  }

  async getPokemon(name: string) {
    const { data } = await this.apiInstance.get('pokemon/' + name);
    return data;
  }
}