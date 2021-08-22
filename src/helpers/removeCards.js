export function removeCards(cards, index = 0, length = undefined) {
    const tempLength = length || (cards.length - index);

    return cards.splice(index, tempLength)
}
