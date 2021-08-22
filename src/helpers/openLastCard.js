export function openLastCard(cards){
    if (cards[cards.length - 1]) {
        cards[cards.length - 1].isOpen = true;
    }
}