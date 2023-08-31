interface IPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: IPokemonAbility[];
  images: {
    default: string,
    shiny: string;
  };
  stats: IPokemonStat[];
}

interface IPokemonAbility {
  name: string;
  isHidden: boolean;
}

interface IPokemonStat {
  name: string;
  value: number;
}

interface IPokemonList {
  next?: number,
  prev?: number,
  totalPages: number,
  data: {
    name: string,
    image: string;
  }[];
}[];