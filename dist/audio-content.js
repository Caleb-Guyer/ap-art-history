import {RECOMMENDATIONS,shortDetail} from './data.js?v=16';

const pronunciations=[
 ['Pazzi','Pot see'],['Rucellai','Roo chel lie'],['Arnolfini','Ar nohl fee nee'],['Isenheim','Ee zen hime'],['Gesù','Jay zoo'],['Urbino','Oor bee noh'],['Sistine','Sis teen'],
 ['Röttgen Pietà','Rut gen Pee eh tah'],['Sainte-Foy','Saint Fwah'],['Giotto','Jot toe'],['Scrovegni','Skroh ven yee'],['Haggadah','Hah gah dah'],['Merovingian','Mer oh vin jee an'],['fibulae','fib you lee'],['Hagia Sophia','Hah gee ah Soh fee ah'],['Theotokos','Thee oh toh koss'],['Bibles moralisées','Bee bluh mor ah lee zay'],['Lindisfarne','Lin dis farn'],
 ['Anavysos','Ah nah vee sos'],['Kouros','Koo ross'],['Peplos Kore','Pep loss Kor ay'],['Vettii','Vet tee eye'],['Niobides','Nye oh bih deez'],['Doryphoros','Dor if or oss'],['Hegeso','Heg eh so'],['Pergamon','Per gah mon'],['Ludovisi','Loo doh vee zee'],['Trajan','Tray jan'],['terra cotta','terra cotta'],
 ['Akhenaten','Ah keh nah ten'],['Nefertiti','Nef er tee tee'],
 ['Tutankhamun','Toot ahn kah moon'],['Hatshepsut','Hat shep soot'],
 ['Menkaure','Men cow ray'],['Hunefer','Hoo neh fer'],['Amun-Re','Ah moon Ray'],
 ['Lamassu','Lah mah soo'],['greywacke','gray wack'],['lapis lazuli','lap iss laz uh lee'],
 ['Ur','Oor']
];
const spokenDates={'3000 BCE':'Three thousand B. C. E.','2700 BCE':'Twenty seven hundred B. C. E.','2500 BCE':'Twenty five hundred B. C. E.','1750 BCE':'Seventeen fifty B. C. E.','720 BCE':'Seven twenty B. C. E.'};
export function spokenText(text){
 if(spokenDates[text])return spokenDates[text];
 let spoken=text;
 for(const [word,pronunciation] of pronunciations)spoken=spoken.replace(new RegExp(`\\b${word}\\b`,'gi'),pronunciation);
 return spoken.replace(/&/g,'and').replace(/\bBCE\b/g,'B. C. E.').replace(/\bCE\b/g,'C. E.');
}
export function audioParts(work){return [
 {field:'name',label:'Name',text:shortDetail(work.name)},
 {field:'material',label:'Material',text:shortDetail(work.material)},
 {field:'recommendation',label:'Recommendation',text:RECOMMENDATIONS[work.id].answer}
].map(part=>({...part,spoken:spokenText(part.text)}));}
export const audioSource=id=>`audio/work-${id}.wav?v=16`;
