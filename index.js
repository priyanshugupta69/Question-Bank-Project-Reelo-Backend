const express = require('express');
const app = express();
const heap = require('heap');

//question bank import
const JSONquestions  = require('./questions.json');
const questions = JSONquestions.questionBank1

//givenparameters
const totalMark = 100;
const PercentDIf = {
    Easy: 30,
    Medium: 30,
    Hard: 40
};


//function to create list of questions picked up randomly difficulty wise
function getDifList(totMarks, reqMarks , dif){
    let map = {};
    const questionList = [];
    const minMarks = new heap((a,b)=> a -b);

    //creating list of questions of a particular difficulty
    const QuesListAccToDif = questions.filter((question) => question.difficulty == dif);

    //creating list of minimum marks
    QuesListAccToDif.forEach(element => {
        minMarks.push(element.mark);
    });

    //if total marks of a particular difficulty is less than required marks then return the list of questions of that difficulty
    if(totMarks < reqMarks){
        return QuesListAccToDif;
    }

    //populating question list with rand question from questionListAccToDif
    while(true){
        const random = Math.floor(Math.random() * QuesListAccToDif.length);
        if(map[random]) continue
        if(reqMarks - QuesListAccToDif[random].mark < 0){
            if(reqMarks - minMarks.peek() < 0){
               return questionList;
            }
            else{
                if(map[random]){
                    return questionList
                }
                continue;
            }
        }
        questionList.push(QuesListAccToDif[random]);
        map[random] = true;
        reqMarks -= QuesListAccToDif[random].mark;
    }

}

//function to count marks of a particular difficulty
function countMarks(dif){
    let count = 0;
    questions.forEach(element => {
        if(element.difficulty == dif){
            count += element.mark
        }
        
    });
    return count;
}


//function to get question paper
function getQuestionPaper(totalMark , PercentDIf){

    //calculating required marks for each difficulty according to given percentage parameters
    let reqEasyMarks = totalMark * PercentDIf.Easy / 100;
    let reqMedMarks = totalMark * PercentDIf.Medium / 100;
    let reqHardMarks = totalMark * PercentDIf.Hard / 100;
    console.log(reqEasyMarks, reqMedMarks, reqHardMarks)
    //calculating total marks of each difficulty
    const totEasyMarks = countMarks('Easy');
    const totMedMarks = countMarks('Medium');
    const totHardMarks = countMarks('Hard');

    //creating question paper
    const questionPaper = [];
    questionPaper.push(...getDifList(totEasyMarks, reqEasyMarks , 'Easy'));
    questionPaper.push(...getDifList(totMedMarks, reqMedMarks, 'Medium' ));
    questionPaper.push(...getDifList(totHardMarks, reqHardMarks , 'Hard')); 
    return questionPaper
}


const questionPaper = getQuestionPaper(totalMark, PercentDIf);
console.log(questionPaper)


app.listen(3000, () => console.log('listening at 3000'));