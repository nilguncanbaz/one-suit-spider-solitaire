import {isDraggable} from '../../src/helpers';
import {isSorted} from '../../src/helpers/isSorted';

jest.mock('../../src/helpers/isSorted');

describe('isDraggable Function', ()=>{
    test('should return false when cards\'s isOpen attribute is false', () => {

        const cards = [{ code: 7, isOpen: true }, { code: 3, isOpen: false },{ code: 1, isOpen: false }, { code: 12, isOpen: false }]
        
        const result = isDraggable(cards);
        expect(result).toBeFalsy();
    });
    test('should return false when isSorted returns false', () => {

        const cards = [{ code: 7, isOpen: true }, { code: 3, isOpen: true },{ code: 1, isOpen: true }, { code: 12, isOpen: true }];
       
        isSorted.mockImplementation(() => false)
        
        const result = isDraggable(cards);
        expect(result).toBeFalsy();
    });
    test('should return true when isSorted returns true', () => {

        const cards = [{ code: 7, isOpen: true }, { code: 3, isOpen: true },{ code: 1, isOpen: true }, { code: 12, isOpen: true }];
       
        isSorted.mockImplementation(() => true)
        
        const result = isDraggable(cards);
        expect(result).toBeTruthy();
    });
});