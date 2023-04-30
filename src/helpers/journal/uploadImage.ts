import axios from 'axios';

const preset = <string>import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const cloudName = <string>import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const uploadImage = async (file: File | null ): Promise<string | null > => {
    if(!file) return null;

    try {
        const formData = new FormData();
        formData.append('upload_preset', preset);
        formData.append('file', file);

        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

        const { data } = await axios.post(url, formData);

        return data.secure_url;

        
    } catch (error) {
        console.error('Error uploading image, check errors');
        return null;
    }
};

export default uploadImage;