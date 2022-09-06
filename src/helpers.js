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
  const reg = /^[A-Za-z0-9_.'" ]*$/;
  return reg.test(str);
}

export const spriteFileNames = ["sithjester_amane.png","sithjester_ameliaseillune.png","sithjester_america.png","sithjester_america_nyo.png","sithjester_america_nyo2.png","sithjester_america_revwar.png","sithjester_america_spades.png","sithjester_america_teen.png","sithjester_amimizuno.png","sithjester_australia.png","sithjester_austria.png","sithjester_austria_clubs.png","sithjester_austria_nyo.png","sithjester_austria_teen.png","sithjester_azura.png","sithjester_babyamerica.png","sithjester_babycanada.png","sithjester_belarus.png","sithjester_belarus2.png","sithjester_belgium.png","sithjester_belgium2.png","sithjester_blacklady.png","sithjester_canada.png","sithjester_canada_nyo.png","sithjester_canada_nyo2.png","sithjester_canada_teen.png","sithjester_chibitalia.png","sithjester_chibiusa.png","sithjester_chikaru.png","sithjester_china.png","sithjester_china2.png","sithjester_china_nyo.png","sithjester_china_nyo2.png","sithjester_china_spades.png","sithjester_cuba.png","sithjester_denmark.png","sithjester_egypt.png","sithjester_england.png","sithjester_england_nyo.png","sithjester_england_nyo2.png","sithjester_england_revwar.png","sithjester_england_spades.png","sithjester_england_teen.png","sithjester_estonia.png","sithjester_finland.png","sithjester_finland2.png","sithjester_florian.png","sithjester_france.png","sithjester_france_diamonds.png","sithjester_france_nyo.png","sithjester_france_nyo2.png","sithjester_france_teen.png","sithjester_germania.png","sithjester_germany.png","sithjester_germany_hearts.png","sithjester_germany_nyo.png","sithjester_germany_nyo2.png","sithjester_gourrygabriev.png","sithjester_greece.png","sithjester_greece_teen.png","sithjester_harukatenoh.png","sithjester_hikari.png","sithjester_holyromanempire.png","sithjester_hongkong.png","sithjester_hotarutomoe.png","sithjester_hungary.png","sithjester_hungary2.png","sithjester_hungary_clubs.png","sithjester_hungary_teen.png","sithjester_iceland.png","sithjester_italy_hearts.png","sithjester_italy_nyo.png","sithjester_italy_nyo2.png","sithjester_japan.png","sithjester_japan2.png","sithjester_japan_hearts.png","sithjester_japan_nyo.png","sithjester_japan_nyo2.png","sithjester_japan_teen.png","sithjester_kizuna.png","sithjester_korea.png","sithjester_laila.png","sithjester_latvia.png","sithjester_liechtenstein.png","sithjester_liechtenstein_diamonds.png","sithjester_liechtenstein_teen.png","sithjester_linainverse.png","sithjester_lithuania.png","sithjester_lithuania_teen.png","sithjester_makotokino.png","sithjester_mamoruchiba.png","sithjester_michirukaioh.png","sithjester_minakoaino.png","sithjester_nagaserpent.png","sithjester_nagisa.png","sithjester_nitaly.png","sithjester_norway.png","sithjester_poland.png","sithjester_poland_teen.png","sithjester_princessserenity.png","sithjester_prussia.png","sithjester_prussia_joker.png","sithjester_prussia_nyo.png","sithjester_prussia_nyo2.png","sithjester_queenberyl.png","sithjester_queenserenity.png","sithjester_ray.png","sithjester_ray_noir.png","sithjester_reihino.png","sithjester_remon.png","sithjester_rome.png","sithjester_russia.png","sithjester_russia_clubs.png","sithjester_russia_nyo.png","sithjester_russia_nyo2.png","sithjester_russia_teen.png","sithjester_sailorchibimoon.png","sithjester_sailorjupiter.png","sithjester_sailormars.png","sithjester_sailormercury.png","sithjester_sailormoon.png","sithjester_sailorneptune.png","sithjester_sailorpluto.png","sithjester_sailorsaturn.png","sithjester_sailorstarfighter.png","sithjester_sailorstarhealer.png","sithjester_sailorstarmaker.png","sithjester_sailoruranus.png","sithjester_sailorvenus.png","sithjester_sealand.png","sithjester_sealand_joker.png","sithjester_seiyakou.png","sithjester_setsunameioh.png","sithjester_seychelles.png","sithjester_shizuma.png","sithjester_sitaly.png","sithjester_solomon.png","sithjester_spain.png","sithjester_spain_teen.png","sithjester_sweden.png","sithjester_switzerland.png","sithjester_switzerland_diamonds.png","sithjester_switzerland_teen.png","sithjester_taikikou.png","sithjester_taiwan.png","sithjester_tamao.png","sithjester_thailand.png","sithjester_tibet.png","sithjester_turkey.png","sithjester_tuxedokamen.png","sithjester_ukraine.png","sithjester_ukraine2.png","sithjester_usagitsukino.png","sithjester_vietnam.png","sithjester_xellossmetallium.png","sithjester_yatenkou.png","sithjester_yaya.png","sithjester_zelgadisgreywords.png","vtaikikou.png"];