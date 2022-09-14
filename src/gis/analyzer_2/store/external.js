import { observable, action } from 'mobx';
const observableC = observable
const actionC = action


class ExternalStore {
  observable = observableC
  config = [];

  action = actionC
  setConfig(config) {
    this.config = config;
  }
}

export default new ExternalStore();
