import { message } from 'antd';

export default (type, data, description) => {
  if (description !== undefined && description !== '') {
    message[type](description);
  } else {
    message[type](data);
  }
};
