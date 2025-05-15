const ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    user: '/auth/user',
  },
  articles: {
    get: '/articles',
    getById: '/articles/:id',
    create: '/articles/create',
    edit: '/articles/edit/:id',
    remove: '/articles/delete/:id',
    publish: '/articles/publish/:id',
  },
  files: {
    upload: '/files/upload',
    remove: '/files/:id',
  },
  users: {
    get: '/users',
  },
};

export default ENDPOINTS;
