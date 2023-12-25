export const modifyObject = (
  properties: string[],
  value: any,
  obj: any
): any => {
  if (properties.length === 0) {
    return value;
  }
  const [property, ...restProperties] = properties;
  if (Array.isArray(obj)) {
    const newArray: any[] = obj.map((item, index) => {
      if (index === parseInt(property, 10)) {
        return modifyObject(restProperties, value, item);
      }
      return item;
    });
    return newArray;
  }
  return {
    ...obj,
    [property]: modifyObject(restProperties, value, obj[property] || {}),
  };
};

export const addObject = (
  properties: string[],
  newItem: any,
  obj: any
): any => {
  if (properties.length === 1) {
    return { ...obj, [properties[0]]: [...obj[properties[0]], newItem] };
  }
  const [property, ...restProperties] = properties;
  const currentValue = obj[property];
  return {
    ...obj,
    [property]: addObject(restProperties, newItem, currentValue),
  };
};

export const retireObject = (properties: string[], obj: any): object => {
  if (properties.length === 3) {
    return {
      ...obj,
      [properties[0]]: [
        ...obj[properties[0]].slice(0, +properties[1]),
        ...obj[properties[0]].slice(+properties[1] + 1),
      ],
    };
  }
  const [property, ...restProperties] = properties;
  const currentValue = obj[property];
  return {
    ...obj,
    [property]: retireObject(restProperties, currentValue),
  };
};
