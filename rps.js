let usermove='';
let computermove='';
let result='';

//javascript object(key is not string) here game is js object  
// javascript object Nottation JSON in this key must be in String "win" :0
let game= JSON.parse(localStorage.getItem('game')) ||{
    win:0,
    losses:0,
    tie:0,
};
let gameHistory= JSON.parse(localStorage.getItem('gameHistory') ) || [];
renderGameSummary();
renderGameHistory();

function updateGameScore(){
    if(result=== 'win'){
        game.win++;
    }
    else if(result === 'losses'){
        game.losses++;
    }
    else{ 
        game.tie++;
    }

//create jsonobject
const gameHistoryItem={usermove: usermove,computermove: computermove,result:result};
gameHistory.push(gameHistoryItem);
localStorage.setItem('game',JSON.stringify(game));
localStorage.setItem('gameHistory',JSON.stringify(gameHistory));
}

function captureUserMove(move){
    usermove=move;

}
//style="color:blue" 
// computer moves
function generate(){
    const random=Math.random();  
    if(random<1/3){
        computermove='rock'
    }
    else if( random<2/3){
        computermove='paper'
    }
    else{
        computermove='scissors'
    }
}
function evalute(){
    if(usermove === computermove){
        result ="tie";
    }
    else if((usermove==='rock' && computermove ==='scissors') || (usermove==='scissors' && computermove ==='paper')||
    (usermove==='paper' && computermove ==='rock')){
        result="win";
    }
    else{
        result= "losses";
    }
}

function renderGameSummary(){
    console.log(`usermove : ${usermove}  computermove: ${computermove}`);
    console.log(result);
    console.log(game);
    const gameplayed= game.win+game.losses+game.tie;
    console.log(`Gameplayed : ${gameplayed}`) ;
    document.getElementById('win').innerHTML=game.win;
    document.getElementById('losses').innerHTML=game.losses;
    document.getElementById('tie').innerHTML=game.tie;
    document.getElementById('gameplayed').innerHTML=gameplayed;
}
function renderGameHistory(){
    let f=`<tr>
    <th># </th>
    <th>User Move</th>
    <th>Computer Move</th>
    <th>Result</th>
    </tr>` ;
    console.log(`usermove: ${usermove} computermove: ${computermove} result:${result}`);
    for(let i=0;i<gameHistory.length;i++){
        f+=
        `<tr>
            <td> ${i+1}</td>
            <td>${gameHistory[i].usermove}</td>
            <td>${gameHistory[i].computermove}</td>
            <td>${gameHistory[i].result}</td>
        </tr>`;
    }
    document.getElementById("History").innerHTML=f;
}
function resetScore(){
    game={
        win:0,
        losses:0,
        tie:0,
    };
     gameHistory=  [];
     renderGameHistory();
     renderGameSummary();

}