import { createBrowserRouter } from 'react-router-dom';

import PokemonList from './pages/PokemonList';
import Pokemon from './pages/Pokemon';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <PokemonList />,
  },
  {
    path: "/:name",
    element: <Pokemon />,
  },
]);

export default routes;