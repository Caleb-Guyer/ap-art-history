import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {ALL_WORKS,collectionWorks,collectionForWork,shortDetail,RECOMMENDATIONS} from '../dist/data.js';
import {RENAISSANCE_SOURCE} from '../dist/renaissance-data.js';
import {getWork,studyFields,fieldLabel,fieldAvailable,quizFactFields,answerFor,checkAnswer,makeChoices,makeStudyQuestions,makeQuiz,finishQuiz,quizScore,sanitizeStore,defaultStore,switchCollection,recordRecall} from '../dist/engine.js';
const ids=[66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,82,83],works=collectionWorks('renaissance');

test('Renaissance contains the confirmed 17 works and preserves the earlier sets',()=>{
 assert.deepEqual(works.map(w=>w.id),ids);assert.equal(ALL_WORKS.length,68);assert.equal(getWork(81),undefined);
 assert.deepEqual(['12-25','26-47','late-antique-gothic'].map(key=>collectionWorks(key).length),[14,22,15]);
 for(const id of ids)assert.equal(collectionForWork(id),'renaissance');
});

test('Renaissance images are the 24 assigned College Board images with verified provenance',async()=>{
 const manifest=JSON.parse(await readFile(new URL('../dist/images/sources.json',import.meta.url),'utf8'));
 const images=manifest.images.filter(im=>ids.includes(im.work));assert.equal(images.length,24);
 for(const work of works){assert.equal(work.sourceUrl,RENAISSANCE_SOURCE);assert.ok(work.links.every(link=>link.url===RENAISSANCE_SOURCE));}
 for(const im of images){assert.equal(im.sourceUrl,RENAISSANCE_SOURCE);assert.ok(im.pdfPage>=118&&im.pdfPage<=124);assert.ok(getWork(im.work).sources.includes(im.pdfPage));const bytes=await readFile(new URL(`../dist/${im.file}`,import.meta.url));assert.equal(createHash('sha256').update(bytes).digest('hex'),im.sha256);}
 assert.deepEqual(getWork(75).images.map(im=>im.label),['Chapel interior','The Delphic Sibyl','The Flood','Chapel exterior']);
 assert.deepEqual(getWork(77).images.map(im=>im.label),['Altarpiece, closed','Altarpiece, open']);
});

test('official titles, complete media, and recommended extra details receive credit',()=>{
 for(const work of works)for(const field of [...studyFields('all',work),'recommendation'])assert.equal(checkAnswer(work,field,shortDetail(answerFor(work,field))).status,'correct',`${work.id} ${field}`);
 for(const [id,value] of [[66,'Merode Altarpiece'],[68,'Arnolfini Portrait'],[75,'Sistine Chapel'],[82,'Il Gesu']])assert.equal(checkAnswer(getWork(id),'name',value).status,'correct');
 for(const [id,value] of [[66,'oil'],[67,'stone'],[70,'stone'],[71,'tempera on canvas'],[72,'oil on canvas'],[73,'fresco'],[73,'tempera'],[74,'woodcut'],[78,'oil on canvas'],[79,'woodcut'],[80,'oil on wood'],[82,'brick marble fresco']])assert.notEqual(checkAnswer(getWork(id),'material',value).status,'correct',`${id}: ${value}`);
 assert.equal(checkAnswer(getWork(73),'material','oil and tempera').status,'correct');assert.equal(checkAnswer(getWork(79),'material','letterpress and woodcut').status,'correct');
});

test('artist-only questions accept the official maker and never accept an arbitrary place',()=>{
 for(const work of works){assert.ok(work.artistKnown);assert.ok(fieldAvailable(work,'location'));assert.ok(!fieldAvailable(work,'culture'));assert.ok(!quizFactFields(work).includes('culture'));assert.ok(!studyFields('all',work).includes('artist'));
  for(const artist of [work.artist,...work.artistAliases])assert.equal(checkAnswer(work,'location',artist).status,'correct',`${work.id}: ${artist}`);
  if(!work.location){assert.equal(fieldLabel(work,'location'),'Artist');assert.equal(answerFor(work,'location'),work.artist);assert.notEqual(checkAnswer(work,'location','somewhere unknown').status,'correct');}
 }
 for(const id of [67,70,75,82])assert.equal(fieldLabel(getWork(id),'location'),'Location or artist');
 for(const value of ['Vignola','della Porta','Gaulli','Rome, Italy','Vignola, della Porta, and Gaulli'])assert.equal(checkAnswer(getWork(82),'location',value).status,'correct');
 for(const work of works)for(const field of [...studyFields('all',work),'recommendation'])for(let n=0;n<3;n++){
  const choice=makeChoices(work,field);assert.equal(choice.options.length,4);assert.ok(choice.options.every(option=>option.trim()));assert.equal(new Set(choice.options.map(shortDetail)).size,4);
  const correct=choice.options.filter(option=>checkAnswer(work,field,shortDetail(option)).status==='correct');assert.equal(correct.length,field==='location'&&work.location?2:1,`${work.id} ${field}`);
 }
});

test('Renaissance dates accept individual in-range years and preserve separate construction phases',()=>{
 for(const work of works)for(const [lo,hi] of work.dateRanges)for(const year of [lo,hi,Math.trunc((lo+hi)/2)]){
  assert.equal(checkAnswer(work,'date',String(year)).status,'correct',`${work.id}: ${year}`);assert.equal(checkAnswer(work,'date',`${year} CE`).status,'correct');assert.notEqual(checkAnswer(work,'date',`${year} BCE`).status,'correct');
 }
 for(const [id,year] of [[66,1433],[68,1435],[72,1487],[74,1505],[75,1520],[75,1535],[77,1517],[82,1500],[82,1601],[82,1650],[82,1680],[83,1566]])assert.notEqual(checkAnswer(getWork(id),'date',String(year)).status,'correct',`${id}: ${year}`);
 assert.equal(RECOMMENDATIONS[66].answer,RECOMMENDATIONS[67].answer);assert.equal(RECOMMENDATIONS[69].answer,RECOMMENDATIONS[70].answer);assert.equal(RECOMMENDATIONS[75].answer,RECOMMENDATIONS[76].answer);
});

test('Renaissance study modes and full quizzes survive saving and switching sets',()=>{
 assert.equal(makeStudyQuestions({ids,focus:'all',mode:'choice'}).length,68);assert.equal(makeStudyQuestions({ids,focus:'details',mode:'choice'}).length,34);assert.equal(makeStudyQuestions({ids,focus:'culture',mode:'choice'}).length,0);
 for(const mode of ['type','choice']){
  const questions=makeStudyQuestions({ids,focus:'best_quiz',mode,collection:'renaissance'});assert.equal(questions.length,51);assert.deepEqual(questions.map(q=>q.id),ids.flatMap(id=>[id,id,id]));
  for(let i=0;i<questions.length;i+=3)assert.deepEqual(questions.slice(i,i+3).map(q=>q.field),['name','material','recommendation']);
  const store={...defaultStore(),collection:'renaissance',study:{focus:'best_quiz',mode,questions,queue:questions.map(q=>q.id),index:50,typed:'1565',ratings:{0:true},responses:{0:'Annunciation Triptych'}}};
  recordRecall(store,12,'material',true);store.quiz=makeQuiz({ids,count:17,mode,alternateViews:true,factField:'recommendation',collection:'renaissance'});
  for(const q of store.quiz.questions){const work=getWork(q.id);assert.ok(work.images[q.image].quiz);Object.assign(store.quiz.answers[q.id],{name:work.name,material:work.material,fact:RECOMMENDATIONS[q.id].answer});}
  const clean=sanitizeStore(JSON.parse(JSON.stringify(store)));assert.equal(clean.study.index,50);assert.equal(clean.study.typed,'1565');assert.deepEqual(clean.quiz.answers,store.quiz.answers);
  finishQuiz(clean.quiz);assert.deepEqual(quizScore(clean.quiz),{correct:51,pending:0,total:51});
  switchCollection(clean,'late-antique-gothic');switchCollection(clean,'renaissance');assert.equal(clean.study.questions.length,51);assert.equal(clean.quiz.questions.length,17);assert.equal(clean.stats[12].material.correct,1);
 }
});
