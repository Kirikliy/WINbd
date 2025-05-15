import { uploadByFile } from '@/shared/api/uploadFile';

export const upload = async (file: File) => {
  const result = await uploadByFile(file);

  if (result) {
    return {
      success: 1,
      file: result,
    };
  }

  return {
    success: 0,
    error: 'Ошибка загрузки',
  };
};
