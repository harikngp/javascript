let sps=['stone','paper','scissor'];
var ch=sps[Math.floor(Math.random()*3)];
var p=prompt('Your choice:stone,paper,scissor');
console.log('Player: '+p+'\nComputer: '+ch);
if (ch=='stone' && p=='paper' || ch=='paper' && p=='scissor' || ch=='scissor' && p=='stone')
    console.log('Player wins');
else if (ch=='paper' && p=='stone' || ch=='stone' && p=='scissor' || ch=='scissor' && p=='paper')
    console.log('Computer wins');
else if (ch==p)
    console.log('Draw');
else
    console.log('Invalid input');
