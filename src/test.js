function canonize(url) {
  // const str = '@?(https?:)?(\/\/)?(www.)?((telegram|vk|vkontakte|twitter|github)[^\/]*\/)?([a-zA-Z0-9.]*)';
  const str = '@?(https?:)?(\/\/)?(www.)?((?:[a-z\\u00a1-\\uffff0-9\.]-*)*[a-z\\u00a1-\\uffff0-9]+[^\/]*\/)?(@?[a-zA-Z0-9._]*)';
  // const str = '((?:[a-z\\u00a1-\\uffff0-9\.]-*)*[a-z\\u00a1-\\uffff0-9]+)';
  // const str = '^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$';
  const re = new RegExp(str, 'i');
  const username = url.match(re)[5];

  return '@' + username;
}

const array = [
  'https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750',
  'http://xn--80adtgbbrh1bc.xn--p1ai/pavel.durov',
  'https://telegram.me/skillbranch',
  'Https://Telegram.me/skillbranch',
  'Https://Telegram.me/skillbranch123',
  'https://Telegram.mE/Skillbranch',
  'https://Telegramqwe.mE/Skillbranch',
  'https://Telegram.me/SkillBranch',
  'http://telegram.me/skillbranch',
  'telegram.me/skillbranch',
  'skillbranch',
  '@skillbranch',
  'https://vk.com/skillbranch',
  'http://vk.com/skillbranch',
  '//vk.com/skillbranch',
  'vk.com/skillbranch',
  'vk.com/skillbranch?w=wall-82364823468-9084',
  'vk.com/skillbranch/profile',
];

array.forEach( (url) => {
  const username = canonize(url);
  console.log(username);
});