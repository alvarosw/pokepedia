interface IPokemonList {
  next?: number,
  prev?: number,
  totalPages: number,
  data: {
    name: string,
    image: string;
  }[];
}[];