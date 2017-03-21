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
  console.log(rgb);
  console.log(`${+rgb[1]}`, `${+rgb[2]}`, `${+rgb[3]}`);

  const r = +rgb[1];
  const g = +rgb[2];
  const b = +rgb[3];

  if (r > 255 || g > 255 || b > 255) {
    return 'Invalid color';
  }

  return rgb2hex(r, g, b);
  // return rgbToHex(+rgb[0], +rgb[1], +rgb[2]);

  return 'RGB color';
}