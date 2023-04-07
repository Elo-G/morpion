
let lap = 1; //tour de jeu 
let playerOne = "X";
let playerTwo = "O";
let scorePlayerOne = 0;
let scorePlayerTwo = 0;
let modeCpu = false; 
let gameOver = false;

/*conditions gagnantes*/
let win = [
  [0, 1, 2], 
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// function pour jouer 
function play(elem){
  if(gameOver == false){
    if(elem.innerHTML == ""){ 
      if(lap % 2 != 0){ //modulo pour savoir à qui vient le tour de jouer(si different de 0 c'est au tour de playerOne) 
          elem.innerHTML = playerOne;
      }else{
        if(modeCpu == false){ 
          elem.innerHTML = playerTwo; //SINON CE SERA AU TOUR DU JOEUR 2
      
        }
      }
          checkWin(); //fonction checkWin pour checker s'il y'a un gagnant
          draw();
          lap++; /*lap prend un tour de +*/
      if(gameOver == false && modeCpu == true){
          random();
      }
    }
  }
}

//fonction pour savoir qui a gagné.
function checkWin(){
    let cells = document.querySelectorAll(".case");           
                                                    
      for(let i = 0; i < win.length; i++){
        if(cells[win[i][0]].innerHTML != ""){ 
          if(cells[win[i][0]].innerHTML == cells[win[i][1]].innerHTML && cells[win[i][1]].innerHTML == cells[win[i][2]].innerHTML){   
            if(cells[win[i][0]].innerHTML === playerOne){ 
              scorePlayerOne++;
                document.querySelector("#scorePlayerOne").innerHTML = "le score du joueur 1 est de : " + scorePlayerOne;
              gameOver = true; //gameover devient vrai car la partie est terminée
            }else{
              scorePlayerTwo++;
                document.querySelector("#scorePlayerTwo").innerHTML = "Le score du joeur 2 est de : " + scorePlayerTwo;
              gameOver = true;      
            }
          }
        }
      }
}

//fonction match nul 
function draw() { 
  if (gameOver == false) { 
    let counter = 0
    let cells = document.querySelectorAll(".case") 

    for (let i = 0; i < cells.length; i++) {
      if (cells[i].innerHTML != "") { 
        counter++ 
      }
    }
    if (counter == 9) { //si la grille est pleine => match nul
      gameOver = true 
      document.querySelector("#matchNul").innerHTML = "Match nul" 
    }
  }
}

//fonction reset pour relancer la partie à 0
function reset(){
    let cells = document.querySelectorAll(".case");
    for(let i = 0; i < cells.length; i++){
      cells[i].innerHTML = "";
    }
    lap = 1;
    gameOver = false;
    document.querySelector("#matchNul").innerHTML = "";
    

}

//fonction random pour le mode aléatoire
function random() {
  let cells = document.querySelectorAll(".case");
  let cpu = randomNumber(0, 8);

  while (true) {
    if (cells[cpu].innerHTML == "") {
      cells[cpu].innerHTML = playerTwo; //si une des cases parcourues par cpu = playerTwo => "break" :le cpu ne devra pas jouer dans cette case
      break;
    } else {
      cpu = randomNumber(0, 8);
    }
  }
  lap++;
}


// fonction qui va permettre que modecpu devienne = true pour pouvoir jouer contre le cpu en mode random
function cpuMode() {
  modeCpu = !modeCpu; //si modeCpu est différent de modeCpu <=> modeCpu n'est plus = false mais = true, donc ma "function random()" peut s'executer
  console.log(modeCpu);
}



function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

