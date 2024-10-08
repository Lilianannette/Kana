import axios from 'axios';

export const signup = async (data) => {
    try {
        const response = await axios.post('http://localhost:3000/api/user', data);
        return response.data;
    } catch (err) {
        console.error(`Erreur lors de l'inscription :`, err);
        throw err;
    }
};

export const login = async (data) => {
    try {
        const response = await axios.post('http://localhost:3000/api/user/login', data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la tentative de connexion:', error);
        throw error;
    }
};

export const GetProfile = async (token) => {
  try {
      const response = await axios.get('http://localhost:3000/api/user/profile', {headers: { Authorization: `Bearer ${token}`}});
      return response.data;
  } catch (err) {
      console.error('Erreur lors de la récupération du profile:', err);
      throw err;
  }
};

export const logout = async (token) => {
    try {
        await axios.post('http://localhost:3000/api/user/logout', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch(err) {
        console.error('Erreur lors de la déconnexion :', err)
        throw err;
    };
};

export const editProfile = async (token, data) => {
    try {
        const response = await axios.patch('http://localhost:3000/api/user/edit', data,  {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        console.error('Erreur lors de la mise a jour du profil :', err)
        throw err
    };
};

export const changePassword = async (token, data) => {
    try {
        const response = await axios.put('http://localhost:3000/api/user/password', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch(err) {
        console.error('Erreur lors du changemennt de mots de passe :', err)
        throw err;
    }
};