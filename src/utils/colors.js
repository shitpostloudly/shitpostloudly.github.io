// export const GColor = function(r,g,b) {
//   return {r:r, g:g, b:b};
// };
export class GColor {
  constructor(r,g,b) {
    this.r = (typeof r === 'undefined')?0:r;
    this.g = (typeof g === 'undefined')?0:g;
    this.b = (typeof b === 'undefined')?0:b;
  }
  toCSSColor() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`
  }
}
export const createColorRange = function(c1, c2) {
  var colorList = [], tmpColor;
  for (var i=0; i<255; i++) {
      tmpColor = new GColor();
      tmpColor.r = c1.r + ((i*(c2.r-c1.r))/255);
      tmpColor.g = c1.g + ((i*(c2.g-c1.g))/255);
      tmpColor.b = c1.b + ((i*(c2.b-c1.b))/255);
      colorList.push(tmpColor);
  }
  return colorList;
}
/**
 * W3C recommendations light VS dark function
 * I fucking love curry
 * @param {GColor} lightColor 
 * @param {GColor} darkColor
 */
export const idealColorFunction = (lightColor, darkColor) => (background) => {
  let {r,g,b} = background;
  let uicolors = [r / 255, g / 255, b / 255];
  let c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  let L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
  return (L > 0.179) ? darkColor : lightColor;
}
export const changeLuminosity = (color, percent) => {
  const {r,g,b}=color,t=percent<0?0:255,p=percent<0?percent*-1:percent;
  return new GColor(Math.round((t-r)*p)+r,Math.round((t-g)*p)+g,Math.round((t-b)*p)+b);
}