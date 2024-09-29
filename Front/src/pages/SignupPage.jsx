import { signup } from "../services/apis/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const SignupPage = () => {
    const navigate = useNavigate();
    const [ formData, setFormData] = useState ({
        gender: '',
        pseudo: '',
        lastname: '',
        firstname: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        console.log(formData)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signup(formData);
            console.log("Réponse du serveur", response);
            setSuccess(response.message);
            setError('');
            navigate('/');
        } catch (err) {
            console.error('Erreur lors de l\'inscription');
            setError(`Erreur lors de l'inscription. Veuillez réessayer.`, err);
            setSuccess('');
        }
    };

    return (
        <div className='form-signup'>
            <form onSubmit={handleSubmit}>
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

                <input 
                type="password" 
                name="password"
                placeholder="Mot de passe" 
                value={formData.password}
                onChange={handleChange}
                required
                />

                <button type="submit">Inscription</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            
        </div>
    )
}