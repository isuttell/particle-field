export function result(obj, prop) {
  if (typeof obj[prop] === 'function') {
    return obj[prop]();
  } else {
    return obj[prop];
  }
}
