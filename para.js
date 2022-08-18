let para='Paragraphs are medium-sized units of writing, longer than sentences, but shorter than sections, chapters, or entire works. Because they connect the "small" ideas of individual sentences to a "bigger" idea, paragraph structure is essential to any writing for organization, flow, and comprehension. Students have a lot of questions when it comes to writing a paragraph: How many sentences should you use? How do you transition within a paragraph? When do you end a paragraph? Etc. Below we explain everything you need to know about paragraph structure to write like an expert, including several paragraph examples.';
var q1,q2,q3,q4,q5,q6,q7;
q1=para.split('. ').length;
console.log('Sentence: '+q1);
q2=para.split(' ').length;
console.log('\nWords: '+q2);
q3=para.length;
console.log('\nCharacters:'+q3);
q4=para.match(/paragraph/gi).length;
console.log('\nparagraph occurence: '+q4)
q5=para.match(/[^a-z0-9 ]/gi).length;
console.log('\nSpecial characters: '+q5);
q6=para.replace(/paragraph/gi,'para');
console.log("\nReplace 'paragraph' to 'para':\n"+q6);
q7=para.split('. ').slice(1);
console.log('\nSlicing from 2nd sentence:\n'+q7.join('. '));