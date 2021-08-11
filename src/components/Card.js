import React, { Component } from 'react';

const cardImages = {
    0: 'https://i.hizliresim.com/haln85v.png',
    1: 'https://i.hizliresim.com/t6gtqfp.png',
    2: 'https://i.hizliresim.com/erjcp7n.png',
    3: 'https://i.hizliresim.com/pg3qast.png',
    4: 'https://i.hizliresim.com/5wkxhqu.png',
    5: 'https://i.hizliresim.com/j79pm8v.png',
    6: 'https://i.hizliresim.com/96hy7vy.png',
    7: 'https://i.hizliresim.com/c0wr8ph.png',
    8: 'https://i.hizliresim.com/e4m5hhu.png',
    9: 'https://i.hizliresim.com/546obcn.png',
    10: 'https://i.hizliresim.com/as6z6gl.png',
    11: 'https://i.hizliresim.com/kut1w3f.png',
    12: 'https://i.hizliresim.com/2jg710n.png'
}

class Card extends Component {
    drag(ev) {

        ev.dataTransfer.setData("Text", ev.target.id);

    }
    render() {
        const { card, column, row } = this.props;
        return (
            <div className="card" id= {column + "-"+row} draggable="true" onDrag={this.drag}>
                <img src={(card.isOpen) ? cardImages[card.code] : "https://i.hizliresim.com/qv20z77.jpg"}/>
            
            </div>
        );
    }
}

export default Card;