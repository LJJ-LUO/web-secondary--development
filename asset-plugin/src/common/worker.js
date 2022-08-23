import PromiseWorker from 'promise-worker';

const worker = new Worker('/static/worker-1.0.js');
const promiseWorker = new PromiseWorker(worker);

export function xlsxParser(file, parseOptions = {}) {
  return promiseWorker.postMessage({
    type: 'parse-xlsx',
    payload: {
      file,
      parseOptions,
    },
  });
}

export function sheet_to_json(sheet, options = {}) {
  return promiseWorker.postMessage({
    type: 'sheet-to-json',
    payload: {
      sheet,
      options,
    },
  });
}
