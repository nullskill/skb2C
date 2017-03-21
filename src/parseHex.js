export default function parseHex(color) {
  switch(color.length) {
    case 5:
      color = color + color.charAt(color.length - 1);
      break;
    case 4:
      return 'Invalid color';
      break;
    case 3:
      const wasColor = color;
      color = "";
      for (var i = 0; i < wasColor.length; i++) {
        color += wasColor.charAt(i) + wasColor.charAt(i);
      }
      break;
  }

  return "#" + color.toLowerCase();
}