var players = [];
var deck;

var consts = {
    signs: ['heart', 'spade', 'diamond', 'club'],
    names: ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'],
    imgRoot: 'assets/img/cards/',
    imgBack: 'assets/img/cards/back-red.png'
}

function card(sign, name, order, point, imgUrl, open) {
    this.open = open || true,
    this.sign = sign,
    this.name = name,
    this.order = order,
    this.imgUrl = imgUrl,
    this.point = point
}

function player(name) {
    this.name = name;
    this.hand = [],
    this.point
}

function createDeck() {
    let papers = [];
    let point = 0;

    for (let i = 0; i < consts.signs.length; i++) {
        for (let j = 0; j < consts.names.length; j++) {

            if (consts.signs[i] === 'heart') {
                point = 1;
            } else if (consts.signs[i] === 'spade' && consts.names[j] === 'queen') {
                point = 13;
            } else {
                point = 0;
            }

            let img = consts.imgRoot + consts.signs[i] + '-' + consts.names[j] + '.svg';

            papers.push(new card(consts.signs[i], consts.names[j], i * 10 + j, point, img));
        }
    }

    return papers;
}

function newGame() {
    deck = createDeck();

    players.push(new player('north'));
    players.push(new player('east'));
    players.push(new player('south'));
    players.push(new player('west'));

    for (var i = 0; i < players.length; i++) {
        let container = document.getElementById(players[i].name);

        for (var j = 0; j < 13; j++) {
            let num = Math.floor(Math.random() * deck.length);
            let card = deck.splice(num, 1)[0];

            players[i].hand.push(card);
        }

        players[i].hand.sort(function (a, b) {
            return a.order - b.order;
        });

        for (var k = 0; k < 13; k++) {
            let img = document.createElement('img');
            var div = document.createElement('div');
            img.setAttribute('src', i !== 2 ? consts.imgBack : players[i].hand[k].imgUrl);
            div.append(img);
            container.append(div);
        }
    }

}

document.addEventListener("DOMContentLoaded", function (event) {
    newGame();
});
