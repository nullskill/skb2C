function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function rgb2hex(reds, greens, blues) {
  var rgb = blues | (greens << 8) | (reds << 16);
  return '#' + (0x1000000 + rgb).toString(16).slice(1);
}

export default function parseRGB(color, reg) {
  
  const rgb = color.match(reg);
  // console.log(rgb);

  return rgb2hex(+rgb[0], +rgb[1], +rgb[2]);
  // return rgbToHex(+rgb[0], +rgb[1], +rgb[2]);

  return 'RGB color';
}