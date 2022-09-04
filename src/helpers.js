export function randomSpot () {
  const x = Math.floor(Math.random() * (6 + 6) - 6);
  const y = Math.floor(Math.random() * (6 + 6) - 6);
  return { x, y };
}
//Left Wall: -7
//Bottom wall: 6
//Top Wall: -4
//Right wall: 7

export const mapData = {
  minX: -6,
  maxX: 6,
  minY: -4,
  maxY: 5,
  blockedSpaces: {
    '-3x-4': true,
    '-3x-3': true,
    '-3x-2': true,
    '-3x-1': true,
    '-3x0': true,
    '-3x1': true,
    '-2x-4': true,
    '-2x-3': true,
    '-2x-2': true,
    '-2x-1': true,
    '-2x0': true,
    '-2x1': true,
    '0x1': true,
    '4x1': true,
    '0x3': true,
    '4x3': true,
    '6x5': true,
    '6x4': true,
    '6x3': true,
    '6x2': true,
    '6x1': true,
    '6x0': true,
    '-1x-3': true,
    '0x-3': true,
    '1x-3': true,
    '2x-3': true,
    '3x-3': true,
    '4x-4': true,
    '6x-4': true
  }
};

export function getCoordinateString (x, y) {
  return x + 'x' + y;
}

export function isSolid (x, y) {
  if (x < mapData.minX || x > mapData.maxX || y < mapData.minY || y > mapData.maxY) {
    return true;
  }
  const coor = getCoordinateString(x, y);
  return mapData.blockedSpaces[coor];
}

export function sanitized (str) {
  const reg = /^[A-Za-z0-9_. ]*$/;
  return reg.test(str);
}