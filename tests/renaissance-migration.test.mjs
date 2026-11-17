import test from 'node:test';
import assert from 'node:assert/strict';
import {ALL_WORKS,RETIRED_WORKS,collectionWorks} from '../dist/data.js';
import {getWork,defaultStore,sanitizeStore,switchCollection,recordRecall,studyFields,answerFor,
 makeChoices,makeStudyQuestions,makeQuiz,finishQuiz,quizScore} from '../dist/engine.js';

const assigned=[66,68,74,77,79,83,67,69,70,71,72,73,75,76,80,78];
const previous=[66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,82,83];
const clone=value=>JSON.parse(JSON.stringify(value));
const fixed=()=>.37;
function legacyStudy(mode,{ids=previous,focus='best_quiz',index=0}={}){
 const questions=ids.flatMap(id=>studyFields(focus,getWork(id)).map(field=>({id,field,
  ...(mode==='choice'?makeChoices(getWork(id),field,fixed,'renaissance'):{})})));
 return {focus,mode,filter:'all',questions,queue:questions.map(q=>q.id),index,revealed:false,
  typed:'',again:[],correct:0,image:0,ratings:{},responses:{}};
}
function legacyQuiz(mode,{ids=previous,index=0,status='active'}={}){
 const questions=ids.map(id=>({id,image:0,...(mode==='choice'?{choices:Object.fromEntries(
  ['name','material','date','location','recommendation'].map(field=>[field,makeChoices(getWork(id),field,fixed,'renaissance')]))}:{})}));
 const answers=Object.fromEntries(ids.map(id=>{const work=getWork(id);return [id,{name:work.name,material:work.material,
  fact:answerFor(work,'recommendation'),factField:'recommendation'}];}));
 const quiz={id:'saved-renaissance',collection:'renaissance',questions,index,part:2,status,mode,
  answers,grades:{},startedAt:1234,finishedAt:null,timerMinutes:0,recorded:false};
 if(status==='review')finishQuiz(quiz);
 return quiz;
}

test('retired work remains readable for history but cannot enter fresh study, quizzes or choices',()=>{
 assert.deepEqual(collectionWorks('renaissance').map(work=>work.id),assigned);
 assert.deepEqual(RETIRED_WORKS.map(work=>work.id),[82]);
 assert.equal(ALL_WORKS.some(work=>work.id===82),false);
 assert.equal(getWork(82).shortName,'Il Gesù');
 for(const mode of ['type','choice']){
  const questions=makeStudyQuestions({ids:previous,focus:'best_quiz',mode,collection:'renaissance'});
  assert.equal(questions.length,48);assert.ok(questions.every(q=>q.id!==82));
  const ordered=makeStudyQuestions({ids:assigned,focus:'best_quiz',mode,collection:'renaissance'});
  assert.deepEqual(ordered.map(q=>q.id),assigned.flatMap(id=>[id,id,id]));
  const quiz=makeQuiz({ids:previous,count:17,mode,collection:'renaissance',random:fixed});
  assert.equal(quiz.questions.length,16);assert.equal(quiz.answers[82],undefined);
  assert.deepEqual(new Set(quiz.questions.map(q=>q.id)),new Set(assigned));
 }
 assert.deepEqual(makeStudyQuestions({ids:[82],focus:'name'}),[]);
 for(const work of collectionWorks('renaissance'))
  assert.ok(!makeChoices(work,'name',fixed,'renaissance').options.includes(getWork(82).name));
});

for(const mode of ['type','choice'])test(`${mode} study removes retired questions and preserves retained order, answers and cursor`,()=>{
 const ids=[78,82,66,...previous.filter(id=>![78,82,66].includes(id))];
 const raw={...defaultStore(),collection:'renaissance',focus:'best_quiz',mode};
 raw.study=legacyStudy(mode,{ids,index:7});
 raw.study.typed='current answer draft';raw.study.image=1;
 raw.study.responses={0:'Entombment of Christ',1:'Oil on wood',3:'Il Gesù',5:'Rome, Italy',6:'Triptych answer'};
 raw.study.ratings={0:true,3:true,5:false,6:false};raw.study.correct=2;raw.study.again=[82,66];
 recordRecall(raw,82,'material',true);recordRecall(raw,66,'name',false);
 const original=clone(raw),clean=sanitizeStore(clone(raw)),study=clean.study;
 assert.equal(study.questions.length,48);
 assert.deepEqual(study.questions.map(q=>q.id),original.study.questions.filter(q=>q.id!==82).map(q=>q.id));
 assert.equal(study.index,4);assert.equal(study.questions[study.index].id,66);
 assert.equal(study.questions[study.index].field,'material');
 assert.equal(study.typed,'current answer draft');assert.equal(study.image,1);
 assert.deepEqual(study.ratings,{0:true,3:false});assert.equal(study.correct,1);
 assert.deepEqual(study.responses,{0:'Entombment of Christ',1:'Oil on wood',3:'Triptych answer'});
 assert.deepEqual(study.again,[66]);
 assert.equal(study.retiredQuestions.length,3);
 assert.equal(study.retiredQuestions[0].response,'Il Gesù');
 assert.equal(study.retiredQuestions[2].rating,false);
 assert.deepEqual(clean.stats[82],original.stats[82]);assert.deepEqual(clean.stats[66],original.stats[66]);
 assert.deepEqual(sanitizeStore(clone(clean)),clean,'the migration is idempotent');
});

test('a current retired study question advances safely and preserves its unfinished answer in the archive',()=>{
 const raw={...defaultStore(),collection:'renaissance',focus:'name'};
 raw.study=legacyStudy('type',{ids:[66,82,68],focus:'name',index:1});
 raw.study.typed='Il Gesu draft';raw.study.revealed=true;raw.study.image=2;
 raw.study.responses={0:'Triptych',2:'Arnolfini'};raw.study.ratings={0:true};
 const clean=sanitizeStore(clone(raw));
 assert.deepEqual(clean.study.queue,[66,68]);assert.equal(clean.study.index,1);
 assert.equal(clean.study.typed,'');assert.equal(clean.study.image,0);
 assert.equal(clean.study.revealed,true,'the following retained response stays revealed');
 assert.equal(clean.study.responses[1],'Arnolfini');
 assert.equal(clean.study.retiredQuestions[0].typed,'Il Gesu draft');
});

for(const mode of ['type','choice'])test(`${mode} active quiz retains its shuffled sequence, answers and current part while omitting 82`,()=>{
 const ids=[78,82,66,...previous.filter(id=>![78,82,66].includes(id))];
 const raw={...defaultStore(),collection:'renaissance',quiz:legacyQuiz(mode,{ids,index:2})};
 raw.quiz.answers[66].material='saved material draft';
 const original=clone(raw),clean=sanitizeStore(clone(raw));
 assert.deepEqual(clean.quiz.questions.map(q=>q.id),ids.filter(id=>id!==82));
 assert.equal(clean.quiz.index,1);assert.equal(clean.quiz.questions[clean.quiz.index].id,66);assert.equal(clean.quiz.part,2);
 for(const id of assigned)assert.deepEqual(clean.quiz.answers[id],original.quiz.answers[id]);
 assert.equal(clean.quiz.answers[82],undefined);
 assert.deepEqual(clean.quiz.retiredQuestions[0].answer,original.quiz.answers[82]);
 assert.equal(clean.quiz.retiredQuestions[0].question.id,82);
 assert.deepEqual(sanitizeStore(clone(clean)),clean);
});

test('a retired active quiz cursor advances to the following work and resets only the current part',()=>{
 const raw={...defaultStore(),collection:'renaissance',quiz:legacyQuiz('type',{ids:[66,82,68],index:1})};
 const clean=sanitizeStore(clone(raw));
 assert.deepEqual(clean.quiz.questions.map(q=>q.id),[66,68]);assert.equal(clean.quiz.index,1);
 assert.equal(clean.quiz.part,0);assert.equal(clean.quiz.answers[68].name,getWork(68).name);
});

for(const mode of ['type','choice'])test(`${mode} completed quiz reviews retain the retired work, original grades and historical score`,()=>{
 const raw={...defaultStore(),collection:'renaissance',quiz:legacyQuiz(mode,{status:'review'})};
 raw.quiz.grades[66].name=false;raw.quiz.recorded=true;
 raw.history=[{collection:'renaissance',score:50,total:51,quiz:raw.quiz.id}];
 recordRecall(raw,82,'recommendation',true);
 const clean=sanitizeStore(clone(raw));
 assert.equal(clean.quiz.questions.length,17);assert.ok(clean.quiz.questions.some(q=>q.id===82));
 assert.deepEqual(quizScore(clean.quiz),{correct:50,pending:0,total:51});
 assert.equal(clean.quiz.recorded,true);assert.deepEqual(clean.history,raw.history);
 assert.deepEqual(clean.stats[82],raw.stats[82]);
 finishQuiz(clean.quiz);assert.deepEqual(quizScore(clean.quiz),{correct:51,pending:0,total:51});
});

test('stored Renaissance sessions migrate without replacing the active collection and survive switching',()=>{
 const raw={...defaultStore(),collection:'26-47',units:{renaissance:{focus:'best_quiz',mode:'type',
  study:legacyStudy('type',{index:50}),quiz:legacyQuiz('type',{index:16})}}};
 raw.study={...legacyStudy('type',{ids:[26],focus:'name'}),typed:'Greek draft'};
 recordRecall(raw,26,'name',true);recordRecall(raw,82,'material',true);
 const clean=sanitizeStore(clone(raw));
 assert.equal(clean.collection,'26-47');assert.equal(clean.study.typed,'Greek draft');
 assert.equal(clean.units.renaissance.study.questions.length,48);assert.equal(clean.units.renaissance.study.index,47);
 assert.equal(clean.units.renaissance.quiz.questions.length,16);
 switchCollection(clean,'renaissance');assert.equal(clean.study.questions[clean.study.index].id,83);
 const migrated=clone({study:clean.study,quiz:clean.quiz});
 switchCollection(clean,'26-47');assert.equal(clean.study.typed,'Greek draft');
 switchCollection(clean,'renaissance');assert.deepEqual({study:clean.study,quiz:clean.quiz},migrated);
 assert.deepEqual(clean.stats[82],raw.stats[82]);
});

test('sessions containing only retired work are archived rather than discarding their answers, including unit stashes',()=>{
 const raw={...defaultStore(),collection:'26-47',units:{renaissance:{focus:'name',mode:'type',
  study:legacyStudy('type',{ids:[82],focus:'name'}),quiz:legacyQuiz('type',{ids:[82]})}}};
 raw.units.renaissance.study.typed='retired answer draft';
 const clean=sanitizeStore(clone(raw));
 assert.equal(clean.units.renaissance.study,null);assert.equal(clean.units.renaissance.quiz,null);
 assert.equal(clean.units.renaissance.archivedStudy.retiredQuestions[0].typed,'retired answer draft');
 assert.equal(clean.units.renaissance.archivedQuiz.retiredQuestions[0].answer.name,getWork(82).name);
 switchCollection(clean,'renaissance');assert.ok(clean.archivedStudy);assert.ok(clean.archivedQuiz);
 switchCollection(clean,'26-47');assert.equal(clean.archivedStudy,undefined);assert.equal(clean.archivedQuiz,undefined);
 switchCollection(clean,'renaissance');assert.equal(clean.archivedStudy.retiredQuestions[0].typed,'retired answer draft');
 assert.deepEqual(sanitizeStore(clone(clean)),clean);
});
