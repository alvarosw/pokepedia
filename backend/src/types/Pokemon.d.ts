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

interface RawPokemon extends Record<string, any> {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: Array<{
    ability: {
      name: string,
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
  sprites: Record<string, any> & {
    other: {
      'official-artwork': {
        front_default: string;
        front_shiny: string;
      };
    };
  };
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
}

