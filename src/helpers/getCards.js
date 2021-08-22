export function getCards(cards, index = 0, length = undefined) {
    const tempLength = length ? index + length : cards.length;

    return cards.slice(index, tempLength)
}