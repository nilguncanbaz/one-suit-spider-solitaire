import {removeCards} from '../../src/helpers';

describe('removeCards Function', ()=>{
    test('should return tempCards when haven\'t index and length', () => {
        const cards = [{ code: 1, isOpen: true }, { code: 2, isOpen: true }, { code: 3, isOpen: true }];
        const tempCards  = [{ code: 1, isOpen: true }, { code: 2, isOpen: true }, { code: 3, isOpen: true }];

        const result = removeCards(cards);
        expect(result).toEqual(tempCards)
     
    });
    
    test('should return tempCards when have index and length ', () => {
        const index=1, length=2;
        const cards = [{ code: 1, isOpen: true }, { code: 2, isOpen: true }, { code: 3, isOpen: true },{ code: 5, isOpen: true },{ code: 13, isOpen: true }];
        const tempCards  = [{ code: 2, isOpen: true },{ code: 3, isOpen: true }];

        const result = removeCards(cards,index,length);
        expect(result).toEqual(tempCards);

    })
    
});