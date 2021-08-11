import React, { Component } from 'react';
import arrayShuffle from 'array-shuffle';
import Card from './components/Card';

class App extends Component {
  state = {
    completedCardDeck: 1,
    cards : [],
    board : {
      0:[],
      1:[],
      2:[],
      3:[],
      4:[],
      5:[],
      6:[],
      7:[],
      8:[],
      9:[]
    }
  }
  constructor(){
    super();
    const shuffledCards = this.getShuffledCards();
    const board = this.createBoard(shuffledCards);
    this.setState({
      board: board,
      cards: shuffledCards
    });
  }

  getShuffledCards(){
    const tempCards =[] ;
    for (let i = 0; i < 104; i++) {
      tempCards.push({ code: i % 13, isOpen: false });
    }
    return arrayShuffle(tempCards);
  }

  createBoard(cards){
    const tempBoard = this.state.board;
    for (let i = 0; i < 54; i++) {
      const tempCard = cards.pop();
      if (i > 43){
        tempCard.isOpen = true;
      }
      tempBoard[i % 10].push(tempCard) ;
    }
    return tempBoard;
  }

  allowDrop(ev) {
    ev.preventDefault();
  }
  
  drop(ev) {
    var text = ev.dataTransfer.getData("Text");
    var row = ev.dataTransfer.getData("row");
    console.log(text, row)
    //ev.target.appendChild(document.getElementById(data));
    ev.preventDefault();
  }

  render() {
      return (
        <div className="App">
          <header>
            <div id="sharedCards" className="empty"></div>
          
            {Array(8).fill(null).map((e,index) => <div key ={index} className={this.state.completedCardDeck > index ? 'completed': 'empty'} ></div>)}


          </header>
          
          <div className="main">
            {Object.entries(this.state.board).map(([columnIndex, cards]) => {
              return (
                <div className="column" onDrop={this.drop} onDragOver={this.allowDrop}>
                    {cards.map((card, row) => <Card card={card} column={columnIndex} row={row} />)}
                </div>);
            })}
          </div>
          
        </div>
          
      );
  }
}

export default App;