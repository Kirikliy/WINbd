/**
 * Конфигурация переменных окружения
 */

export const ENV = {
  /**
   * Режим разработки
   */
  isDevelopment: process.env.NODE_ENV === 'development',

  /**
   * Режим продакшена
   */
  isProduction: process.env.NODE_ENV === 'production',

  /**
   * URL API
   */
  apiUrl: process.env.API_URL || 'http://localhost:3000/api',

  /**
   * SERVER API
   */
  serverUrl: process.env.SERVER_URL || 'http://localhost:3000',

  /**
   * Режим отладки
   */
  debug: process.env.DEBUG === 'true',
};

export default ENV;
