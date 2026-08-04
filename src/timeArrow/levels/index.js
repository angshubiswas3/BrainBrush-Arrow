/**
 * src/timeArrow/levels/index.js
 * Master Handcrafted Time Arrow Levels Registry (TAL1 to TAL100)
 * Independent from Brain Arrow
 */

import TAL1 from './TAL1';
import TAL2 from './TAL2';
import TAL3 from './TAL3';
import TAL4 from './TAL4';
import TAL5 from './TAL5';
import TAL6 from './TAL6';
import TAL7 from './TAL7';
import TAL8 from './TAL8';
import TAL9 from './TAL9';
import TAL10 from './TAL10';
import TAL11 from './TAL11';
import TAL12 from './TAL12';
import TAL13 from './TAL13';
import TAL14 from './TAL14';
import TAL15 from './TAL15';
import TAL16 from './TAL16';
import TAL17 from './TAL17';
import TAL18 from './TAL18';
import TAL19 from './TAL19';
import TAL20 from './TAL20';
import TAL21 from './TAL21';
import TAL22 from './TAL22';
import TAL23 from './TAL23';
import TAL24 from './TAL24';
import TAL25 from './TAL25';
import TAL26 from './TAL26';
import TAL27 from './TAL27';
import TAL28 from './TAL28';
import TAL29 from './TAL29';
import TAL30 from './TAL30';
import TAL31 from './TAL31';
import TAL32 from './TAL32';
import TAL33 from './TAL33';
import TAL34 from './TAL34';
import TAL35 from './TAL35';
import TAL36 from './TAL36';
import TAL37 from './TAL37';
import TAL38 from './TAL38';
import TAL39 from './TAL39';
import TAL40 from './TAL40';
import TAL41 from './TAL41';
import TAL42 from './TAL42';
import TAL43 from './TAL43';
import TAL44 from './TAL44';
import TAL45 from './TAL45';
import TAL46 from './TAL46';
import TAL47 from './TAL47';
import TAL48 from './TAL48';
import TAL49 from './TAL49';
import TAL50 from './TAL50';
import TAL51 from './TAL51';
import TAL52 from './TAL52';
import TAL53 from './TAL53';
import TAL54 from './TAL54';
import TAL55 from './TAL55';
import TAL56 from './TAL56';
import TAL57 from './TAL57';
import TAL58 from './TAL58';
import TAL59 from './TAL59';
import TAL60 from './TAL60';
import TAL61 from './TAL61';
import TAL62 from './TAL62';
import TAL63 from './TAL63';
import TAL64 from './TAL64';
import TAL65 from './TAL65';
import TAL66 from './TAL66';
import TAL67 from './TAL67';
import TAL68 from './TAL68';
import TAL69 from './TAL69';
import TAL70 from './TAL70';
import TAL71 from './TAL71';
import TAL72 from './TAL72';
import TAL73 from './TAL73';
import TAL74 from './TAL74';
import TAL75 from './TAL75';
import TAL76 from './TAL76';
import TAL77 from './TAL77';
import TAL78 from './TAL78';
import TAL79 from './TAL79';
import TAL80 from './TAL80';
import TAL81 from './TAL81';
import TAL82 from './TAL82';
import TAL83 from './TAL83';
import TAL84 from './TAL84';
import TAL85 from './TAL85';
import TAL86 from './TAL86';
import TAL87 from './TAL87';
import TAL88 from './TAL88';
import TAL89 from './TAL89';
import TAL90 from './TAL90';
import TAL91 from './TAL91';
import TAL92 from './TAL92';
import TAL93 from './TAL93';
import TAL94 from './TAL94';
import TAL95 from './TAL95';
import TAL96 from './TAL96';
import TAL97 from './TAL97';
import TAL98 from './TAL98';
import TAL99 from './TAL99';
import TAL100 from './TAL100';

export const ALL_TIME_ARROW_LEVELS = [
  TAL1,
  TAL2,
  TAL3,
  TAL4,
  TAL5,
  TAL6,
  TAL7,
  TAL8,
  TAL9,
  TAL10,
  TAL11,
  TAL12,
  TAL13,
  TAL14,
  TAL15,
  TAL16,
  TAL17,
  TAL18,
  TAL19,
  TAL20,
  TAL21,
  TAL22,
  TAL23,
  TAL24,
  TAL25,
  TAL26,
  TAL27,
  TAL28,
  TAL29,
  TAL30,
  TAL31,
  TAL32,
  TAL33,
  TAL34,
  TAL35,
  TAL36,
  TAL37,
  TAL38,
  TAL39,
  TAL40,
  TAL41,
  TAL42,
  TAL43,
  TAL44,
  TAL45,
  TAL46,
  TAL47,
  TAL48,
  TAL49,
  TAL50,
  TAL51,
  TAL52,
  TAL53,
  TAL54,
  TAL55,
  TAL56,
  TAL57,
  TAL58,
  TAL59,
  TAL60,
  TAL61,
  TAL62,
  TAL63,
  TAL64,
  TAL65,
  TAL66,
  TAL67,
  TAL68,
  TAL69,
  TAL70,
  TAL71,
  TAL72,
  TAL73,
  TAL74,
  TAL75,
  TAL76,
  TAL77,
  TAL78,
  TAL79,
  TAL80,
  TAL81,
  TAL82,
  TAL83,
  TAL84,
  TAL85,
  TAL86,
  TAL87,
  TAL88,
  TAL89,
  TAL90,
  TAL91,
  TAL92,
  TAL93,
  TAL94,
  TAL95,
  TAL96,
  TAL97,
  TAL98,
  TAL99,
  TAL100,
];

export function getTimeArrowLevel(levelIndexOrNumber) {
  const all = ALL_TIME_ARROW_LEVELS;
  const idx = typeof levelIndexOrNumber === 'number'
    ? (levelIndexOrNumber >= 1 && levelIndexOrNumber <= all.length ? levelIndexOrNumber - 1 : levelIndexOrNumber)
    : 0;

  if (idx >= 0 && idx < all.length) {
    return all[idx];
  }
  const wrapped = Math.abs(idx) % all.length;
  return all[wrapped];
}

export {
  TAL1,
  TAL2,
  TAL3,
  TAL4,
  TAL5,
  TAL6,
  TAL7,
  TAL8,
  TAL9,
  TAL10,
  TAL11,
  TAL12,
  TAL13,
  TAL14,
  TAL15,
  TAL16,
  TAL17,
  TAL18,
  TAL19,
  TAL20,
  TAL21,
  TAL22,
  TAL23,
  TAL24,
  TAL25,
  TAL26,
  TAL27,
  TAL28,
  TAL29,
  TAL30,
  TAL31,
  TAL32,
  TAL33,
  TAL34,
  TAL35,
  TAL36,
  TAL37,
  TAL38,
  TAL39,
  TAL40,
  TAL41,
  TAL42,
  TAL43,
  TAL44,
  TAL45,
  TAL46,
  TAL47,
  TAL48,
  TAL49,
  TAL50,
  TAL51,
  TAL52,
  TAL53,
  TAL54,
  TAL55,
  TAL56,
  TAL57,
  TAL58,
  TAL59,
  TAL60,
  TAL61,
  TAL62,
  TAL63,
  TAL64,
  TAL65,
  TAL66,
  TAL67,
  TAL68,
  TAL69,
  TAL70,
  TAL71,
  TAL72,
  TAL73,
  TAL74,
  TAL75,
  TAL76,
  TAL77,
  TAL78,
  TAL79,
  TAL80,
  TAL81,
  TAL82,
  TAL83,
  TAL84,
  TAL85,
  TAL86,
  TAL87,
  TAL88,
  TAL89,
  TAL90,
  TAL91,
  TAL92,
  TAL93,
  TAL94,
  TAL95,
  TAL96,
  TAL97,
  TAL98,
  TAL99,
  TAL100,
};

export default ALL_TIME_ARROW_LEVELS;
