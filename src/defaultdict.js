export default defaultValue => new Proxy({}, {
  get(target, property) {
    if (target[property] !== undefined) {
      return target[property];
    }

    switch (typeof defaultValue) {
      case 'undefined':
      case 'boolean':
      case 'number':
      case 'string':
      case 'symbol':
        target[property] = defaultValue;
        break;
      case 'function':
        target[property] = defaultValue(property);
        break;
      case 'object':
        if (defaultValue === null) {
          target[property] = null;
          break;
        }
        if (Array.isArray(defaultValue)) {
          target[property] = [...defaultValue];
          break;
        }
        target[property] = { ...defaultValue };
        break;
      default: throw new TypeError(`Unnkown type ${typeof defaultValue}`);
    }

    return target[property];
  },
});
