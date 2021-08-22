import React, { Component } from 'react';
import cloneDeep from 'lodash.clonedeep';
import Card from './components/Card';
import { openLastCard, getCards, isDraggable, isDroppable, createGame, isSorted, removeCards } from './helpers';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

class App extends Component {
  constructor(){
    super();
    const { board, cards } = createGame();

    this.enteredColumnIndex = undefined;
    this.state = {
      board: board,
      cards: cards,
      dragging: false,
      completedCardDeck: 0
    };
  }

  componentDidUpdate(){
    if (this.state.completedCardDeck === 8){
      Swal.fire({
        title: 'OYUNU KAZANDIN !',
        icon: 'success',
        width: 500,
        padding: '3em',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://i.hizliresim.com/smvm55n.gif")
          top
          no-repeat
        `,
        showCancelButton: true,
        confirmButtonText: 'Yeniden Oyna',
        cancelButtonText: 'Bitir'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload(false)
        }
      });

      return;
    }

    const tempBoard = cloneDeep(this.state.board);
    let completedCardDeck = 0;

    for (let columnIndex = 0; columnIndex < 10; columnIndex++){
      const lastDeck = getCards(tempBoard[columnIndex], -13);
      if (lastDeck.length === 13 && isSorted(lastDeck)) {
        removeCards(tempBoard[columnIndex], -13);
        openLastCard(tempBoard[columnIndex]);
        completedCardDeck += 1;
      }
    }

    if (completedCardDeck > 0) {
      this.setState((tempState) => {
        return {
          board: tempBoard, 
          completedCardDeck: tempState.completedCardDeck + completedCardDeck
        }
      })
    }
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
        toast("Kart dağıtılabilmesi için her sütunda en az bir kart olmalı !");
        return;
      }
    }

    toast('Dağıtılacak kart kalmadı!');
  }

  //Drop and Drag Methods
  dragStart(e, params){
    const tempBoard = cloneDeep(this.state.board);
    const movedCards = getCards(tempBoard[params.columnIndex], params.rowIndex);

    console.log(params, tempBoard[params.columnIndex], movedCards);

    if (!isDraggable(movedCards)) {
      return e.preventDefault();
    }

    this.setState({ dragging: true });
  }

  dragEnd(e, params){
    if (params.columnIndex !== this.enteredColumnIndex) {
      const tempBoard = cloneDeep(this.state.board);

      const movedColumn = tempBoard[params.columnIndex];
      const movedCards = removeCards(movedColumn, params.rowIndex);

      const enteredCards = tempBoard[this.enteredColumnIndex];
      
      if (isDroppable(movedCards, enteredCards)){
        enteredCards.push(...movedCards);

        openLastCard(movedColumn);

        this.setState({ board: tempBoard });
        return;
      } 
    }

    toast('Kart taşınamaz!');
  }

  dragEnter(e, params) {
    this.enteredColumnIndex = params.columnIndex;
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
        <footer>
          <button onClick={() => window.location.reload(false)}>
              <span> <img alt="Yeni Oyun" src="https://i.hizliresim.com/jmmevls.png" width="10"/> YENİ OYUN</span>
            </button>
        </footer>
      </div>
      );
  }
}

export default App;