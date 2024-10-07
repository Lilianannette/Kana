import { useNavigate } from "react-router-dom"
import { GetProfile, editProfile } from "../Services/Apis/auth"
import { useEffect, useState } from "react"

export const EditProfilePage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        pseudo: '',
        firstname:'',
        lastname:'',
        email:'',
        gender:'',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchProfile = async () => {
        const token = localStorage.getItem('token');
        if(!token) {
            setError('Vous devez être connecté pour voir cette page.');
            return;
        }

        try {
            const userProfile = await GetProfile(token);
            setFormData({
                pseudo: userProfile.pseudo,
                firstname: userProfile.firstname,
                lastname: userProfile.lastname,
                email: userProfile.email,
                gender: userProfile.gender
            });
        } catch (err) {
            setError('Erreur lors de la récupération du profil', err)
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if(!token) {
            setError('Vous devez être connecté pour mettre à jour votre profil');
            return;
        }

        try {
            await editProfile(token, formData);
            setSuccess('Profil mis à jour avec succès ');
            navigate('/')
            setError('');
        } catch (err) {
            setError('Erreur lors de la mise à jour du profil.', err);
            setSuccess('')
        }
    };

    return (
        <div className="form">
            <h1>Modifier mon profil</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="pseudo"
                    placeholder="Pseudo"
                    value={formData.pseudo}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="text" 
                    name="firstname"
                    placeholder="Prénom"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="text" 
                    name="lastname"
                    placeholder="Nom"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="email" 
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <select 
                    name="gender" 
                    value={formData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">Choisir le genre</option>
                    <option value="Male">Homme</option>
                    <option value="Female">Femme</option>
                    <option value="Other">Autre</option>
                </select>
                <button type="submit">Enregistrer les modifications</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
}