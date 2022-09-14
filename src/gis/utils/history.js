import createHistory from 'history/createBrowserHistory';
import { routePrefix } from './context';

let history = createHistory({});

history.oldPush = history.push;
history.oldReplace = history.replace;

history.push = function(...args) {
  if (Object.prototype.toString.call(args[0]) === '[object Object]') {
    let [config, ...otherArgs] = args;
    if (config.pathname) {
      let pathname = addDiagonal(config.pathname);
      history.oldPush(
        {
          ...config,
          pathname:
            !pathname.startsWith(routePrefix) && routePrefix !== ''
              ? `${routePrefix}${pathname}`
              : pathname,
        },
        ...otherArgs
      );
    } else {
      history.oldPush(
        {
          ...config,
        },
        ...otherArgs
      );
    }
  } else {
    let [url, ...otherArgs] = args;
    let newUrl = addDiagonal(url);
    history.oldPush(
      !newUrl.startsWith(routePrefix) && routePrefix !== ''
        ? `${routePrefix}${newUrl}`
        : newUrl,
      ...otherArgs
    );
  }
};

history.replace = function(...args) {
  if (Object.prototype.toString.call(args[0]) === '[object Object]') {
    let [config, ...otherArgs] = args;
    let pathname = addDiagonal(config.pathname);
    history.oldReplace(
      {
        ...config,
        pathname:
          !pathname.startsWith(routePrefix) && routePrefix !== ''
            ? `${routePrefix}${pathname}`
            : pathname,
      },
      ...otherArgs
    );
  } else {
    let [url, ...otherArgs] = args;
    let newUrl = addDiagonal(url);
    history.oldReplace(
      !newUrl.startsWith(routePrefix) && routePrefix !== ''
        ? `${routePrefix}${newUrl}`
        : newUrl,
      ...otherArgs
    );
  }
};

// 为了push的路由最前没加入斜杠补充斜杠
function addDiagonal(url) {
  return url.startsWith('/') ? url : `/${url}`;
}

export default history;
