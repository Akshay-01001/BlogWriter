import axios from 'axios';

const logout = async () => {
  try {
    const token = localStorage.getItem('authToken');
    // console.log(token);
    
    const response = await axios.post('http://127.0.0.1:8000/api/logout/', {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      localStorage.removeItem('authToken');

      alert('Logout successful');
    } else {
      console.error('Failed to logout:', response.status);
      alert('Failed to logout. Please try again.');
    }
  } catch (error) {
    console.error('Error during logout:', error.response ? error.response.data : error.message);
    alert('Error during logout. Please try again.');
  }
};

export default logout;
