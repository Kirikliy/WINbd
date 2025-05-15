import ENDPOINTS from '@/app/consts/endpoints';
import axios from './index';

export const uploadByFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(ENDPOINTS.files.upload, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Ошибка загрузки:', error);
  }
};
