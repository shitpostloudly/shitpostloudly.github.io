export const GColor = function(r,g,b) {
  r = (typeof r === 'undefined')?0:r;
  g = (typeof g === 'undefined')?0:g;
  b = (typeof b === 'undefined')?0:b;
  return {r:r, g:g, b:b};
};
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