import axios from "axios";


export default axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params: {
        key: import.meta.env.VITE_FIREBASE_API_KEY,
    },
});

