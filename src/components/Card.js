import React, { Component } from 'react';

const cardImages = {
    0: 'https://i.hizliresim.com/tjqmati.png',
    1: 'https://i.hizliresim.com/leru419.png',
    2: 'https://i.hizliresim.com/3hmdrix.png',
    3: 'https://i.hizliresim.com/rht4s9v.png',
    4: 'https://i.hizliresim.com/q4dabzs.png',
    5: 'https://i.hizliresim.com/h9ko537.png',
    6: 'https://i.hizliresim.com/89ou2n1.png',
    7: 'https://i.hizliresim.com/ks6hes0.png',
    8: 'https://i.hizliresim.com/t6mpn3z.png',
    9: 'https://i.hizliresim.com/o44lne0.png',
    10: 'https://i.hizliresim.com/n2f1982.png',
    11: 'https://i.hizliresim.com/idra67d.png',
    12: 'https://i.hizliresim.com/ebat37n.png'
}

class Card extends Component {
 
    render() {
        const { card } = this.props;
        return (
            
            <img alt={(card.isOpen) ? "Card-" + card.code : "Close Card"} src={(card.isOpen) ? cardImages[card.code] : "https://i.hizliresim.com/rzirwrm.png"}/>
            
        );
    }
}

export default Card;