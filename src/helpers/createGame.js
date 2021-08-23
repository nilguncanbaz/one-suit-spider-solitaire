import arrayShuffle from 'lodash.shuffle';
import cloneDeep from 'lodash.clonedeep';
import { TEMP_BOARD,TOTAL_CARDS,DEAL_CARDS } from '../constants'

export function createGame(){
    const cardsForBoard = createShuffledCards();
    const cardsForADeal = cardsForBoard.splice(DEAL_CARDS);

    const board = createBoard(cardsForBoard);

    return {
        board: board,
        cards: cardsForADeal
    }
}

function createShuffledCards(length = TOTAL_CARDS){
    const cards = [];

    for (let i = 0; i < length; i++) {
        cards.push({ code: i % 13, isOpen: true });
    }

    return arrayShuffle(cards);
}

function createBoard(cards) {
    const tempBoard = cloneDeep(TEMP_BOARD);
    const tempCards = cloneDeep(cards);

    for (let i = 0; i < cards.length; i++) {
      const tempCard = tempCards[i];
      const boardColumn = i % 10;

      // Başlangıçta sadece son 10 kart açık görünmesi gerekiyor. 
      if (i <= 43){
        tempCard.isOpen = false;
      }

      tempBoard[boardColumn].push(tempCard) ;//yalnızca 0-9 sütunlara kart eklenmesi gerekiyor bunu için mod alınıyor.
    }

    return tempBoard;
}