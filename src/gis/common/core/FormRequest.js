import instance from './request';

instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';

export default instance;
