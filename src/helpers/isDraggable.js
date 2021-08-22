import { isSorted } from './isSorted'

export function isDraggable(cards) {
    return !cards.some(card => !card.isOpen) && isSorted(cards);
}

