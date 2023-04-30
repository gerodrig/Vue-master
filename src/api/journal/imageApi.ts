import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    api_key: import.meta.env.VITE_CLOUDINARY_API_KEY,
    api_secret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
    secure: true,
  });

export const deleteImage = async (url: string | null): Promise<boolean> => {

    if(!url) return false;

    if (url) {
        //url format https://res.cloudinary.com/gerodrig18/image/upload/v1682391219/vue-test/wbk4pifuthuyxqn08ly1.jpg

        // get vue-test/wbk4pifuthuyxqn08ly1
        // const public_id = url.split('/').pop()?.split('.')[0] || '';
        const public_id = url.split('/').slice(-2).join('/').split('.')[0] || '';
  
        try {
          const result = await cloudinary.api.delete_resources([public_id], {});
            //check if deleted: {'deleted': {'vue-test/': 'deleted'}} includes deleted return true
            //else return false
            if(Object.values(result.deleted)[0] === 'deleted') return true;
            
        } catch (error) {
          console.log(error);
        }
      }

      return false;
};