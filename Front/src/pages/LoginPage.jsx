import { login } from "../Services/Apis/auth";
import { useNavigate } from "react-router-dom"
import { useState } from "react";


export const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormDate] = useState({
        pseudo: '',
        password:'',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDate({
            ...formData,
            [name]: value,
        });
        console.log(formData)
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const loginData = {
            pseudo: formData.pseudo,
            password: formData.password,
        };
        try {
            const response = await login(loginData);
            localStorage.setItem('token', response.token);
            navigate('/');
        } catch (err) {
            setError('Erreur lors de la connexion. Veuillez vérifier vos identifiants.', err);
        }
    };

    return (
        <div className='form-login'>
            <input 
            type="text" 
            name="pseudo"
            value={formData.pseudo}
            onChange={handleChange}
            placeholder="Pseudo"
            />
            
            <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mot de passe"
            />
            <button onClick={handleSubmit}>Connection</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
};