export default function canonize(url) {
  // const str = '@?(https?:)?(\/\/)?(www.)?((telegram|vk|vkontakte|twitter|github)[^\/]*\/)?([a-zA-Z0-9.]*)';
  // const str = '((?:[a-z\\u00a1-\\uffff0-9\.]-*)*[a-z\\u00a1-\\uffff0-9]+)';
  const str = '@?(https?:)?(\/\/)?(www.)?((?:[a-z\\u00a1-\\uffff0-9\.]-*)*[a-z\\u00a1-\\uffff0-9]+[^\/]*\/)?(@?[a-zA-Z0-9._]*)';

  const re = new RegExp(str, 'i');
  const username = url.match(re)[5];

  if (username.charAt(0) == "@") {
    return username;
  } else {
    return '@' + username;
  }
  
}