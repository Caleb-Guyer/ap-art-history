// Identification facts and images come only from the official College Board CED.
export const RENAISSANCE_SOURCE='https://apcentral.collegeboard.org/media/pdf/ap-art-history-course-and-exam-description.pdf';
export const RENAISSANCE_IDS=[66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,82,83];
const make=(id,name,shortName,material,parts,date,ranges,artist,aliases,page,views,extra={})=>({
 id,name,shortName,material,materialParts:parts.map(p=>Array.isArray(p)?p:[p]),materialLabels:parts.map(p=>Array.isArray(p)?p[0]:p),
 date,dateRanges:ranges,dateNumbers:ranges.map(r=>r.map(Math.abs)),sortDate:-ranges[0][0],
 artist,artistKnown:true,artistAliases:aliases,location:'',locationTerms:[],culture:'',period:'',omittedFields:['culture'],
 nameAliases:[],patron:'',function:'',facts:[],goTo:artist,
 sourceDocument:'College Board AP Art History Course and Exam Description',sourceUrl:RENAISSANCE_SOURCE,sources:[page],
 links:[{title:'Official College Board curriculum',url:RENAISSANCE_SOURCE}],notes:[],
 images:views.map((label,i)=>({src:`images/work-${id}-${i+1}.jpg`,label,quiz:true})),...extra
});
export const RENAISSANCE_WORKS=[
 make(66,'Annunciation Triptych (Merode Altarpiece)','Annunciation Triptych','Oil on wood',[
  ['oil','oil paint'],['wood','wooden panel','panel']
 ],'1427–1432 CE',[[1427,1432]],'Workshop of Robert Campin',['robert campin','campin','workshop of campin','robert campin workshop'],118,['Annunciation Triptych'],{
  nameAliases:['annunciation triptych','merode altarpiece','the merode altarpiece','merode triptych'],
  visual:'A three-panel painting with an Annunciation scene in the center and a workshop at the right.',cue:'OIL on WOOD.',
  notes:['College Board attributes the work to the workshop of Robert Campin.']
 }),
 make(67,'Pazzi Chapel','Pazzi Chapel','Masonry',['masonry'],'c. 1429–1461 CE',[[1429,1461]],'Filippo Brunelleschi',['brunelleschi','filippo brunelleschi'],118,['Exterior','Interior'],{
  location:'Basilica di Santa Croce, Florence, Italy',locationTerms:[['florence','firenze','santa croce'],['italy']],
  nameAliases:['cappella pazzi'],visual:'A small chapel beside a courtyard, with a geometrically organized interior and round medallions.',cue:'MASONRY.',
  notes:['The listed location is Basilica di Santa Croce, Florence, Italy. Brunelleschi is the architect.']
 }),
 make(68,'The Arnolfini Portrait','Arnolfini Portrait','Oil on wood',[['oil','oil paint'],['wood','wooden panel','panel']],
  'c. 1434 CE',[[1434,1434]],'Jan van Eyck',['van eyck','jan van eyck'],119,['The Arnolfini Portrait'],{
  nameAliases:['arnolfini portrait','the arnolfini portrait','arnolfini wedding portrait','arnolfini double portrait'],
  visual:'Two figures stand in a room with a small dog, a chandelier, and a round mirror.',cue:'OIL on WOOD.'
 }),
 make(69,'David','David','Bronze',['bronze'],'c. 1440–1460 CE',[[1440,1460]],'Donatello',['donatello'],119,['David'],{
  nameAliases:['david by donatello','donatello david','donatellos david'],
  visual:'A standing nude bronze figure wears a hat and boots and holds a sword.',cue:'BRONZE.'
 }),
 make(70,'Palazzo Rucellai','Palazzo Rucellai','Stone and masonry',['stone','masonry'],'c. 1450 CE',[[1450,1450]],
  'Leon Battista Alberti',['alberti','leon battista alberti'],119,['Palazzo Rucellai'],{
  location:'Florence, Italy',locationTerms:[['florence','firenze'],['italy']],nameAliases:['rucellai palace','palazzo rucellai florence'],
  visual:'A stone street facade with repeated windows and horizontal divisions.',cue:'STONE + MASONRY.',
  notes:['College Board names Leon Battista Alberti as the architect.']
 }),
 make(71,'Madonna and Child with Two Angels','Madonna and Child with Two Angels','Tempera on wood',[
  'tempera',['wood','wooden panel','panel']
 ],'c. 1465 CE',[[1465,1465]],'Fra Filippo Lippi',['lippi','filippo lippi','fra filippo lippi'],119,['Madonna and Child with Two Angels'],{
  nameAliases:['madonna and child with 2 angels','madonna and child with two angels by lippi'],
  visual:'A woman with joined hands faces a child supported by angels, with a landscape behind them.',cue:'TEMPERA on WOOD.'
 }),
 make(72,'Birth of Venus','Birth of Venus','Tempera on canvas',['tempera','canvas'],'c. 1484–1486 CE',[[1484,1486]],
  'Sandro Botticelli',['botticelli','sandro botticelli'],120,['Birth of Venus'],{
  nameAliases:['the birth of venus'],visual:'Venus stands on a shell between figures blowing from the left and a clothed figure at the right.',cue:'TEMPERA on CANVAS.'
 }),
 make(73,'Last Supper','Last Supper','Oil and tempera',[['oil','oil paint'],'tempera'],'c. 1494–1498 CE',[[1494,1498]],
  'Leonardo da Vinci',['leonardo','da vinci','leonardo da vinci'],120,['Last Supper'],{
  nameAliases:['the last supper','last supper by leonardo da vinci','leonardos last supper'],
  visual:'Christ sits at the center of a long table, surrounded by groups of figures.',cue:'OIL + TEMPERA.',
  notes:['The official identification medium is oil and tempera; both components are required.']
 }),
 make(74,'Adam and Eve','Adam and Eve','Engraving',[['engraving','engraved print','engraved']],
  '1504 CE',[[1504,1504]],'Albrecht Dürer',['durer','albrecht durer'],120,['Adam and Eve'],{
  nameAliases:['adam and eve by durer','durers adam and eve'],
  visual:'Two nude figures stand beside a tree in a densely detailed black-and-white print.',cue:'ENGRAVING.'
 }),
 make(75,'Sistine Chapel ceiling and altar wall frescoes','Sistine Chapel','Fresco',['fresco'],
  'Ceiling frescoes: c. 1508–1512 CE; altar frescoes: c. 1536–1541 CE',[[1508,1512],[1536,1541]],
  'Michelangelo',['michelangelo'],121,['Chapel interior','The Delphic Sibyl','The Flood','Chapel exterior'],{
  location:'Vatican City, Italy',locationTerms:[['vatican','vatican city']],
  nameAliases:['sistine chapel','sistine chapel ceiling','sistine chapel frescoes','ceiling of the sistine chapel','delphic sibyl','the delphic sibyl','the flood'],
  visual:'A chapel with painted walls and ceiling, including the Delphic Sibyl and the Flood.',cue:'FRESCO.',
  notes:['Ceiling and altar wall have separate date ranges. Years in the gap do not receive credit. The location follows the College Board identification wording: Vatican City, Italy.']
 }),
 make(76,'School of Athens','School of Athens','Fresco',['fresco'],'1509–1511 CE',[[1509,1511]],
  'Raphael',['raphael'],122,['School of Athens'],{
  nameAliases:['the school of athens'],visual:'Groups of figures gather on steps beneath large classical arches.',cue:'FRESCO.'
 }),
 make(77,'Isenheim altarpiece','Isenheim Altarpiece','Oil on wood',[['oil','oil paint'],['wood','wooden panel','panel']],
  'c. 1512–1516 CE',[[1512,1516]],'Matthias Grünewald',['grunewald','matthias grunewald','mathias grunewald'],122,['Altarpiece, closed','Altarpiece, open'],{
  nameAliases:['isenheim altarpiece','the isenheim altarpiece','isenheim altar'],
  visual:'A multi-panel altarpiece, shown closed with a Crucifixion and open with brightly colored painted scenes.',cue:'OIL on WOOD.'
 }),
 make(78,'Entombment of Christ','Entombment of Christ','Oil on wood',[['oil','oil paint'],['wood','wooden panel','panel']],
  '1525–1528 CE',[[1525,1528]],'Jacopo da Pontormo',['pontormo','jacopo da pontormo','jacopo pontormo'],123,['Entombment of Christ'],{
  nameAliases:['the entombment of christ','entombment','entombment of christ by pontormo'],
  visual:'A closely packed group in pale, bright clothing supports the body of Christ.',cue:'OIL on WOOD.'
 }),
 make(79,'Allegory of Law and Grace','Allegory of Law and Grace','Woodcut and letterpress',['woodcut','letterpress'],
  'c. 1530 CE',[[1530,1530]],'Lucas Cranach the Elder',['cranach','lucas cranach','lucas cranach the elder'],123,['Allegory of Law and Grace'],{
  nameAliases:['law and grace','allegory of law and gospel','law and gospel'],
  visual:'A black-and-white print divided by a central tree, with figures, scenes, and printed text.',cue:'WOODCUT + LETTERPRESS.'
 }),
 make(80,'Venus of Urbino','Venus of Urbino','Oil on canvas',[['oil','oil paint'],'canvas'],'c. 1538 CE',[[1538,1538]],
  'Titian',['titian'],123,['Venus of Urbino'],{
  nameAliases:['the venus of urbino'],visual:'A reclining nude holds flowers, with a small dog at her feet and two figures in the background.',cue:'OIL on CANVAS.'
 }),
 make(82,'Il Gesù, including Triumph of the Name of Jesus ceiling fresco','Il Gesù','Brick, marble, fresco, and stucco',[
  'brick','marble','fresco','stucco'
 ],'Church: sixteenth century CE; facade: 1568–1584 CE; fresco and stucco figures: 1676–1679 CE',[[1501,1600],[1568,1584],[1676,1679]],
  'Giacomo da Vignola; Giacomo della Porta; Giovanni Battista Gaulli',[
   'vignola','giacomo da vignola','della porta','giacomo della porta','gaulli','giovanni battista gaulli','vignola della porta gaulli'
  ],124,['Church facade','Triumph of the Name of Jesus','Church interior'],{
  artistShort:'Vignola, della Porta, and Gaulli',location:'Rome, Italy',locationTerms:[['rome','roma'],['italy']],
  nameAliases:['il gesu','gesu','il gesu including triumph of the name of jesus','triumph of the name of jesus','triumph of the name of jesus ceiling fresco'],
  visual:'A church facade and interior with a densely painted ceiling that opens toward bright light.',cue:'BRICK + MARBLE + FRESCO + STUCCO.',
  notes:['The official attribution assigns the plan to Giacomo da Vignola, the facade to Giacomo della Porta, and the ceiling fresco to Giovanni Battista Gaulli. Any one named maker is accepted for the extra detail.','The complete assigned group includes the later ceiling fresco and stucco figures. Church, facade, and fresco dates remain separately identified.','For year practice, the sixteenth century is interpreted as 1501–1600 CE.']
 }),
 make(83,'Hunters in the Snow','Hunters in the Snow','Oil on wood',[['oil','oil paint'],['wood','wooden panel','panel']],
  '1565 CE',[[1565,1565]],'Pieter Bruegel the Elder',['bruegel','pieter bruegel','pieter bruegel the elder'],124,['Hunters in the Snow'],{
  nameAliases:['the hunters in the snow'],visual:'Hunters and dogs descend a snowy hill above a village and frozen ponds.',cue:'OIL on WOOD.'
 })
];
export const RENAISSANCE_RECOMMENDATIONS={
 66:{field:'date',answer:'1430 CE'},67:{field:'date',answer:'1430 CE'},68:{field:'date',answer:'1434 CE'},
 69:{field:'date',answer:'1450 CE'},70:{field:'date',answer:'1450 CE'},71:{field:'date',answer:'1465 CE'},
 72:{field:'date',answer:'1485 CE'},73:{field:'date',answer:'1495 CE'},74:{field:'date',answer:'1504 CE'},
 75:{field:'date',answer:'1510 CE'},76:{field:'date',answer:'1510 CE'},77:{field:'date',answer:'1515 CE'},
 78:{field:'date',answer:'1525 CE'},79:{field:'date',answer:'1530 CE'},80:{field:'date',answer:'1538 CE'},
 82:{field:'location',answer:'Rome, Italy'},83:{field:'date',answer:'1565 CE'}
};
export const RENAISSANCE_CONFUSIONS=[
 {title:'Wood or canvas?',items:['66 · Annunciation Triptych, 68 · Arnolfini, 77 · Isenheim, 78 · Entombment, and 83 · Hunters: OIL on WOOD.','71 · Madonna and Child: TEMPERA on WOOD.','72 · Birth of Venus: TEMPERA on CANVAS.','80 · Venus of Urbino: OIL on CANVAS.']},
 {title:'Wall paintings',items:['73 · Last Supper: OIL and TEMPERA.','75 · Sistine Chapel and 76 · School of Athens: FRESCO.','82 · Il Gesù group: BRICK, MARBLE, FRESCO, STUCCO.']},
 {title:'Sculpture, architecture, and prints',items:['69 · David: BRONZE.','67 · Pazzi Chapel: MASONRY.','70 · Palazzo Rucellai: STONE and MASONRY.','74 · Adam and Eve: ENGRAVING.','79 · Allegory of Law and Grace: WOODCUT and LETTERPRESS.']}
];
// Review terms repeat the official identification lines without outside definitions.
export const RENAISSANCE_VOCAB=[
 ['Oil on wood','College Board medium for works 66, 68, 77, 78, and 83.','Annunciation Triptych; Arnolfini; Isenheim; Entombment; Hunters'],
 ['Tempera','College Board lists tempera on wood for 71, tempera on canvas for 72, and oil and tempera for 73.','Madonna and Child; Birth of Venus; Last Supper'],
 ['Fresco','College Board medium for 75 and 76, and one material in the complete group for 82.','Sistine Chapel; School of Athens; Il Gesù'],
 ['Engraving','College Board medium for work 74.','Adam and Eve'],
 ['Woodcut and letterpress','College Board medium for work 79.','Allegory of Law and Grace']
];
