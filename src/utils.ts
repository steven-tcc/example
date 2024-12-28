//
//
//
export const scrollToTop = () => window.scrollTo(0, 0);

//
//
//
export const setDocumentTitle = (title: string) => {
  if (window.document) {
    window.document.title = title;
  }
};

//
//
//
export const getPrefersDarkTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

//
//
//
export const getLanguagePreference = () => {
  // https://stackoverflow.com/questions/1043339/javascript-for-detecting-browser-language-preference
  const browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'];
  let language = 'en'; // <-- default to english

  // support for HTML 5.1 "navigator.languages"
  if (Array.isArray(window.navigator.languages)) {
    for (let i = 0; i < window.navigator.languages.length; i++) {
      language = window.navigator.languages[i];
      if (language && language.length) {
        return language;
      }
    }
  }

  // support for other well known properties in browsers
  for (let i = 0; i < browserLanguagePropertyKeys.length; i++) {
    language = window.navigator[browserLanguagePropertyKeys[i] as keyof Navigator] as string;
    if (language && language.length) {
      return language;
    }
  }

  return language;
};

//
//
//
export const hexToRGBA = (hex = '', alpha = '1') => {
  const newHex = hex.startsWith('#') ? hex.slice(1) : hex;

  if (newHex.length !== 6) {
    throw new Error('invalid hex color');
  }

  const matches = newHex.match(/.{1,2}/g);
  let [red, blue, green] = [0, 0, 0];
  if (matches) {
    [red, green, blue] = matches.map((hex: string) => {
      const colorNumber = parseInt(hex, 16);

      if (isNaN(colorNumber)) {
        throw new Error('invalid hex number');
      }

      return colorNumber;
    });
  }

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

//
//
//
// protection for memory leak with 'createObjectURL'
// https://jonathanleemartin.com/blog/dont-over-react/
const globMediaUrlMap = new WeakMap();
export const getMediaUrlSrc = (media: string | File | Blob) => {
  if (typeof media === 'string') {
    return media;
  } else {
    if (globMediaUrlMap.has(media)) {
      return globMediaUrlMap.get(media);
    } else {
      const url = URL.createObjectURL(media);
      globMediaUrlMap.set(media, url);
      return url;
    }
  }
};
