// Rebuild the two reference screens as self-contained, resolution-independent
// SVG artwork. Text, cards, icons, and navigation stay sharp when zoomed.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const directory = path.join(root, 'public/nori');
const photos = Object.fromEntries(await Promise.all(['avatar', 'banner', 'chickpeas', 'broccoli', 'steak'].map(async name => [name, `data:image/jpeg;base64,${(await readFile(path.join(directory, `photos/${name}.jpg`))).toString('base64')}`])));
const paths = {
  home: '<path d="m3 10 9-8 9 8v11h-6v-7H9v7H3Z"/>',
  book: '<rect x="5" y="2" width="15" height="20" rx="2"/><path d="M8 2v20M11 5v8m3-8v8m-3-4h3m-1 4v5M3 6h2m-2 5h2m-2 5h2"/>',
  calendar: '<rect x="3" y="5" width="18" height="17" rx="2"/><path d="M7 2v6m10-6v6M3 11h18m-14 4h2m4 0h2m-8 4h2m4 0h2"/>',
  search: '<circle cx="10" cy="10" r="7"/><path d="m15 15 7 7"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6v7l4 2"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
  pin: '<path d="M8 3h8l-1 7 3 3H6l3-3Zm4 10v9"/>',
  plus: '<path d="M12 3v18M3 12h18"/>',
  chef: '<path d="M6 15a5 5 0 0 1-2-9 5 5 0 0 1 8-3 5 5 0 0 1 8 3 5 5 0 0 1-2 9v6H6Zm0 2h12"/>',
  fridge: '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M6 10h12M9 5v2m0 6v4"/>',
  basket: '<path d="m3 9 2 12h14l2-12ZM2 9h20M7 9l4-7m6 7-4-7M8 12v6m4-6v6m4-6v6"/>',
  shield: '<path d="m12 2 8 4v6c0 5-4 8-8 10-4-2-8-5-8-10V6Z"/>',
  wallet: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M5 5V3h13v2m-3 7h6v5h-6Z"/>',
  settings: '<path d="m9 3 1-2h4l1 2 3 2 3 1 1 4-2 2v3l1 3-3 3-3-1-3 1-2 2-4-1-1-3-2-2-2-1V9l2-2 2-3Z"/><circle cx="12" cy="12" r="4"/>',
  wifi: '<path d="M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0m-11 4a6 6 0 0 1 8 0"/><circle cx="12" cy="20" r="1" fill="currentColor" stroke="none"/>',
};
const text = (value, x, y, size = 18, weight = 400, fill = '#23473e', extra = '') => `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" ${extra}>${value.replaceAll('&', '&amp;')}</text>`;
const rect = (x, y, w, h, r = 0, fill = '#fff', extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${extra}/>`;
const icon = (name, x, y, size = 28, color = '#8ea89e', stroke = 1.9) => `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" color="${color}">${paths[name]}</svg>`;
let clipIndex = 0;
const photo = (name, x, y, w, h, radius = 0) => {
  const id = `photo-${clipIndex++}`;
  return `<defs><clipPath id="${id}">${rect(x,y,w,h,radius)}</clipPath></defs><image href="${photos[name]}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})"/>`;
};
const status = (width, time) => text(time, width * .135, 29, 22, 600, '#fff') + rect(width / 2 - 76, -7, 152, 49, 25, '#020504') + icon('wifi', width - 119, 10, 25, '#fff', 2.5) + rect(width - 81, 14, 34, 16, 5, 'none', 'stroke="#ffffffb3" stroke-width="2"') + rect(width - 78, 17, 27, 10, 3, '#fff') + rect(width - 45, 19, 3, 6, 1, '#ffffffb3');
const navigation = (width, y, active) => {
  const centers = [width * .1, width * .295, width * .495, width * .695, width * .895];
  return rect(0, y, width, 100, 0, 'url(#green)') + centers.slice(0,4).map((cx,index) => icon(['home','book','calendar','search'][index], cx - 17, y + 22, 34, active === index ? '#fff' : '#91afa4', active === index ? 2.5 : 1.7)).join('') + photo('avatar', centers[4]-18, y+21,36,36,18) + (active === 4 ? `<circle cx="${centers[4]}" cy="${y+39}" r="20" fill="none" stroke="#cfe1d8" stroke-width="2"/>` : '');
};
const document = (width, height, title, content) => `<svg xmlns="http://www.w3.org/2000/svg" width="${width*3}" height="${height*3}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${title}">
<title>${title}</title>
<defs>
 <clipPath id="screen">${rect(0,0,width,height,38)}</clipPath>
 <linearGradient id="green" x2="1" y2="1"><stop stop-color="#204c3e"/><stop offset="1" stop-color="#123a30"/></linearGradient>
 <linearGradient id="photo-shade" x2="0" y2="1"><stop stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".8"/></linearGradient>
 <filter id="card-shadow" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="8" stdDeviation="13" flood-color="#172b24" flood-opacity=".10"/></filter>
 <filter id="soft-shadow" x="-25%" y="-25%" width="150%" height="160%"><feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="#172b24" flood-opacity=".18"/></filter>
</defs>
<g clip-path="url(#screen)" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif">${content}</g>
</svg>`;

let profile = rect(0,0,520,1094,0,'#f7f8f7') + photo('banner',0,0,520,375) + rect(0,0,520,155,0,'#00000030');
profile += status(520,'12:01') + icon('menu',452,82,30,'#fff',2);
profile += rect(23,157,474,341,22,'#fff','filter="url(#card-shadow)"') + photo('avatar',49,182,94,94,47);
profile += text('Amanda Baker',164,228,29,700) + text('@amanda.bk3r',164,256,18,400,'#a0ada7');
profile += text('Passionate home cook, sharing all my secrets',48,314,17,400,'#848c88');
profile += rect(48,337,203,44,12,'#193f34') + text('Edit Profile',149.5,365,17,700,'#fff','text-anchor="middle"');
profile += rect(264,337,204,44,12,'#edf3f1') + text('Share Profile',366,365,17,700,'#38594e','text-anchor="middle"');
profile += '<path d="M48 405H468" stroke="#f0f2f0" stroke-width="2"/>';
[['10.2K','Likes'],['3.5K','Saves'],['1.2K','Followers'],['450','Following']].forEach(([value,label],i) => {
  const x = 132 + i*85;
  profile += text(value,x,449,18,700,'#34574b','text-anchor="middle"') + text(label,x,474,14,400,'#98a69f','text-anchor="middle"');
  if(i<3) profile += `<path d="M${x+43} 433v40" stroke="#edf0ed" stroke-width="2"/>`;
});
[['steak','Pan-Roasted Rib','Steak with Cris…'],['broccoli','Grilled Malai','Broccoli']].forEach(([image,line1,line2],i) => {
  const x = 23 + i*160;
  profile += photo(image,x,524,145,169,18) + rect(x,524,145,169,18,'url(#photo-shade)') + icon('pin',x+106,540,20,'#fff',2.2) + text(line1,x+10,660,14,700,'#fff') + text(line2,x+10,680,14,700,'#fff');
});
profile += text('All Recipes',23,743,19,700) + text('Cookbooks',179,743,19,400,'#91a39a') + text('Saved',295,743,19,400,'#91a39a') + rect(64,755,24,3,1.5,'#285747');
[['chickpeas','Chickpea Sundal'],['broccoli','Grilled Malai Broccoli']].forEach(([image,title],i) => {
  const x=23+i*245;
  profile += rect(x,783,230,234,23,'#fff','filter="url(#card-shadow)"') + photo(image,x+11,794,208,169,18) + text(title,x+12,991,i?16:18,600);
});
profile += '<circle cx="454" cy="941" r="36" fill="#183e33" filter="url(#soft-shadow)"/>' + icon('plus',437,924,34,'#fff',1.6);
profile += navigation(520,1007,4);
await writeFile(path.join(directory,'profile.svg'),document(520,1094,'Nori — Amanda Baker’s cook profile',profile));

let home = rect(0,0,558,1160,0,'url(#green)') + status(558,'10:39');
home += photo('avatar',28,88,57,57,28.5) + '<circle cx="56.5" cy="116.5" r="29.5" fill="none" stroke="#fff" stroke-width="2"/>';
home += text('Good evening,',101,107,19,500,'#b8ccc2') + text('Amanda',101,135,27,700,'#fff');
home += rect(482,88,52,53,16,'#ffffff22') + icon('settings',495,101,27,'#dfebe4',1.8);
home += rect(0,172,558,1040,46,'#fff') + text("Today's Meal Plan",28,242,25,700) + text('View Calendar',392,239,18,600,'#48675b');
home += rect(27,281,505,327,32,'#f6f8f7');
[['BREAKFAST','#f7e8d9','#c29763'],['LUNCH','#fce8e4','#ca8b80'],['DINNER','#e9e9e5','#92938c']].forEach(([label,bg,color],i)=>{
 const y=301+i*96;
 home += rect(47,y,466,82,23,'#fff') + rect(63,y+16,51,51,17,bg) + icon('clock',77,y+30,24,color,1.8) + text(label,131,y+35,15,600,'#9baaa2') + text('Not planned',131,y+60,18,400,'#b2bdb6') + icon('chevron',481,y+31,20,'#a5b2ab');
});
home += rect(28,638,505,94,25,'url(#green)','filter="url(#soft-shadow)"') + icon('chef',49,670,32,'#eff7f1',1.8) + text("Don't have a lot of time?",106,675,20,700,'#e1ece3') + text('Get instant recipe ideas with Nori!',106,704,20,700,'#e1ece3');
const tile = (x,y,name,subtitle,symbol,bg,color) => rect(x,y,240,180,29,'#fff','filter="url(#card-shadow)"') + rect(x+25,y+25,64,64,20,bg) + icon(symbol,x+43,y+43,28,color,1.8) + text(name,x+25,y+125,21,700) + text(subtitle,x+25,y+152,15,400,'#a2afa7');
home += tile(28,772,'My Pantry','13 items Expiring soon','fridge','#fff4df','#d9873e') + tile(293,772,'Grocery List','0 items to buy','basket','#e4f4fc','#3b80b5');
home += tile(28,978,'Preferences','Made for your lifestyle','shield','#fbeae5','#cf8a7c');
home += rect(293,978,240,180,29,'#fff','filter="url(#card-shadow)"') + rect(317,1003,52,52,17,'#eaf3e6') + icon('wallet',330,1016,26,'#729e78',1.8) + text('Budget',384,1037,21,700) + text('Spending',318,1070,14,400,'#a2afa7') + text('$325 / $500',413,1070,16,700);
home += navigation(558,1074,0);
await writeFile(path.join(directory,'meal-plan.svg'),document(558,1160,'Nori — Meal plan and kitchen dashboard',home));
console.log('Rebuilt Nori profile and meal-plan screens as SVG assets.');
