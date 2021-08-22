import {isDroppable} from '../../src/helpers';

describe('isDroppable Function', ()=>{
    test('should return true when enteredCards is 0', () => {
        const movedCards = [{ code: 1, isOpen: true }]
        const enteredCards = [];
        const result = isDroppable(movedCards,enteredCards);

        expect(result).toBeTruthy();
    });
    test('should return true when movedCards is 1 more than enteredCards', () => {
        const movedCards = [{ code: 1, isOpen: true }]
        const enteredCards = [{ code: 0, isOpen: true }];
        const result = isDroppable(movedCards,enteredCards);

        expect(result).toBeTruthy();
    })
});