import { useEffect, useState } from 'react';
import { CircularProgress, Pagination } from '@mui/material';
import { Link } from 'react-router-dom';

import './styles.css';
import api from '../../services/api';

export default function PokemonList() {
  const [list, setList] = useState<IPokemonList>({
    totalPages: 0,
    data: [],
  });

  const [page, setPage] = useState(0);
  function changePage(_event: React.ChangeEvent<unknown>, value: number) {
    setPage(value);
  }

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { data: result } = await api.get(`pokemon?limit=32&page=${page}`);
        setList(result);
        setIsLoading(false);
      } catch (error) {
        // TODO: error handling
      }
    })();
  }, [page]);

  return (
    <div className='container'>
      <main>
        {isLoading ? <CircularProgress style={{ color: 'black', margin: 'auto' }} /> :
          (
            <div id="listContainer">{
              list.data.map(pokemon => (
                <Link className='card' to={pokemon.name}>
                  <img src={pokemon.image} alt={pokemon.name} />
                  <span>{pokemon.name}</span>
                </Link>))
            }</div>
          )
        }

        <Pagination
          count={list.totalPages}
          variant="outlined"
          shape="rounded"
          size="large"
          siblingCount={4}
          style={{ padding: '2rem' }}
          onChange={changePage}
        />
      </main>
    </div>
  );
}