import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CircularProgress, List, ListItem, capitalize } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

import './styles.css';

export default function Pokemon() {
  let { name } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<IPokemon>();

  useEffect(() => {
    (async () => {
      try {
        const result = await (await fetch(`${process.env.REACT_APP_API_HOST}/pokemon/${name}`)).json();
        setPokemon(result);
        setIsLoading(false);
      } catch (error) {
        // TODO: error handling
      }
    })();
  }, [name]);

  function getAbilities(pokemon: IPokemon) {
    return pokemon.abilities
      .filter(ability => !ability.isHidden)
      .map(({ name }) => capitalize(name))
      .join(', ');
  }
  function getHiddenAbilities(pokemon: IPokemon) {
    return pokemon.abilities
      .filter(ability => ability.isHidden)
      .map(({ name }) => capitalize(name))
      .join(', ');
  }

  const statLabelColorMap: Record<string, string> = {
    hp: '#32a852',
    attack: '#a83232',
    defense: '#3242a8',
    'special-attack': '#a832a6',
    'special-defense': '#5d32a8',
    speed: '#a8a632'
  };

  function sanitizeDashed(str: string) {
    return str
      .split('-')
      .map(capitalize)
      .join(' ');
  }

  return (
    <div className="container">
      <main>
        {
          isLoading ? <CircularProgress style={{ color: 'black', margin: 'auto' }} />
            :
            <div className="pokemonInfo">
              <header>
                <h1>{pokemon?.name}</h1>
              </header>
              <div className="content">
                <div className="carouselContainer">
                  <Carousel className="imageCarousel" indicators={false} >
                    {[pokemon?.images.default, pokemon?.images.shiny].map((img, i) => (
                      <>
                        <img src={img} alt='' style={{ height: '300px' }} />
                        <img src="shiny-indicator.png" alt="" hidden={i === 0} className='shinyIndicator' />
                      </>
                    ))}
                  </Carousel>
                </div>
                <List className='attributes'>
                  <ListItem >
                    <strong>Height:</strong> {pokemon?.height} (decameter)
                  </ListItem>
                  <ListItem>
                    <strong>Weight:</strong> {pokemon?.weight} (centigram)
                  </ListItem>
                  <ListItem>
                    <strong>Abilities:</strong> {getAbilities(pokemon as IPokemon)}
                  </ListItem>
                  <ListItem>
                    <strong>Hidden Abilities:</strong> {getHiddenAbilities(pokemon as IPokemon)}
                  </ListItem>
                  <ListItem>
                    {pokemon?.stats.map(stat => <span className='statLabel' style={{ backgroundColor: statLabelColorMap[stat.name] }}>{sanitizeDashed(stat.name)}: {stat.value}</span>)}
                  </ListItem>
                </List>
              </div>
            </div>
        }
      </main>
    </div>);
}