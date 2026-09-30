// Identification lines follow the supplied slides; missing works use the AP image set.
const cb='https://apstudents.collegeboard.org/sites/default/files/2019-05/ap-art-history-course-and-exam-description.pdf';
const images=(id,labels)=>labels.map((label,i)=>({src:`images/work-${id}-${i+1}.jpg`,label:label.replace(/ \(study only\)$/,''),quiz:!label.endsWith('(study only)')}));
const make=(id,name,material,parts,date,ranges,location,terms,culture,period,extra)=>({
 id,name,shortName:name,material,materialParts:parts.map(p=>Array.isArray(p)?p:[p]),materialLabels:parts.map(p=>Array.isArray(p)?p[0]:p),
 date,dateRanges:ranges,dateNumbers:ranges.map(r=>r.map(Math.abs)),sortDate:-ranges[0][0],location,locationTerms:terms,
 culture,period,cultureTerms:[culture],periodTerms:[],artist:'Unrecorded artist(s)',patron:'Unrecorded',
 nameAliases:[],links:[],notes:[],facts:[],goTo:'',...extra,
 images:images(id,extra.views)
});
export const CLASSICAL_WORKS=[
 make(26,'Athenian Agora','Plan',['plan'],'600 BCE–150 CE',[[-600,150]],'Athens, Greece',[['athens'],['greece']],'Greek','Archaic–Hellenistic',{
  sourceDocument:'2 GREEK ART.pdf',sources:[10,14,15,16],views:['Ruins','Site plan (study only)','Reconstruction (study only)'],
  nameAliases:['athenian agora site plan','agora of athens'],patron:'The citizens of Athens',
  function:'A public center for commerce, government, religion, and social life.',visual:'An open civic space beneath the Acropolis, with stoas, temples, and meeting buildings.',
  cue:'The assigned identification medium is PLAN.',goTo:'The Panathenaic Way crossed the agora.',facts:['Stoas provided covered walkways.','The bouleuterion housed the citizens’ council.'],
  notes:['The image-set medium is “Plan,” rather than one construction material for the whole site.','Identification slides give 600 BCE–150 CE; page 16 ends at 150 BCE. The full identification range is accepted.']
 }),
 make(27,'Anavysos Kouros','Marble with remnants of paint',['marble',['paint','painted','pigment']],'c. 530 BCE',[[-530,-530]],'Anavysos, Greece',[['anavysos','athens','attica'],['greece']],'Greek','Archaic',{
  sourceDocument:'2 GREEK ART.pdf',sources:[18,20],views:['Kouros'],periodTerms:['archaic'],nameAliases:['anavysos kouros kroisos','kroisos kouros'],
  function:'A grave marker commemorating Kroisos.',visual:'A nude standing youth with a frontal stance, one foot forward, and an Archaic smile.',
  cue:'Marble AND paint; the red pigment survives in the hair.',goTo:'The inscription names the dead warrior Kroisos.',facts:['The figure is carved fully in the round.','Its pose recalls Egyptian standing figures.'],notes:['The identification slide says marble; the detail slide specifies remnants of paint.']
 }),
 make(28,'Peplos Kore','Marble with painted details',['marble',['paint','painted','pigment']],'c. 530 BCE',[[-530,-530]],'Acropolis, Athens, Greece',[['athens','acropolis'],['greece']],'Greek','Archaic',{
  sourceDocument:'2 GREEK ART.pdf',sources:[23,24],views:['Kore'],periodTerms:['archaic'],nameAliases:['peplos kore from the acropolis'],
  function:'A votive figure, possibly representing a goddess.',visual:'A clothed standing female youth with an Archaic smile and a missing left arm.',
  cue:'Kouros and Kore: both marble and paint, both 530 BCE.',goTo:'The figure was found buried on the Acropolis.',facts:['Peplos names a type of Greek garment.','Paint survives in the hair, eyes, and lips.']
 }),
 make(29,'Sarcophagus of the Spouses','Terra cotta',[['terra cotta','terracotta','terra-cotta']],'c. 520 BCE',[[-520,-520]],'Cerveteri, Italy',[['cerveteri','caere'],['italy']],'Etruscan','Etruscan',{
  sourceDocument:'College Board AP Art History image set',sources:[75],links:[{title:'College Board image set',url:cb},{title:'National Etruscan Museum: Sarcophagus of the Spouses',url:'https://www.museoetru.it/works/sarcophagus-of-the-spouses'}],views:['Reclining couple'],
  nameAliases:['sarcophagus of spouses','sarcophagus of the married couple'],function:'A funerary container depicting a couple at a banquet.',visual:'A husband and wife recline together on a couch, with raised torsos and gesturing hands.',
  cue:'The couple is modeled in fired clay: terra cotta.',goTo:'The spouses recline together in a banquet pose.',facts:['The upper bodies are more fully modeled than the legs.'],notes:['This work is absent from the supplied PDFs; identification follows the College Board image set.']
 }),
 make(30,'Audience Hall of Darius and Xerxes','Limestone',['limestone'],'c. 520–465 BCE',[[-520,-465]],'Persepolis, Iran',[['persepolis'],['iran']],'Persian','Achaemenid',{
  sourceDocument:'College Board AP Art History image set',sources:[75],links:[{title:'College Board image set',url:cb}],views:['Audience hall','Stairway'],
  nameAliases:['audience hall apadana of darius and xerxes','apadana','audience hall of darius and xerxes at persepolis','apadana of darius and xerxes'],patron:'Darius I and Xerxes I',
  function:'A royal audience hall for imperial ceremonies and receptions.',visual:'A vast columned platform with monumental stairs.',cue:'The hall and reliefs are limestone.',goTo:'The hall expresses the power of the Persian empire.',facts:['Its stairways depict delegations bringing tribute.'],notes:['This work is absent from the supplied PDFs; identification follows the College Board image set.']
 }),
 make(31,'Temple of Minerva and Sculpture of Apollo','Wood, mud brick or tufa; terra cotta sculpture',[
  ['wood'],['mud brick','mudbrick','mud bricks','tufa'],['terra cotta','terracotta','terra-cotta']
 ],'c. 510–500 BCE',[[-510,-500]],'Veii, Italy',[['veii','veio','rome'],['italy']],'Etruscan','Etruscan',{
  sourceDocument:'College Board AP Art History image set',sources:[76],links:[{title:'College Board image set',url:cb}],views:['Apollo','Temple elevation (study only)','Temple plan (study only)'],
  artist:'Vulca',artistKnown:true,artistAliases:['vulca'],nameAliases:['temple of minerva veii and sculpture of apollo','temple of minerva','apollo of veii','apollo from veii'],
  function:'An Etruscan temple with rooftop religious sculpture.',visual:'Apollo strides forward in drapery; the temple has a deep porch and three cellas.',cue:'Temple: wood, mud brick or tufa. Apollo: terra cotta.',goTo:'Vulca is the master sculptor associated with Apollo.',facts:['Apollo stood on the temple roof.'],
  materialAllowed:['clay'],materialAlternatives:true,notes:['Keep temple and sculpture materials distinct. The AP line lists mud brick OR tufa as alternatives.','This work is absent from the supplied PDFs; identification follows the College Board image set.']
 }),
 make(32,'Tomb of the Triclinium','Tufa and fresco',['tufa','fresco'],'c. 480–470 BCE',[[-480,-470]],'Tarquinia, Italy',[['tarquinia'],['italy']],'Etruscan','Etruscan',{
  sourceDocument:'College Board AP Art History image set',sources:[77],links:[{title:'College Board image set',url:cb}],views:['Painted tomb chamber'],
  nameAliases:['tomb of triclinium'],function:'A painted burial chamber.',visual:'Banqueters, dancers, and musicians fill brightly colored walls.',cue:'TUFA chamber + FRESCO walls.',goTo:'A triclinium is a dining arrangement with three couches.',facts:['The banquet imagery connects funerary commemoration with social life.'],notes:['This work is absent from the supplied PDFs; identification follows the College Board image set.']
 }),
 make(33,'Niobides Krater','Clay, red-figure technique (white highlights)',[
  ['clay','ceramic','terracotta','terra cotta'],['red figure','red-figure']
 ],'c. 460–450 BCE',[[-460,-450]],'Athens, Greece; found in Orvieto, Italy',[['athens','greece','orvieto'],['greece','italy']],'Greek','Early Classical',{
  sourceDocument:'2 GREEK ART.pdf',sources:[25,26],links:[{title:'Louvre: Niobides Krater and Orvieto findspot',url:'https://collections.louvre.fr/en/ark:/53355/cl010270201'}],views:['Both sides'],artist:'Niobid Painter',artistKnown:true,artistAliases:['niobid painter','niobides painter'],periodTerms:['classical','early classical'],
  nameAliases:['niobid krater','niobides crater','niobid crater'],function:'A vessel for mixing wine and water.',visual:'A red-figure vessel with figures placed at different heights.',cue:'CLAY + RED-FIGURE.',goTo:'Apollo and Artemis kill Niobe’s children on one side.',facts:['The other side includes Heracles among warriors.','Different figure heights suggest depth.'],
  locationAlternatives:[[['athens'],['greece']],[['orvieto'],['italy']]],notes:['White highlights are an optional parenthetical detail in the identification line.','Page 25 labels the work Archaic, but page 26 correctly identifies it as Early Classical.','Niobid Painter is a conventional name for an otherwise anonymous painter.','The vessel was made in Athens and found in Italy; either correctly paired location is accepted.']
 }),
 make(34,'Doryphoros','Marble copy of a bronze original',['marble','bronze'],'Original: 450–440 BCE',[[-450,-440]],'Pompeii, Italy',[['pompeii','pompei'],['italy']],'Greek','Classical',{
  sourceDocument:'2 GREEK ART.pdf',sources:[30,33],views:['Spear bearer'],artist:'Polykleitos',artistKnown:true,artistAliases:['polykleitos','polyclitus','polycleitus','polykleitus'],periodTerms:['classical'],
  nameAliases:['doryphoros spear bearer','spear bearer','doryphorus'],function:'A model of ideal male proportions.',visual:'A nude male standing in balanced contrapposto, with a supporting tree trunk beside the leg.',
  cue:'The surviving copy is MARBLE; the Greek original was BRONZE.',goTo:'Polykleitos developed a canon of ideal proportions.',facts:['The figure originally carried a spear.','The marble copy was found in a Pompeii gymnasium.'],notes:['The listed date belongs to the Greek original, not the later Roman marble copy.']
 }),
 make(35,'Acropolis','Marble',['marble'],'c. 447–410 BCE',[[-447,-410]],'Athens, Greece',[['athens'],['greece']],'Greek','Classical',{
  sourceDocument:'2 GREEK ART.pdf',sources:[40,41,42,44,50,51,52,53,54],views:['Acropolis','Parthenon','Helios, horses, and Dionysus','Temple of Athena Nike','Nike adjusting her sandal','Plaque of the Ergastines','Site plan (study only)'],
  artist:'Iktinos and Kallikrates',artistKnown:true,artistAliases:['iktinos and kallikrates','ictinus and callicrates','iktinos','kallikrates','ictinus','callicrates','phidias','pheidias'],periodTerms:['classical'],nameAliases:['athenian acropolis','acropolis of athens','athens acropolis'],patron:'Pericles and the Athenian state',
  function:'A civic and religious complex honoring Athena and Athenian power.',visual:'A hilltop complex with marble temples and relief sculpture.',cue:'Every assigned Acropolis view: MARBLE.',goTo:'Athena was the patron goddess of Athens.',facts:['Iktinos and Kallikrates designed the Parthenon.','Kallikrates designed the Temple of Athena Nike; Phidias supervised sculpture.','The Ergastines appear in the Panathenaic procession frieze.'],
  notes:['The views belong to the assigned Acropolis group; answer “Acropolis” for the group title.','Page 50’s Hegeso heading is a copy-and-paste error; its images show the Temple of Athena Nike and Nike adjusting her sandal.','“Iktinos and Kallikrates” is the main identification attribution; the associated sculptor Phidias is also accepted in typed location/artist answers.']
 }),
 make(36,'Grave Stele of Hegeso','Marble and paint',['marble',['paint','painted','pigment']],'c. 410 BCE',[[-410,-410]],'Athens, Greece',[['athens','kerameikos'],['greece']],'Greek','Classical',{
  sourceDocument:'2 GREEK ART.pdf',sources:[60,61,62],views:['Grave stele'],artist:'Kallimachos',artistKnown:true,artistAliases:['kallimachos','callimachus'],periodTerms:['classical'],nameAliases:['grave stele of hegeso attributed to kallimachos','stele of hegeso','hegeso stele'],patron:'Hegeso’s family',
  function:'A grave marker commemorating Hegeso.',visual:'A seated woman studies jewelry offered by a standing maidservant.',cue:'MARBLE + PAINT; the jewelry was painted.',goTo:'The inscription names Hegeso and her father.',facts:['The scene is private and domestic.'],notes:['The sculptor is attributed to Kallimachos, rather than securely signed.']
 }),
 make(37,'Winged Victory of Samothrace','Marble',['marble'],'c. 190 BCE',[[-190,-190]],'Samothrace, Greece',[['samothrace','samothraki'],['greece']],'Greek','Hellenistic',{
  sourceDocument:'2 GREEK ART.pdf',sources:[68,70],views:['Winged Victory'],periodTerms:['hellenistic'],nameAliases:['winged nike of samothrace','nike of samothrace','winged victory nike of samothrace'],
  function:'A votive monument associated with naval victory.',visual:'A winged goddess strides onto a ship-shaped base, with windblown wet drapery.',cue:'Marble looks like cloth caught in the wind.',goTo:'Nike is the goddess of victory.',facts:['The statue was found in the Sanctuary of the Great Gods.']
 }),
 make(38,'Great Altar of Zeus and Athena at Pergamon','Marble',['marble'],'c. 175 BCE',[[-175,-175]],'Pergamon, Turkey',[['pergamon','pergamum','bergama'],['turkey','turkiye']],'Greek','Hellenistic',{
  sourceDocument:'2 GREEK ART.pdf',sources:[85,86,88,89,91,92],views:['Altar reconstruction','Athena frieze'],periodTerms:['hellenistic'],nameAliases:['great altar of zeus and athena','altar of zeus and athena at pergamon','pergamon altar','great altar at pergamon'],
  function:'A monumental religious altar celebrating divine and royal victory.',visual:'A broad stairway and Ionic colonnade above a dramatic high-relief frieze.',cue:'MARBLE architecture and MARBLE sculpture.',goTo:'The frieze depicts a battle of gods and giants.',facts:['Athena defeats Alcyoneus while Nike crowns her.','The original site is in modern Turkey; the reconstructed altar is in Berlin.']
 }),
 make(39,'House of the Vettii','Cut stone and fresco',[
  ['cut','carved'],['stone','limestone','tufa'],['fresco']
 ],'Second century BCE; rebuilt 62–79 CE',[[-200,-101],[62,79]],'Pompeii, Italy',[['pompeii','pompei'],['italy']],'Roman','Imperial',{
  sourceDocument:'2.4 ROMAN ART.pdf',sources:[12,15,16,17,18],links:[{title:'College Board image set: material identification',url:cb}],views:['Atrium','Wall painting','Peristyle'],periodTerms:['imperial','empire'],
  nameAliases:['the house of the vettii','house of vettii'],patron:'Aulus Vettius Conviva and Aulus Vettius Restitutus',function:'A wealthy private home used to receive clients and display status.',visual:'An atrium with an impluvium, a peristyle garden, and richly painted rooms.',
  cue:'CUT STONE house + FRESCO walls.',goTo:'The owners were wealthy freedmen.',facts:['The impluvium collected rainwater.','The painted decoration uses the Fourth Style.'],materialAllowed:['marble','pigment','paint'],notes:['The slides omit the material identification; “cut stone and fresco” follows the AP image set.','Either an original-construction year in the second century BCE or a rebuilding year from 62–79 CE is accepted.']
 }),
 make(40,'Alexander Mosaic','Mosaic',['mosaic'],'c. 100 BCE',[[-100,-100]],'House of the Faun, Pompeii, Italy',[['pompeii','pompei'],['italy']],'Roman','Republican',{
  sourceDocument:'2.4 ROMAN ART.pdf',sources:[19,20,21],views:['Battle mosaic'],periodTerms:['republican','republic'],nameAliases:['alexander mosaic from the house of faun pompeii','alexander mosaic from the house of the faun','alexander mosaic battle of issus','battle of issus'],
  function:'A prestigious floor decoration in a private house.',visual:'Alexander advances from the left toward Darius amid a crowded cavalry battle.',cue:'Small tesserae form a MOSAIC.',goTo:'Alexander faces Darius III at the Battle of Issus.',facts:['It probably copies an earlier Greek painting.'],materialAllowed:['stone','marble','glass'],notes:['Page 20’s 310 BCE refers to the lost Greek painting. The Roman mosaic dates to about 100 BCE.']
 }),
 make(41,'Seated Boxer','Bronze (some copper)',['bronze'],'c. 100 BCE',[[-100,-100]],'Rome, Italy',[['rome','quirinal'],['italy']],'Greek','Hellenistic',{
  sourceDocument:'2 GREEK ART.pdf',sources:[75,77,78,80],views:['Boxer','Head detail'],periodTerms:['hellenistic'],nameAliases:['boxer at rest','the seated boxer'],
  function:'A sculpture evoking the experience and exhaustion of an athlete.',visual:'A battered seated boxer turns his head; his hands wear boxing thongs.',cue:'BRONZE; copper marks the wounds.',goTo:'Copper marks blood on the face and hands.',facts:['The boxer has cauliflower ears and a broken nose.','The sculpture was found in Rome.'],materialAllowed:['copper'],notes:['The main material answer is bronze. Copper is the parenthetical detail used for the wounds.']
 }),
 make(42,'Head of a Roman Patrician','Marble',['marble'],'c. 75–50 BCE',[[-75,-50]],'Otricoli, Italy',[['otricoli'],['italy']],'Roman','Republican',{
  sourceDocument:'2.4 ROMAN ART.pdf',sources:[24,25],views:['Patrician head'],periodTerms:['republican','republic'],nameAliases:['roman patrician','head of roman patrician','roman patrician head'],
  function:'A portrait displaying age, experience, and status.',visual:'An elderly male head with deep wrinkles and a stern expression.',cue:'Wrinkles carved in MARBLE.',goTo:'Verism emphasizes individualized, aged facial features.',facts:['Age could signify wisdom and authority.']
 }),
 make(43,'Augustus of Prima Porta','Marble',['marble'],'Early first century CE; c. 20 CE',[[1,50]],'Prima Porta, Rome, Italy',[['prima porta','primaporta','rome'],['italy']],'Roman','Imperial',{
  sourceDocument:'2.4 ROMAN ART.pdf',sources:[29,30,31,38],views:['Augustus','Breastplate detail'],periodTerms:['imperial','empire'],nameAliases:['augustus of primaporta','augustus prima porta','augustus of prima porta italy'],patron:'Imperial commission depicting Augustus',
  function:'Imperial propaganda presenting an ideal ruler with divine ancestry.',visual:'An idealized emperor in an orator’s pose, wearing a decorated breastplate; Cupid rides a dolphin by his leg.',cue:'The surviving statue is MARBLE.',goTo:'Cupid connects Augustus with Venus.',facts:['The pose borrows from the Doryphoros.'],materialAllowed:['bronze','paint','painted'],notes:['The shown marble copy belongs to the early first century CE; the slide’s c. 20 BCE refers to a bronze original. A year from 1–50 CE is accepted for “early first century.”']
 }),
 make(44,'Colosseum','Stone and concrete',['stone','concrete'],'70–80 CE',[[70,80]],'Rome, Italy',[['rome'],['italy']],'Roman','Imperial',{
  sourceDocument:'2.4 ROMAN ART.pdf',sources:[40,41,51],views:['Exterior','Interior','Aerial view'],periodTerms:['imperial','empire'],nameAliases:['flavian amphitheater','flavian amphitheatre','colosseum flavian amphitheater','the colosseum'],patron:'Vespasian and Titus',
  function:'An amphitheater for public spectacles.',visual:'An oval arena surrounded by tiered arcades and seating.',cue:'STONE exterior + CONCRETE vaults.',goTo:'Arches and vaults support the enormous seating structure.',facts:['A velarium shaded spectators.','The hypogeum lay below the arena.'],materialAllowed:['travertine','tufa','marble'],notes:['Identification slides give 70–80 CE; page 51 gives 72–80 CE. Both fall within the accepted identification range.']
 }),
 make(45,'Forum of Trajan','Brick and concrete; marble column',['brick','concrete','marble'],'Forum and markets: 106–112 CE; column: 112 or 113 CE',[[106,112],[113,113]],'Rome, Italy',[['rome'],['italy']],'Roman','Imperial',{
  sourceDocument:'2.4 ROMAN ART.pdf',sources:[52,53,54,55,57,58,60,61],links:[{title:'College Board image set: column completed 113 CE',url:cb}],views:['Forum reconstruction','Basilica Ulpia reconstruction','Column of Trajan','Column relief','Markets exterior','Markets interior','Ground plan (study only)'],
  artist:'Apollodorus of Damascus',artistKnown:true,artistAliases:['apollodorus of damascus','apollodorus'],periodTerms:['imperial','empire'],nameAliases:['trajan forum','trajans forum','forum and markets of trajan'],patron:'Emperor Trajan',
  function:'A civic complex commemorating Trajan’s military victories.',visual:'A large forum with a basilica, markets, and a spiral relief column.',cue:'BRICK + CONCRETE architecture; MARBLE column.',goTo:'The column narrates the Dacian campaigns.',facts:['The Basilica Ulpia hosted law courts.','Trajan’s ashes were placed at the column’s base.'],notes:['Page 58 dates the column to 112 CE; College Board gives completion in 113 CE. Both are accepted.','All pictured parts use the full assigned material line.']
 }),
 make(46,'Pantheon','Concrete with stone facing',['concrete',['stone facing','stone faced','faced with stone','stone']],'118–125 CE',[[118,125]],'Rome, Italy',[['rome'],['italy']],'Roman','Imperial',{
  sourceDocument:'2.4 ROMAN ART.pdf',sources:[63,64,65,68,72,73,75],views:['Exterior','Interior','Dome and oculus','Section (study only)'],periodTerms:['imperial','empire'],nameAliases:['the pantheon','pantheon rome'],patron:'Emperor Hadrian',
  function:'A monumental Roman temple, later converted into a church.',visual:'A columned portico leads into a circular domed interior with a central oculus.',cue:'CONCRETE structure + STONE facing.',goTo:'The oculus admits light at the dome’s center.',facts:['Coffers reduce the dome’s weight.','The interior height equals its diameter.'],materialAllowed:['marble','granite']
 }),
 make(47,'Ludovisi Battle Sarcophagus','Marble',['marble'],'c. 250 CE',[[250,250]],'Rome, Italy',[['rome'],['italy']],'Roman','Late Imperial',{
  sourceDocument:'2.4 ROMAN ART.pdf',sources:[76,77,78],views:['Battle sarcophagus'],periodTerms:['late imperial','late empire'],nameAliases:['ludovisi sarcophagus','ludovisi battle sarcophagus rome'],
  function:'A wealthy Roman’s funerary container.',visual:'A densely packed battle relief with a commanding mounted figure at the top center.',cue:'A single MARBLE sarcophagus with deeply carved figures.',goTo:'The crowded relief depicts Romans defeating barbarians.',facts:['Horror vacui describes the crowded composition.']
 })
];
export const CLASSICAL_RECOMMENDATIONS={
 26:{field:'location',answer:'Athens, Greece'},27:{field:'date',answer:'530 BCE'},28:{field:'date',answer:'530 BCE'},
 29:{field:'culture',answer:'Etruscan'},30:{field:'culture',answer:'Persian'},31:{field:'culture',answer:'Etruscan'},32:{field:'culture',answer:'Etruscan'},
 33:{field:'date',answer:'450 BCE'},34:{field:'date',answer:'450 BCE'},35:{field:'location',answer:'Athens, Greece'},36:{field:'location',answer:'Athens, Greece'},
 37:{field:'location',answer:'Samothrace, Greece'},38:{field:'location',answer:'Pergamon, Turkey'},39:{field:'location',answer:'Pompeii, Italy'},
 40:{field:'date',answer:'100 BCE'},41:{field:'date',answer:'100 BCE'},42:{field:'date',answer:'50 BCE'},
 43:{field:'location',answer:'Rome, Italy'},44:{field:'location',answer:'Rome, Italy'},45:{field:'location',answer:'Rome, Italy'},46:{field:'location',answer:'Rome, Italy'},47:{field:'location',answer:'Rome, Italy'}
};
export const CLASSICAL_VOCAB=[
 ['Contrapposto','A standing pose that shifts weight onto one leg, tilting hips and shoulders.','Doryphoros · 34'],
 ['Archaic smile','A slight smile that gives early Greek figures an appearance of life.','Kouros, Kore · 27, 28'],
 ['Red-figure','Figures remain the red color of clay; the background is painted black.','Niobides Krater · 33'],
 ['Wet drapery','Cloth rendered as if clinging to the body, revealing the form beneath.','Acropolis, Winged Victory · 35, 37'],
 ['Verism','Emphatic realism in portraiture, especially aged facial features.','Roman patrician · 42'],
 ['Fresco','Painting applied to plaster; in true fresco, pigment bonds with wet plaster.','Triclinium, Vettii · 32, 39'],
 ['Tesserae','Small pieces arranged to form a mosaic.','Alexander Mosaic · 40'],
 ['Oculus','A circular opening at the top of a dome.','Pantheon · 46'],
 ['Coffer','A recessed ceiling panel.','Pantheon · 46'],
 ['Horror vacui','Filling a surface densely, leaving little empty space.','Ludovisi · 47'],
 ['Stoa','A covered walkway with columns along one side.','Athenian Agora · 26'],
 ['Impluvium','A basin that collects rainwater in a Roman atrium.','House of the Vettii · 39']
];
export const CLASSICAL_CONFUSIONS=[
 {title:'Original and copy',items:['34 · Doryphoros = marble COPY of a bronze ORIGINAL; original 450–440 BCE.','43 · Augustus = marble; early first century CE. The bronze original was earlier.']},
 {title:'Marble and paint',items:['27 · Kouros and 28 · Kore = marble with paint; both 530 BCE.','36 · Hegeso = marble AND paint.','35 · Acropolis, 37 · Winged Victory, 38 · Great Altar = marble.']},
 {title:'Roman buildings',items:['39 · Vettii = cut stone + fresco.','44 · Colosseum = stone + concrete.','45 · Trajan = brick + concrete; marble column.','46 · Pantheon = concrete with stone facing.']},
 {title:'Etruscan materials',items:['29 · Spouses = terra cotta.','31 · Minerva = wood, mud brick or tufa; Apollo = terra cotta.','32 · Triclinium = tufa + fresco.']},
 {title:'The two athletes',items:['34 · Doryphoros = idealized Classical proportions; marble copy of bronze.','41 · Boxer = battered Hellenistic athlete; bronze with copper.']}
];
