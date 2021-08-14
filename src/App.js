import React, { Component,useRef } from 'react';
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
  dragItem;
  constructor(){
    super();
    const shuffledCards = this.getShuffledCards();
    const board = this.createBoard(shuffledCards);
    this.setState({
      board: board,
      cards: shuffledCards
    });
    this.dragItem=React.createRef();
  }
  // arrayShuffle method used to mix incoming values ​​in tempCards array
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

  //Drop and Drag Methods
  drop(e) {
    e.preventDefault();
    const card_id= e.dataTransfer.getData('card_id');
    const card = document.getElementById(card_id);
    card.style.display='block';
    e.target.appendChild(card); 
  }
  dragOver(e) {
    e.preventDefault();
  }

  dragStart(e,params){
    
    this.dragItem.current =  params;
    const target =e.target;
    e.dataTransfer.setData('card_id',target.id);
    //console.log(params);
    setTimeout(()=>{
      target.style.display='none';
    }, 0);
  }

  render() {
      return (
        <div className="App">
          <header>
            <div id="sharedCards" className="empty"></div>
            
            {Array(8).fill(null).map((e,index) => <div key ={index} className={this.state.completedCardDeck > index ? 'completed': 'empty'} ></div>)}

          </header>
          
          <div className="main">
            {
              Object.entries(this.state.board).map(([columnIndex, cards]) => {
                return (
                  <div 
                    onDrop={this.drop}
                    onDragOver={this.dragOver}
                    className="column">
                      {cards.map((card, row) => {
                        return (
                          <div 
                            id= {columnIndex + "-" + row} 
                            className="card" 
                            draggable 
                            onDragStart={(e) => this.dragStart(e, {columnIndex,row})}
                            onDragOver={this.dragOver} 
                          >
                            <Card card={card} column={columnIndex} row={row} />
                          </div>
                        )
                      })}
                  </div>
                );
              })
            }
        </div>
      </div>
      );
  }
}

export default App;