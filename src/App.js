import './App.css';
import { useState, useEffect } from 'react';
import Square from './Components/Square';
import { Patterns} from './Patterns';

function App() {

  const [board,setBoard] = useState(["","","","","","","","",""])
  const [player, setPlayer]= useState("O");
  const [result,setResult]=useState({winner:"none" ,state:"none"});

  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);

  useEffect(()=>{
    checkTie();
    checkWin();
    if (player=="X"){
      setPlayer("O");
     }
     else{
      setPlayer("X");
     }
  },[board]);

  useEffect(()=>{
    if (result.state==="won")
    {
      alert(`Player ${result.winner} Won!`);
      updateScore(result.winner);
      restartGame();
    }
    else if (result.state==="tie")
      {
        alert(`The Game is Tied!`);
        restartGame();
      }
  },[result]);

  const chooseSquare=(square)=>{
     setBoard(board.map((val,idx)=>{
      if (idx==square && val == ""){
        return player;
      }
      return val;
     }));
  };
  const checkWin = () =>
  {
    Patterns.forEach((currPattern)=>{
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer=="") return;
      let winPattern = true;
      currPattern.forEach((idx)=>{
        if (board[idx]!=firstPlayer){
          winPattern = false;
        }
      })

      if (winPattern){
        setResult({winner: firstPlayer,state:"won"});

      }
    })
  }

  const checkTie = () =>{
    let isFilled=true;
    board.forEach((square)=>{
      if (square==""){
        isFilled=false;
      }
    })

    if (isFilled){
      setResult({winner: "No One", state:"tie"});
    }
  }
  const restartGame=()=>{
    setBoard(["","","","","","","","",""]);
    setPlayer("O");
  }
  const updateScore = (winner) => {
    if (winner === "X") {
      setScoreX(scoreX + 1);
    } else if (winner === "O") {
      setScoreO(scoreO + 1);
    }
  };
  return (
    <div className="App">
    <div className="game-container">
    <h1 className="heading">Tic-Tac-Toe</h1>
    <div className="scoreboard">
          <p>Player X Wins: <span>{scoreX}</span></p>
          <p>Player O Wins: <span>{scoreO}</span></p>
    </div>
    <div className="board">
    <div className="row">
      <Square val={board[0]} chooseSquare={()=>{chooseSquare(0)}}/>
      <Square val={board[1]} chooseSquare={()=>{chooseSquare(1)}}/>
      <Square val={board[2]} chooseSquare={()=>{chooseSquare(2)}}/>
    </div>
    <div className="row">
      <Square val={board[3]} chooseSquare={()=>{chooseSquare(3)}}/>
      <Square val={board[4]} chooseSquare={()=>{chooseSquare(4)}}/>
      <Square val={board[5]} chooseSquare={()=>{chooseSquare(5)}}/>
    </div>
    <div className="row">
      <Square val={board[6]} chooseSquare={()=>{chooseSquare(6)}}/>
      <Square val={board[7]} chooseSquare={()=>{chooseSquare(7)}}/>
      <Square val={board[8]} chooseSquare={()=>{chooseSquare(8)}}/>
    </div>
    </div>
    </div>
    </div>
  );
}

export default App;
