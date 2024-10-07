import { useNavigate } from "react-router-dom"
import { GetProfile, logout } from "../Services/Apis/auth"
import { useEffect, useState } from "react"

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    if(!token) {
      setError('Vous devez être connecté pour voir cette page.');
      return;
    }
    try {
      const UserProfile = await GetProfile(token);
        setUser(UserProfile);
    } catch (err) {
      setError('Erreur lors de la récupération du profil.', err);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if(token) {
      try {
        await logout(token);
        localStorage.removeItem('token');
        navigate('/login');
      } catch(err) {
        console.error('Erreur lors de la déconnexion', err)
        setError('Erreur lors de la déconnexion. Veuillez réessayer.');
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  if (error) {
    return <div style={{ color: 'red'}}>{error}</div>;
  }

  if(!user) {
    return <div>Chargement des informations...</div>;
  }

  return (
    <div>
        <h1>Mon Profil</h1>
        <p><strong>Genre :</strong> {user.gender}</p>
        <p><strong>Pseudo :</strong> {user.pseudo}</p>
        <p><strong>Nom :</strong> {user.lastname}</p>
        <p><strong>Prénom :</strong> {user.firstname}</p>
        <p><strong>Email :</strong> {user.email}</p>
        <button onClick={handleLogout}>Déconnexion</button>
    </div>
  );
}
