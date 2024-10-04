import { GetProfile } from "../Services/Apis/auth"
import { useEffect, useState } from "react"

export const ProfilePage = () => {
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
      // completer la Page Getprofile
    }
  }
}
