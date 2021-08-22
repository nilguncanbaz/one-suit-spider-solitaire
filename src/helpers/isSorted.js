export function isSorted(cards) {
    for (let i = 0; i < cards.length - 1; i++){
        if (cards[i].code + 1 !== cards[i + 1].code) {
            return false;
        }
    }

    return true;
}