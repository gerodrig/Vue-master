import { describe, it, expect } from 'vitest';
import axios from 'axios';

import { uploadImage } from '../../../../src/helpers/journal/';
import { deleteImage } from '../../../../src/api/journal/imageApi';

describe('testing on uploadimage helper', () => {
  it('should return a Promise null if file is empty', async () => {
    const url = await uploadImage(null);

    expect(url).toBeNull();

    const { data } = await axios.get(
      'https://www.shutterstock.com/image-photo/little-gray-chinchilla-isolated-on-260nw-1922212883.jpg',
      {
        responseType: 'arraybuffer',
      }
    );

    const file = new File([data], 'dogs.jpg');

    const url2 = await uploadImage(file);

    expect(typeof url2).toBe('string');

    const result = await deleteImage(url2);
    //check if image was deleted

    expect(result).toBeTruthy();
  });

});
