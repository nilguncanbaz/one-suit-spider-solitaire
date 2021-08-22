export function isDroppable(movedCards, enteredCards) {
    if (enteredCards.length === 0) return true;

    const enteredCardsLastCardCode = enteredCards[enteredCards.length - 1].code;
    const movedCardsFirstCardCode = movedCards[0].code;

    return enteredCardsLastCardCode + 1 === movedCardsFirstCardCode
}