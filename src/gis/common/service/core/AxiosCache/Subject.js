/*
 * @Author: Wang Shaobing
 * @Email: wangshaobing@njsdata.com
 * @Date: 2021-07-31 17:16:41
 * @LastEditTime: 2021-07-31 17:38:03
 * @LastEditors: Wang Shaobing
 * @Description: {intl.get('COMM.SIOOM')}
 */
class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  next(value) {
    this.observers.forEach(observer => {
      observer(value);
    });
  }
}

export default Subject;
