import {getCards} from '../../src/helpers';

describe('getCards Function', ()=>{
    test('should return cards when haven\'t index and length', () => {
        const cards = [{ code: 1, isOpen: true }, { code: 2, isOpen: true }, { code: 3, isOpen: true }];
        
        const result = getCards(cards);
        expect(result).toEqual(cards);
     
    });
    
    test('should return tempCards when haven\'t length', () => {
        const index=2;
        const cards = [{ code: 1, isOpen: true }, { code: 2, isOpen: true }, { code: 3, isOpen: true },{ code: 5, isOpen: true },{ code: 13, isOpen: true }];
        const tempCards  = [{ code: 3, isOpen: true },{ code: 5, isOpen: true },{ code: 13, isOpen: true }];

        const result = getCards(cards,index);
        expect(result).toEqual(tempCards);

    });
    test('should return tempCards when have index and length', () => {
        const index=2, length=4;
        const cards = [{ code: 1, isOpen: true }, { code: 2, isOpen: true }, { code: 3, isOpen: true },{ code: 5, isOpen: true },{ code: 13, isOpen: true }];
        const tempCards  = [{ code: 3, isOpen: true },{ code: 5, isOpen: true },{ code: 13, isOpen: true }];

        const result = getCards(cards,index,length);
        expect(result).toEqual(tempCards);

    })
    
});