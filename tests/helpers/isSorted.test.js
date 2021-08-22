import {isSorted} from '../../src/helpers';

describe('isSorted Function', ()=>{
    test('should return true when cards is sorted', () => {
        const cards = [{ code: 1, isOpen: true }, { code: 2, isOpen: true }, { code: 3, isOpen: true }]
        const result = isSorted(cards);

        expect(result).toBeTruthy();
    });
    test('should return true when cards isn\'t sorted', () => {
        const cards = [{ code: 7, isOpen: true }, { code: 3, isOpen: true }, { code: 13, isOpen: true }]
        const result = isSorted(cards);

        expect(result).toBeFalsy();
    })
});