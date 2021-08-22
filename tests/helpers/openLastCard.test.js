import {openLastCard} from '../../src/helpers';

describe('openLastCard Function', ()=>{
    test('should return isOpen parameter true when opened last card', () => {
        const cards = [{ code: 1, isOpen: true }, { code: 2, isOpen: true }, { code: 3, isOpen: false }];
        const length = cards.length;

        openLastCard(cards);
       
        expect(cards[length-1].isOpen).toBeTruthy();
    });
    test('should return empty array when empty array opened Last Card  ', () => {
        const cards = [];
        openLastCard(cards);
       
        expect(cards).toEqual([]);
    });
});