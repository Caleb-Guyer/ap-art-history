// New content uses only the current official College Board curriculum and image set.
export const MEDIEVAL_SOURCE='https://apcentral.collegeboard.org/media/pdf/ap-art-history-course-and-exam-description.pdf';
export const MEDIEVAL_IDS=[48,49,50,51,52,54,53,55,58,59,60,61,62,63,64];
const make=(id,name,shortName,material,parts,date,ranges,location,culture,pages,views,extra={})=>({
 id,name,shortName,material,materialParts:parts.map(p=>Array.isArray(p)?p:[p]),materialLabels:parts.map(p=>Array.isArray(p)?p[0]:p),
 date,dateRanges:ranges,dateNumbers:ranges.map(r=>r.map(Math.abs)),sortDate:-ranges[0][0],
 location,locationTerms:[],culture,period:culture,cultureTerms:[culture],periodTerms:[],
 artist:'Not specified in the curriculum',artistKnown:false,patron:'',nameAliases:[],function:'',facts:[],goTo:'',
 sourceDocument:'College Board AP Art History Course and Exam Description',sources:pages,sourceUrl:MEDIEVAL_SOURCE,
 links:[{title:'Official College Board curriculum',url:MEDIEVAL_SOURCE}],notes:[],
 omittedFields:[...(!location?['location']:[]),...(!culture?['culture']:[])],
 images:views.map((label,i)=>({src:`images/work-${id}-${i+1}.jpg`,label:label.replace(/ \(study only\)$/,''),quiz:!label.endsWith('(study only)')})),...extra
});
export const MEDIEVAL_WORKS=[
 make(48,'Catacomb of Priscilla','Catacomb of Priscilla','Excavated tufa and fresco',['excavated','tufa','fresco'],'c. 200–400 CE',[[200,400]],'Rome, Italy','Late Antique',[101],['Greek Chapel','Orant fresco','Good Shepherd fresco'],{
  locationTerms:[['rome','roma'],['italy']],nameAliases:['catacombs of priscilla'],
  visual:'An underground chapel and frescoes, including an orant figure and the Good Shepherd.',cue:'Excavated TUFA + FRESCO.',goTo:'Rome, Italy.'
 }),
 make(49,'Santa Sabina','Santa Sabina','Brick and stone, wooden roof',['brick','stone',['wood','wooden','timber']],'c. 422–432 CE',[[422,432]],'Rome, Italy','Late Antique',[102],['Exterior','Interior','Plan (study only)'],{
  locationTerms:[['rome','roma'],['italy']],nameAliases:['basilica of santa sabina'],
  visual:'A long columned interior with a wooden roof and an apse.',cue:'BRICK + STONE + WOODEN roof.',goTo:'Rome, Italy.'
 }),
 make(50,'Rebecca and Eliezer at the Well and Jacob Wrestling the Angel, from the Vienna Genesis','Vienna Genesis','Tempera, gold, and silver on purple vellum',['tempera','gold','silver','purple',['vellum','parchment']],'Early sixth century CE',[[501,550]],'','Early Byzantine',[103],['Rebecca and Eliezer at the Well','Jacob Wrestling the Angel'],{
  nameAliases:['vienna genesis','rebecca and eliezer at the well','jacob wrestling the angel','rebecca and eliezer at the well from the vienna genesis','jacob wrestling the angel from the vienna genesis'],
  visual:'Text above small painted biblical scenes on purple vellum.',cue:'TEMPERA + GOLD + SILVER on PURPLE VELLUM.',goTo:'Early Byzantine Europe.',
  notes:['The College Board medium is an illuminated manuscript. Its parenthetical materials are essential: tempera, gold, silver, and purple vellum.','The curriculum gives a century phrase. For year practice, early sixth century is interpreted as 501–550 CE.']
 }),
 make(51,'San Vitale','San Vitale','Brick, marble, and stone veneer; mosaic',['brick','marble','stone',['veneer','facing'],'mosaic'],'c. 526–547 CE',[[526,547]],'Ravenna, Italy','Early Byzantine',[103,104],['Exterior','Interior','Justinian panel','Theodora panel','Plan (study only)'],{
  locationTerms:[['ravenna'],['italy']],nameAliases:['basilica of san vitale'],
  visual:'A centrally arranged church with mosaic panels of Justinian and Theodora.',cue:'BRICK + MARBLE + STONE VENEER + MOSAIC.',goTo:'Ravenna, Italy.'
 }),
 make(52,'Hagia Sophia','Hagia Sophia','Brick and ceramic elements with stone and mosaic veneer',['brick',['ceramic','ceramics'],'stone','mosaic',['veneer','facing']],'532–537 CE',[[532,537]],'Constantinople (Istanbul)','',[105],['Exterior','Interior','Plan (study only)'],{
  locationTerms:[['constantinople','istanbul']],artist:'Anthemius of Tralles and Isidorus of Miletus',artistKnown:true,
  artistAliases:['anthemius','anthemius of tralles','isidorus','isidorus of miletus','isidore of miletus','isidore'],nameAliases:['hagia sophia constantinople'],
  visual:'A large domed building with a ring of windows beneath the central dome.',cue:'BRICK + CERAMIC; STONE + MOSAIC VENEER.',goTo:'Constantinople (Istanbul).'
 }),
 make(54,'Virgin (Theotokos) and Child between Saints Theodore and George','Virgin and Child between Saints Theodore and George','Encaustic on wood',[['encaustic','wax paint','wax painting'],'wood'],'Sixth or early seventh century CE',[[501,650]],'','Early Byzantine',[106],['Virgin and Child between Saints Theodore and George'],{
  nameAliases:['virgin and child between saints theodore and george','virgin and child with saints theodore and george','theotokos and child between saints theodore and george','virgin theotokos and child'],
  visual:'The Virgin and Child sit between two standing saints, with angels above.',cue:'ENCAUSTIC on WOOD.',goTo:'Early Byzantine Europe.',
  notes:['The curriculum gives a century phrase. Year practice accepts the sixth century and the first half of the seventh: 501–650 CE.']
 }),
 make(53,'Merovingian looped fibulae','Merovingian looped fibulae','Silver gilt worked in filigree, with inlays of garnets and other stones',[
  ['silver gilt','gilt silver','gilded silver','gold plated silver'],'filigree',['inlay','inlays','inlaid'],['garnet','garnets'],['other stones','stones']
 ],'Mid-sixth century CE',[[534,566]],'','Early medieval',[106],['Merovingian looped fibulae'],{
  nameAliases:['merovingian fibulae','merovingian looped fibula','merovingian looped brooches'],
  visual:'A pair of decorated metal objects with loops and inset stones.',cue:'SILVER GILT + FILIGREE + GARNETS and other STONE INLAYS.',goTo:'Early medieval Europe.',
  notes:['The curriculum gives a century phrase. For year practice, mid-sixth century is interpreted as the middle third, 534–566 CE; 550 CE is a simple answer.']
 }),
 make(55,'Lindisfarne Gospels: St. Matthew, cross-carpet page; St. Luke portrait page; St. Luke incipit page','Lindisfarne Gospels','Ink, pigments, and gold on vellum',['ink',['pigment','pigments','paint'],'gold',['vellum','parchment']],'c. 700 CE',[[700,700]],'','Early medieval',[107],['St. Matthew, cross-carpet page','St. Luke portrait page','St. Luke incipit page'],{
  nameAliases:['lindisfarne gospels','lindisfarne gospel'],
  visual:'An intricate cross-carpet page, a portrait of St. Luke, and an ornamented opening text page.',cue:'INK + PIGMENTS + GOLD on VELLUM.',goTo:'Early medieval Europe.',
  notes:['The College Board culture is Early medieval (Hiberno Saxon) Europe. The medium is an illuminated manuscript. The identification line does not name an artist.']
 }),
 make(58,'Church of Sainte-Foy','Church of Sainte-Foy','Stone; stone and paint; gold, silver, gemstones, and enamel over wood',[
  'stone',['paint','painted'],'gold','silver',['gemstones','gems','precious stones'],'enamel',['wood','wooden']
 ],'Church: c. 1050–1130 CE; reliquary: ninth century CE, with later additions',[[1050,1130],[801,900]],'Conques, France','Romanesque',[110],['Church exterior','The Last Judgment tympanum','Church interior','Reliquary of Sainte-Foy'],{
  locationTerms:[['conques'],['france']],nameAliases:['church of sainte foy','church of saint foy','sainte foy','saint foy','reliquary of sainte foy','reliquary of saint foy'],
  visual:'A stone church, a carved Last Judgment, and a seated reliquary covered in metal and stones.',cue:'Church: STONE. Tympanum: STONE + PAINT. Reliquary: GOLD + SILVER + GEMSTONES + ENAMEL over WOOD.',goTo:'Romanesque Europe.',
  notes:['Materials belong to the complete assigned group: stone architecture; stone and paint tympanum; gold, silver, gemstones, and enamel over wood reliquary.','Church and reliquary dates are separate. A date between the two listed periods does not receive credit.']
 }),
 make(59,'Bayeux Tapestry','Bayeux Tapestry','Embroidery on linen',[['embroidery','embroidered'],'linen'],'c. 1066–1080 CE',[[1066,1080]],'','Romanesque',[111],['Cavalry attack','First meal'],{
  nameAliases:['the bayeux tapestry'],visual:'Embroidered figures and horses run in a horizontal strip with text and borders.',cue:'EMBROIDERY on LINEN.',goTo:'Romanesque Europe.',
  notes:['The College Board culture is Romanesque Europe (English or Norman). The medium is embroidery on linen.']
 }),
 make(60,'Chartres Cathedral','Chartres Cathedral','Limestone and stained glass',['limestone',['stained glass','stain glass']],'Original construction: c. 1145–1155 CE; reconstruction: c. 1194–1220 CE',[[1145,1155],[1194,1220]],'Chartres, France','Gothic',[112,113],['Exterior','West facade','Great Portal of the West Facade','Interior','Notre Dame de la Belle Verriere window','Plan (study only)'],{
  locationTerms:[['chartres'],['france']],nameAliases:['notre dame de chartres','cathedral of chartres'],
  visual:'A cathedral with two different towers, tall interior vaults, sculpted portals, and stained glass.',cue:'LIMESTONE + STAINED GLASS.',goTo:'Gothic Europe.',
  notes:['Original construction and reconstruction have separate accepted date ranges; the gap between them is not an accepted range.']
 }),
 make(61,'Dedication Page with Blanche of Castile and King Louis IX of France, Scenes from the Apocalypse from Bibles moralisées','Bibles moralisées','Ink, tempera, and gold leaf on vellum',['ink','tempera',['gold leaf','goldleaf','gold'],['vellum','parchment']],'c. 1225–1245 CE',[[1225,1245]],'','Gothic',[114],['Dedication Page with Blanche of Castile and King Louis IX of France','Scenes from the Apocalypse'],{
  nameAliases:['bibles moralisees','bible moralisee','bible moralisee dedication page','dedication page with blanche of castile and king louis ix of france','scenes from the apocalypse from bibles moralisees'],
  visual:'One page shows a queen and king above a cleric and scribe; the other arranges scenes in circular medallions.',cue:'INK + TEMPERA + GOLD LEAF on VELLUM.',goTo:'Gothic Europe.',
  notes:['The two assigned images are from separate manuscripts. Captions follow the current College Board correction: the royal portrait is the Dedication Page; the medallion page is Scenes from the Apocalypse.']
 }),
 make(62,'Röttgen Pietà','Röttgen Pietà','Painted wood',[['painted','paint'],'wood'],'c. 1300–1325 CE',[[1300,1325]],'','Late medieval',[114],['Röttgen Pietà'],{
  nameAliases:['rottgen pieta','the rottgen pieta'],visual:'A seated woman supports the limp body of Christ across her lap.',cue:'PAINTED WOOD.',goTo:'Late medieval Europe.'
 }),
 make(63,'Arena (Scrovegni) Chapel, including Lamentation','Arena Chapel','Brick and fresco',['brick','fresco'],'Chapel: c. 1303 CE; fresco: c. 1305 CE',[[1303,1303],[1305,1305]],'Padua, Italy','',[115],['Chapel exterior','Chapel interior','Lamentation'],{
  locationTerms:[['padua','padova'],['italy']],artist:'Giotto di Bondone',artistKnown:true,artistAliases:['giotto','giotto di bondone'],
  nameAliases:['arena chapel','scrovegni chapel','arena scrovegni chapel','lamentation','arena chapel including lamentation','scrovegni chapel including lamentation'],
  visual:'A brick chapel with a fresco-covered interior, including the Lamentation scene.',cue:'BRICK architecture + FRESCO.',goTo:'Giotto di Bondone.',
  notes:['College Board names Giotto di Bondone as the artist and lists the architect as unknown. The chapel and fresco have separate dates: 1303 and 1305 CE.']
 }),
 make(64,'Golden Haggadah (The Plagues of Egypt, Scenes of Liberation, and Preparation for Passover)','Golden Haggadah','Pigments and gold leaf on vellum',[
  ['pigment','pigments','paint'],['gold leaf','goldleaf','gold'],['vellum','parchment']
 ],'c. 1320 CE',[[1320,1320]],'Spain','Late medieval',[116],['Preparation for Passover','Scenes of Liberation','The Plagues of Egypt'],{
  locationTerms:[['spain']],nameAliases:['golden haggadah','the golden haggadah'],
  visual:'Painted scenes in panels with gold backgrounds, showing plagues, liberation, and preparation for Passover.',cue:'PIGMENTS + GOLD LEAF on VELLUM.',goTo:'Late medieval Spain.',
  notes:['Captions follow the corrected current College Board image set. The medium is an illuminated manuscript.']
 })
];
export const MEDIEVAL_RECOMMENDATIONS={
 48:{field:'location',answer:'Rome, Italy'},49:{field:'location',answer:'Rome, Italy'},
 50:{field:'date',answer:'535 CE'},51:{field:'date',answer:'535 CE'},52:{field:'date',answer:'535 CE'},
 54:{field:'date',answer:'600 CE'},53:{field:'date',answer:'550 CE'},55:{field:'date',answer:'700 CE'},
 58:{field:'culture',answer:'Romanesque'},59:{field:'culture',answer:'Romanesque'},
 60:{field:'culture',answer:'Gothic'},61:{field:'culture',answer:'Gothic'},
 62:{field:'date',answer:'1320 CE'},63:{field:'location',answer:'Giotto'},64:{field:'date',answer:'1320 CE'}
};
export const MEDIEVAL_CONFUSIONS=[
 {title:'Manuscript materials',items:['50 · Vienna Genesis: tempera, gold, SILVER, and PURPLE vellum.','55 · Lindisfarne: INK, pigments, gold, vellum.','61 · Bibles moralisées: INK, TEMPERA, gold leaf, vellum.','64 · Golden Haggadah: pigments, gold leaf, vellum.']},
 {title:'Painting surfaces',items:['48 · Catacomb: excavated tufa and fresco.','54 · Virgin and Child: ENCAUSTIC on WOOD.','62 · Röttgen Pietà: PAINTED WOOD.','63 · Arena Chapel: BRICK and FRESCO.']},
 {title:'Building materials',items:['49 · Santa Sabina: brick, stone, wooden roof.','51 · San Vitale: brick, MARBLE, stone veneer, mosaic.','52 · Hagia Sophia: brick, CERAMIC elements, stone and mosaic veneer.','60 · Chartres: limestone and stained glass.']}
];
// These review terms repeat categories in the official identification lines.
export const MEDIEVAL_VOCAB=[
 ['Late Antique','College Board culture label for works 48 and 49.','Catacomb of Priscilla; Santa Sabina'],
 ['Early Byzantine','College Board culture label for works 50, 51, and 54.','Vienna Genesis; San Vitale; Virgin and Child'],
 ['Early medieval','College Board culture label for works 53 and 55.','Merovingian looped fibulae; Lindisfarne Gospels'],
 ['Romanesque','College Board culture label for works 58 and 59.','Church of Sainte-Foy; Bayeux Tapestry'],
 ['Gothic','College Board culture label for works 60 and 61.','Chartres Cathedral; Bibles moralisées'],
 ['Late medieval','College Board culture label for works 62 and 64.','Röttgen Pietà; Golden Haggadah']
];
