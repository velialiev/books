/**
 * @url: url should be in 'someString/{someOption}/anotherString{anotherOption}' format
 * key in {} with braces will be replaced with value from object which stored for this key
 **/
const generateUrl = (url, options) => {
  let modifiedUrl = url;

  Object.entries(options).forEach(([key, value]) => {
    const regexp = new RegExp(`{${key}}`, 'g');

    let stringValue;

    try {
      stringValue = value.toString();
    }
    catch {
      throw new Error(`Cannot stringify value ${value}`);
    }

    modifiedUrl = modifiedUrl.replace(regexp, stringValue);
  });

  return modifiedUrl;
};

export default generateUrl;
