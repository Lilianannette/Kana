import axios from 'axios';

export const signup = async (data) => {
    try {
        const response = await axios.post('http://localhost:3000/api/user', data);
        return response.data;
    } catch (err) {
        console.error(`Erreur lors de l'inscription :`, err);
        throw err;
    }
}

export const login = async (data) => {
    try {
        const response = await axios.post('http://localhost:3000/api/user/login', data);
        return response.data; 
    } catch (error) {
        console.error('Erreur lors de la tentative de connexion:', error);
        throw error; 
    }
};