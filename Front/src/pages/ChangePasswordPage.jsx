import { useState } from 'react';
import { changePassword } from '../Services/Apis/auth';
import { useNavigate } from 'react-router-dom';

export const ChangedPasswordPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '', 
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, 
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(formData.newPassword !== formData.confirmNewPassword) {
            setError('Les nouveaux mots de passe ne correspondent pas');
            return;
        }

        const token = localStorage.getItem('token');
        if(!token) {
            setError('Vous devez être connecté pour changer le mot de passe.');
            return;
        }

        try {
            await changePassword(token, {
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword
            });
            setSuccess('Mot de passe mis à jour avec succès.');
            setError('');
            navigate('/profile');
        } catch(err) {
            setError('Erreur lors de la mise à jour du mot de passe.', err);
            setSuccess('');
        }
    };

    return (
        <div className="form">
            <h1>Changer le mot de passe</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="password" 
                    name="oldPassword"
                    placeholder="Ancien mot de passe"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="password" 
                    name="newPassword"
                    placeholder="Nouveau mot de passe"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="password" 
                    name="confirmNewPassword"
                    placeholder="Confirmer le nouveau mot de passe"
                    value={formData.confirmNewPassword}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Changer le mot de passe</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
}