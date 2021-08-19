import React, { Component } from 'react';
import arrayShuffle from 'lodash.shuffle';
import cloneDeep from 'lodash.clonedeep';
import Card from './components/Card';
import { TEMP_BOARD } from './constants'

class App extends Component {
  constructor(){
    super();
    const shuffledCards = this.getShuffledCards();
    const board = this.createBoard(shuffledCards);

    this.state = {
      board: board,
      cards: shuffledCards,
      dragging: false,
      completedCardDeck: 1
    };
  }

  componentDidUpdate() {
    console.log()
  }

  // arrayShuffle method used to mix incoming values ​​in tempCards array
  getShuffledCards(){
    const tempCards = [];
    for (let i = 0; i < 104; i++) {
      tempCards.push({ code: i % 13, isOpen: true });
    }
    return arrayShuffle(tempCards);
  }

  createBoard(cards){
    const tempBoard = cloneDeep(TEMP_BOARD);
    for (let i = 0; i < 54; i++) {
      const tempCard = cards.pop();
      // Başlangıçta sadece son 10 kart açık görünmesi gerekiyor. 
      if (i <= 43){
        tempCard.isOpen = false;
      }
      tempBoard[i % 10].push(tempCard) ;//yalnızca 0-9 sütunlara kart eklenmesi gerekiyor bunu için mod alınıyor.
    }
    return tempBoard;
  }

  //yeni deste dağıtılıyor.
  dealCard(){
    
    if (this.state.cards.length > 0) {
      const tempCards = cloneDeep(this.state.cards);
      const tempBoard = cloneDeep(this.state.board);

      const hasEmptyColumn = Object.values(tempBoard).some(tempColumn => tempColumn.length === 0);
      if (!hasEmptyColumn) {
        //dizilen kartlar desteden çıkarılıyor.
        for (let i = 0; i < 10; i++){
          tempBoard[i].push(tempCards.pop());
        }
  
        this.setState({
          cards: tempCards,
          board: tempBoard
        });
        return;
      }else {
        alert("Kart dağıtılabilmesi için her sütunda en az bir kart olmalı !");
        return;
      }
    }

    alert('Dağıtılacak kart kalmadı !');
  }

  //Drop and Drag Methods

  dragStart(e,params){
    const card = this.state.board[params.columnIndex][params.rowIndex];
    if (card && card.isOpen) {
      this.setState({ dragging: true });

      return;
    } 


    e.preventDefault(); // hareket etmeyi engeller
    
  }

  dragEnd(e, params){
    if (params.columnIndex !== this.enteredColumn) {
      const tempBoard = cloneDeep(this.state.board);

      const movedColumn = tempBoard[params.columnIndex];
      const movedCards = movedColumn.splice(params.rowIndex, tempBoard[params.columnIndex].length - params.rowIndex);
      const movedCardsFirstCard = movedCards[0];

      const enteredColumn = tempBoard[this.enteredColumn];
      const enteredColumnLength = tempBoard[this.enteredColumn].length;
      const enteredColumnLastCard = enteredColumn[enteredColumnLength - 1];
      
      if (enteredColumnLastCard === undefined || enteredColumnLastCard.code + 1 === movedCardsFirstCard.code){
        enteredColumn.push(...movedCards);

        // son kartı aç (açıksa değişmiyor)
        if (movedColumn[movedColumn.length - 1]) {
          movedColumn[movedColumn.length - 1].isOpen = true;
        }

        this.setState({ board: tempBoard });
        return;
      } 
    }

    console.log('Kart taşınamaz !');
  }

  dragEnter(e, params) {
    this.enteredColumn = params.columnIndex;
  }

  getCardClassName() {
    return "card";
  }

  render() {
      return (
        <div className="app">
          <header>
            <div className="deal-card">
              <button onClick={() => this.dealCard()}>
                <span>{this.state.cards.length / 10}</span>
              </button>
            
            </div>
            <div className="space" />

            {Array(8).fill(null).map((e,index) => (
              <div key ={index}>
                <button className={this.state.completedCardDeck > index ? 'completed': 'empty'}/>
              </div>
            ))}

          </header>
          
          <div className="main">
            {
              Object.entries(this.state.board).map(([columnIndex, cards]) => {
                return (
                  <div 
                    key={`column-${columnIndex}`}
                    onDragEnter={(e) => this.dragEnter(e, { columnIndex })}
                    className="column">
                      {cards.map((card, rowIndex) => {
                        return (
                          <div 
                            key={`card-${columnIndex}-${rowIndex}`}
                            className="card" 
                            draggable 
                            onDragStart={(e) => this.dragStart(e, { columnIndex, rowIndex })}
                            onDragEnd={(e) => this.dragEnd(e, { columnIndex, rowIndex })}
                          >
                            <Card card={card} />
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