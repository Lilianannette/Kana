import '../css/navbar.css'
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Acceuil</Link>
        </li>
        <li>
          <Link to='/profile'>Profil</Link>
        </li>
        {/* <li>
          <Link to='/game'>Acceuil</Link>
        </li> */}
        <li>
          <Link to='/login'>Connexion</Link>
        </li>
        <li>
          <Link to='/signup'>Inscription</Link>
        </li>
      </ul>
    </nav>
  );
};
