import test from 'node:test';
import assert from 'node:assert/strict';
import {collectionWorks,RECOMMENDATIONS,shortDetail} from '../dist/data.js';
import {getWork,answerFor,checkAnswer,makeChoices,choiceIsCorrect,studyFields,makeStudyQuestions,makeQuiz,finishQuiz,quizScore,sanitizeStore,defaultStore,switchCollection,recordRecall,signedDateIntervals} from '../dist/engine.js';
const works=collectionWorks('25-47'),ids=works.map(w=>w.id);
test('new set contains every work from 25 through 47',()=>{assert.deepEqual(ids,Array.from({length:23},(_,i)=>25+i));assert.equal(collectionWorks('12-25').length,14);});
test('every new identification and recommendation is accepted in concise form',()=>{
 for(const work of works)for(const field of [...studyFields('all',work),'recommendation'])assert.equal(checkAnswer(work,field,shortDetail(answerFor(work,field))).status,'correct',`${work.id} ${field}`);
});
test('new choices have four distinct displayed answers and no accepted distractors',()=>{
 for(const work of works)for(const field of [...studyFields('all',work),'recommendation'])for(let run=0;run<4;run++){
  const q=makeChoices(work,field);assert.equal(new Set(q.options.map(shortDetail)).size,4,`${work.id} ${field}`);
  const correct=q.options.filter(x=>checkAnswer(work,field,shortDetail(x)).status==='correct');
  assert.equal(correct.length,work.artistKnown&&field==='location'?2:1,`${work.id} ${field}: ${q.options}`);
  assert.ok(correct.every(x=>choiceIsCorrect(work,field,x)));
 }
});
test('BCE, CE, cross-era and separate construction phases accept inclusive dates',()=>{
 for(const work of works.filter(w=>w.dateRanges))for(const [lo,hi] of signedDateIntervals(work))for(const year of [lo,hi,Math.trunc((lo+hi)/2)].filter(Boolean)){
  assert.equal(checkAnswer(work,'date',`${Math.abs(year)} ${year<0?'B.C.E.':'C.E.'}`).status,'correct',`${work.id} ${year}`);
  assert.equal(checkAnswer(work,'date',Math.abs(year)).status,'correct');
 }
 for(const [id,input] of [[26,'600 BCE–150 CE'],[26,'200 BCE'],[26,'100 CE'],[39,'150 BCE'],[39,'70 CE'],[43,'20 CE'],[44,'75 AD'],[45,'113 CE'],[46,'120'],[47,'250 CE']])assert.equal(checkAnswer(getWork(id),'date',input).status,'correct',`${id}: ${input}`);
 for(const [id,input] of [[26,'151 CE'],[26,'601 BCE'],[26,'0'],[27,'530 CE'],[39,'90 CE'],[39,'100 BCE'],[44,'75 BCE'],[45,'114 CE'],[46,'117 CE'],[46,'126 CE'],[47,'250 BCE']])assert.notEqual(checkAnswer(getWork(id),'date',input).status,'correct',`${id}: ${input}`);
});
test('named makers combine with locations; unknown makers never become questions',()=>{
 for(const work of works.filter(w=>w.artistKnown))for(const artist of [work.artist,...work.artistAliases])assert.equal(checkAnswer(work,'location',artist).status,'correct',`${work.id}: ${artist}`);
 for(const work of works){assert.equal(studyFields('all',work).includes('artist'),false);assert.notEqual(checkAnswer(work,'location','Unknown').status,'correct');}
 assert.notEqual(checkAnswer(getWork(34),'location','not Polykleitos').status,'correct');
});
test('multi-part materials preserve necessary components and alternate temple material',()=>{
 for(const [id,answer] of [[27,'marble'],[28,'marble'],[31,'terra cotta'],[32,'fresco'],[33,'clay'],[34,'marble'],[36,'marble'],[39,'cut stone'],[41,'copper'],[44,'stone'],[45,'brick concrete'],[46,'concrete']])assert.notEqual(checkAnswer(getWork(id),'material',answer).status,'correct',`${id}: ${answer}`);
 for(const answer of ['wood, mud brick and terra cotta','wood, tufa and terra cotta','wood, mud brick or tufa; terra cotta sculpture'])assert.equal(checkAnswer(getWork(31),'material',answer).status,'correct',answer);
});
test('23-work quizzes score all three answers in both modes and survive reload',()=>{
 for(const mode of ['type','choice']){
  const store=defaultStore();store.quiz=makeQuiz({ids,count:23,mode,factField:'recommendation',alternateViews:true});
  for(const q of store.quiz.questions){const w=getWork(q.id);Object.assign(store.quiz.answers[w.id],{name:w.name,material:w.material,fact:RECOMMENDATIONS[w.id].answer});assert.ok(w.images[q.image].quiz);}
  const clean=sanitizeStore(JSON.parse(JSON.stringify(store)));assert.equal(clean.quiz.questions.length,23);assert.deepEqual(clean.quiz.answers,store.quiz.answers);
  finishQuiz(clean.quiz);assert.deepEqual(quizScore(clean.quiz),{correct:69,pending:0,total:69});
 }
});
test('large mixed decks and best-for-quiz cycles retain all new questions',()=>{
 for(const [focus,mode,count] of [['all','choice',115],['details','choice',69],['best_quiz','type',69],['best_quiz','choice',69]]){
  const store=defaultStore(),questions=makeStudyQuestions({ids,focus,mode});store.focus=focus;store.mode=mode;
  store.study={focus,mode,questions,queue:questions.map(q=>q.id),index:count-1,typed:'unfinished answer',ratings:{0:true},responses:{}};
  const clean=sanitizeStore(JSON.parse(JSON.stringify(store)));assert.equal(clean.study.questions.length,count);assert.equal(clean.study.typed,'unfinished answer');assert.equal(clean.study.index,count-1);
 }
});
test('switching collections preserves separate sessions, quizzes, and shared artwork progress',()=>{
 const store=defaultStore();store.study={focus:'material',mode:'type',questions:[{id:47,field:'material'}],queue:[47],index:0,typed:'marble',ratings:{},responses:{}};store.quiz=makeQuiz({ids,count:23});store.quiz.answers[26].name='Agora';recordRecall(store,25,'material',true);
 switchCollection(store,'12-25');assert.equal(store.study,null);assert.equal(store.quiz,null);
 store.study={focus:'material',mode:'type',questions:[{id:12,field:'material'}],queue:[12],index:0,typed:'mud brick',ratings:{},responses:{}};store.quiz=makeQuiz();
 const clean=sanitizeStore(JSON.parse(JSON.stringify(store)));switchCollection(clean,'25-47');assert.equal(clean.study.typed,'marble');assert.equal(clean.quiz.answers[26].name,'Agora');assert.equal(clean.quiz.questions.length,23);assert.equal(clean.stats[25].material.correct,1);
 switchCollection(clean,'12-25');assert.equal(clean.study.typed,'mud brick');assert.equal(clean.quiz.questions.length,14);
 const legacy={version:1,stats:{12:{material:{seen:1,correct:1,streak:1,lastCorrect:true}}},history:[],focus:'material',mode:'type',study:clean.study,quiz:clean.quiz};assert.equal(sanitizeStore(legacy).collection,'12-25');
});

test('shared Lamassu draws its choices from the selected set',()=>{
 const qs=makeStudyQuestions({focus:'name',mode:'choice',ids,collection:'25-47'});
 assert.ok(qs[0].options.every(name=>works.some(w=>w.name===name)));
});

test('parenthetical material details are optional',()=>{assert.equal(checkAnswer(getWork(33),'material','clay, red figure').status,'correct');assert.equal(checkAnswer(getWork(41),'material','bronze').status,'correct');assert.equal(shortDetail(getWork(41).material),'Bronze');assert.equal(shortDetail(getWork(33).material),'Clay, red-figure technique');});
