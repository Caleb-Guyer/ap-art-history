import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {ALL_WORKS,collectionWorks,collectionForWork,shortDetail,RECOMMENDATIONS} from '../dist/data.js';
import {MEDIEVAL_SOURCE} from '../dist/medieval-data.js';
import {getWork,studyFields,fieldAvailable,quizFactFields,answerFor,checkAnswer,makeChoices,makeStudyQuestions,makeQuiz,finishQuiz,quizScore,sanitizeStore,defaultStore,switchCollection} from '../dist/engine.js';
import {AudioDeck} from '../dist/audio-player.js';
const ids=[48,49,50,51,52,54,53,55,58,59,60,61,62,63,64],works=collectionWorks('late-antique-gothic');

test('Late Antique–Gothic contains exactly the requested works in the requested order',()=>{
 assert.deepEqual(works.map(w=>w.id),ids);assert.equal(ALL_WORKS.length,67);
 assert.equal(collectionWorks('12-25').length,14);assert.equal(collectionWorks('26-47').length,22);
 for(const id of ids)assert.equal(collectionForWork(id),'late-antique-gothic');
 assert.equal(collectionForWork(25),'12-25');assert.equal(getWork(56),undefined);assert.equal(getWork(57),undefined);
});

test('all new images have official provenance and their verified extracted bytes',async()=>{
 const manifest=JSON.parse(await readFile(new URL('../dist/images/sources.json',import.meta.url),'utf8'));
 const images=manifest.images.filter(im=>ids.includes(im.work));assert.equal(images.length,42);
 for(const work of works){assert.equal(work.sourceUrl,MEDIEVAL_SOURCE);assert.ok(work.links.every(link=>link.url===MEDIEVAL_SOURCE));assert.ok(work.images[0].quiz);}
 for(const im of images){assert.equal(im.sourceUrl,MEDIEVAL_SOURCE);assert.ok(works.find(w=>w.id===im.work).sources.includes(im.pdfPage));const bytes=await readFile(new URL(`../dist/${im.file}`,import.meta.url));assert.equal(createHash('sha256').update(bytes).digest('hex'),im.sha256);}
 for(const id of [49,51,52,60])assert.ok(getWork(id).images.some(im=>/plan/i.test(im.label)&&!im.quiz));
 assert.equal(getWork(61).images[0].label,'Dedication Page with Blanche of Castile and King Louis IX of France');
 assert.deepEqual(getWork(64).images.map(im=>im.label),['Preparation for Passover','Scenes of Liberation','The Plagues of Egypt']);
});

test('all provided facts, concise titles, and recommendations receive credit',()=>{
 for(const work of works)for(const field of [...studyFields('all',work),'recommendation'])assert.equal(checkAnswer(work,field,shortDetail(answerFor(work,field))).status,'correct',`${work.id} ${field}`);
 assert.equal(RECOMMENDATIONS[50].answer,'535 CE');assert.equal(RECOMMENDATIONS[51].answer,'535 CE');assert.equal(RECOMMENDATIONS[52].answer,'535 CE');
 assert.equal(checkAnswer(getWork(63),'recommendation','Giotto').status,'correct');
});

test('essential manuscript materials and multi-part building materials are required',()=>{
 const incomplete=[[48,'tufa and fresco'],[49,'brick and stone'],[50,'tempera gold on purple vellum'],[50,'tempera gold silver on vellum'],[51,'brick marble stone mosaic'],[52,'brick stone mosaic veneer'],[53,'silver gilt and garnets'],[54,'wood'],[55,'pigments gold vellum'],[58,'stone and paint'],[59,'linen'],[60,'limestone'],[61,'tempera gold leaf vellum'],[62,'wood'],[63,'fresco'],[64,'gold leaf vellum']];
 for(const [id,value] of incomplete)assert.notEqual(checkAnswer(getWork(id),'material',value).status,'correct',`${id}: ${value}`);
 for(const work of works)assert.equal(checkAnswer(work,'material',work.material).status,'correct',String(work.id));
 assert.match(shortDetail(getWork(50).material),/silver.*purple vellum/);assert.match(shortDetail(getWork(61).material),/Ink, tempera, and gold leaf on vellum/);
});

test('years are inclusive, eras stay correct, and separate phases do not fill date gaps',()=>{
 for(const work of works)for(const [lo,hi] of work.dateRanges)for(const year of [lo,hi,Math.trunc((lo+hi)/2)]){
  assert.equal(checkAnswer(work,'date',String(year)).status,'correct',`${work.id}: ${year}`);
  assert.equal(checkAnswer(work,'date',`${year} CE`).status,'correct');assert.notEqual(checkAnswer(work,'date',`${year} BCE`).status,'correct');
 }
 for(const [id,year] of [[48,401],[49,433],[50,590],[52,538],[53,590],[54,680],[58,1000],[60,1170],[63,1304],[64,1321]])assert.notEqual(checkAnswer(getWork(id),'date',String(year)).status,'correct',`${id}: ${year}`);
});

test('only provided facts become questions; named makers combine with location',()=>{
 assert.deepEqual(works.filter(w=>w.artistKnown).map(w=>w.id),[52,63]);
 for(const work of works){assert.ok(!studyFields('all',work).includes('artist'));for(const field of work.omittedFields)assert.ok(!quizFactFields(work).includes(field)&&!studyFields('all',work).includes(field));}
 for(const id of [52,63])for(const name of [getWork(id).artist,...getWork(id).artistAliases])assert.equal(checkAnswer(getWork(id),'location',name).status,'correct');
 for(const work of works)for(const field of [...studyFields('all',work),'recommendation'])for(let run=0;run<3;run++){
  const choice=makeChoices(work,field);assert.equal(new Set(choice.options.map(shortDetail)).size,4);
  assert.equal(choice.options.filter(option=>checkAnswer(work,field,shortDetail(option)).status==='correct').length,work.artistKnown&&field==='location'?2:1,`${work.id} ${field}`);
 }
});

test('all study modes and full quizzes cover the new set and preserve saved answers',()=>{
 for(const mode of ['type','choice']){
  const questions=makeStudyQuestions({ids,focus:'best_quiz',mode,collection:'late-antique-gothic'});assert.equal(questions.length,45);
  assert.deepEqual(questions.map(q=>q.id),ids.flatMap(id=>[id,id,id]));assert.deepEqual(questions.slice(0,3).map(q=>q.field),['name','material','recommendation']);
  const store={...defaultStore(),collection:'late-antique-gothic'};store.study={focus:'best_quiz',mode,questions,queue:questions.map(q=>q.id),index:44,typed:'1320 CE',ratings:{0:true},responses:{0:'Catacomb of Priscilla'}};
  store.quiz=makeQuiz({ids,count:15,mode,alternateViews:true,factField:'recommendation',collection:store.collection});
  for(const q of store.quiz.questions){const w=getWork(q.id);assert.ok(w.images[q.image].quiz);Object.assign(store.quiz.answers[q.id],{name:w.name,material:w.material,fact:RECOMMENDATIONS[q.id].answer});}
  const clean=sanitizeStore(JSON.parse(JSON.stringify(store)));assert.equal(clean.study.questions.length,45);assert.equal(clean.study.index,44);assert.equal(clean.study.typed,'1320 CE');assert.deepEqual(clean.quiz.answers,store.quiz.answers);
  finishQuiz(clean.quiz);assert.deepEqual(quizScore(clean.quiz),{correct:45,pending:0,total:45});
  switchCollection(clean,'26-47');switchCollection(clean,'late-antique-gothic');assert.equal(clean.study.index,44);assert.equal(clean.quiz.questions.length,15);
 }
 assert.equal(makeStudyQuestions({ids,focus:'all',mode:'choice'}).length,66);assert.equal(makeStudyQuestions({ids,focus:'details',mode:'choice'}).length,36);
 for(const focus of ['name','material','date','location','culture','recommendation','details','all'])for(const mode of ['type','choice']){const deck=makeStudyQuestions({ids,focus,mode});assert.ok(deck.length);assert.ok(deck.every(q=>fieldAvailable(getWork(q.id),q.field)));}
});

test('audio cycles exactly the 15 selected works without playing automatically',async()=>{
 class Media extends EventTarget{constructor(){super();this.paused=true;this.currentTime=0;this.duration=20;this.playbackRate=1;this.plays=0;}pause(){this.paused=true;}load(){}play(){this.plays++;this.paused=false;return Promise.resolve();}}
 const media=new Media(),pending=[],deck=new AudioDeck({media,works,setTimer:fn=>(pending.push(fn),pending.length),clearTimer:()=>{}});
 assert.equal(media.plays,0);await deck.play();
 for(const id of ids){assert.equal(deck.state.work.id,id);media.dispatchEvent(new Event('ended'));pending.shift()();await Promise.resolve();}
 assert.equal(deck.state.work.id,48);deck.destroy();
});
