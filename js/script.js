let foodInventory = [
    {
        'name': 'Sa-Cha Rindfleisch Spezial',
        'price': '11.90',
        'description': 'Hähnchenfiletstücke mit feinen Gewürzen, Kokosflocken und Mandelstücke in Joghurt-Safransauce.'
    },
    {
        'name': 'Hähnchenfleisch mit Broccoli',
        'price': '12.10',
        'description': 'mit verschiedenem, chinesischen Gemüse, Cashewnüssen und Austernsauce.'
    },
    {
        'name': 'Hähnchenfleisch Shanghai Art',
        'price': '13.90',
        'description': 'Hähnchenfleisch mariniert in weicher Buttercreme mit duftenden Gewürzen und gegrillt, serviert mit Joghurt-Safransauce.'
    },
    {
        'name': 'Gebratener Tintenfisch',
        'price': '9.20',
        'description': 'ebratener Reis mit Krabben, Hähnchenfleisch und Schinken.'
    },
    {
        'name': 'Entenfleisch Spezialitäten',
        'price': '12.10',
        'description': 'mit Rindfleisch, gebratenen Krabben, Gemüse und Spezialsauce.'
    },
    {
        'name': 'Rindfleisch Fujian (scharf)',
        'price': '14.90',
        'description': 'In Indien kennen wir viele Zubereitungsarten, In unserer Küche bieten wir Ihnen leicht gewürzt an.'
    },
    {
        'name': 'Zukijaki',
        'price': '11.20',
        'description': 'mit Gemüse, Kartoffeln, Karotten, Erbsen, frischem Koriander, Chili, Gewürzmischung, Sojasauce und Zitrone, scharf gewürzt.'
    }
];
let basketArray = []; // Bestellposition
let pricesArray = []; // Preise
let amountsArray = [];  // Portionen

let messageArray = []; // Anmerkungen
let totalCostArray = [] // Gesamtpreis

function render() {
    let foodVariants = document.getElementById('foodVariants');
    foodVariants.innerHTML = '';

    for (let i = 0; i < foodInventory.length; i++) {
        foodVariants.innerHTML +=
            `
            <div class="foodPlate" onclick="addFood(${i},${foodInventory[i]['price']},${1})">
                <div class="plusDisplay">
                    <!-- <img src="./img/plus.png" alt="plus" loading="lazy"> -->
                    <h5 id="plusDisplay${i}">+</h5>
                </div>
                <div class="foodContainer">
                    <div class="foodText">
                        <h2 id="foodName${i}">${foodInventory[i]['name']}</h2>
                        <p id="foodDescription${i}">${foodInventory[i]['description']}</p>
                    </div>
                    <span id="foodPrice${i}">${foodInventory[i]['price'].replace('.', ',')} €</span>
                </div>
                <div class="plate">
                    <img src="./img/chineseFood_${i}.png" alt="foodPlate" loading="lazy">
                </div>
            </div>
            `;
    }
}

function emptyBasket() {
    document.getElementById('shoppingCart').classList.remove('d-none');
    document.getElementById('foodSelection').style.maxWidth = 'calc(100% - 344px)';
    document.getElementById('orderListingBasket').classList.add('d-none');
    document.getElementById('orderListing').classList.remove('scroll');
    document.getElementById('minimumOrder').classList.add('d-none');

    let order = document.getElementById('orderListing');
    order.innerHTML = '';
    order.innerHTML = `
            <img class="basketImg" src="./img/basket.png" alt="basket" loading="lazy">
            <h2>Fülle deinen Warenkorb</h2>
            <p>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
        `;
}

function minimumOrder(difference) {
    let minimum = document.getElementById('minimumOrder');

    minimum.innerHTML =
        `
            <div class="minimumCost">
                <span class="amountNeeded">Benötigter Betrag, um den Mindestbestellwert zu erreichen</span>
                <span class="amountCost">${difference}&nbsp;€</span>
            </div>
            <p> Bestell und Lieferung erst ab einem Mindestbestellwert von 25,00 € (exkl. Lieferkosten).</p>
        `;
}

function orderListingBasket() {
    let order = document.getElementById('orderListingBasket');
    document.getElementById('orderListingBasket').classList.remove('d-none');

    order.innerHTML = `
            <div class="costOverview">
            <div class="costDivision">
                <span>Zwischensumme</span>
                <span id="subtotal">0 €</span>
            </div>
            <div class="costDivision">
                <span>Lieferkosten</span>
                <span id="deliveryCosts">0 €</span>
            </div>
            <div class="costDivisionLast">
                <strong>Gesamt</strong>
                <span id="totalCost">0 €</span>
            </div>
            <button onclick="payNow()" id="payButton">Bezahlen (0 €)</button>
            </div>
        `;
}

function orderListing() {
    document.getElementById('orderListing').classList.add('scroll');
    document.getElementById('shoppingCart').classList.remove('d-none');
    document.getElementById('foodSelection').style.maxWidth = 'calc(100% - 344px)';

    let order = document.getElementById('orderListing');
    order.innerHTML = '';
    pricesArray = [];

    for (let y = 0; y < basketArray.length; y++) {

        z = basketArray[y];
        document.getElementById('plusDisplay' + z).innerHTML = '+';

        if (amountsArray[y] == 0) {
            basketArray.splice(y, 1);
            messageArray.splice(y,1);
        }
    }

    if (basketArray.length == 0) {
        emptyBasket();
    } else {

        for (let i = 0; i < basketArray.length; i++) {
            let x = basketArray[i];

            document.getElementById('plusDisplay' + x).innerHTML = amountsArray[i]

            order.innerHTML +=
                `
                <div class="orderContainer">
                    <div class="orderNr">${amountsArray[i]}</div>
                    <div class="order">
                        <div class="orderTitle">
                            <strong>${foodInventory[x]['name']}</strong>
                            <span class="priceWith">${foodInventory[x]['price'].replace('.', ',')}&nbsp;€</span>
                        </div>
                        <div class="choosePortions">
                            <span onclick="inputButton(${basketArray[i]})">Anmerkung hinzufügen</span>
                            <div class="choose">
                                <img class="minusButton" onclick="minusButton(${basketArray[i]})" src="./img/minus.png" alt="minus"
                                    loading="lazy">
                                <img class="plusButton" onclick="plusButton(${basketArray[i]})" src="./img/plus.png" alt="plus"
                                    loading="lazy">
                            </div>
                        </div>                    
                        <div class="inputBox">
                        <!--<form onsubmit="formValidation()"> -->
                                <div class="inputDisplay d-none" id="inputDisplay${basketArray[i]}">
                                    <input class="inputMessage" type="text" id="inputMessage${basketArray[i]}" required minlength="3" maxlength="22" placeholder="Hier hinzufügen!">
                                    <div class="buttonMessage">
                                        <button onclick="canselMessage(${basketArray[i]})">Abbrechen</button>
                                        <button onclick="addMessage(${basketArray[i]})">Hinzufügen</button>
                                    </div>
                                </div>
                                <span class="getMessage" id="getMessage${basketArray[i]}">${messageArray[i]}</span>
                                <!--</form> -->
                        </div>
                    </div>
                </div>
                `;
            orderListingBasket();

            pricesArray.push(foodInventory[x]['price']);
            costOverview();
        }
    }
}

function addFood(namePosition, price, amount) {
    let nrPosition = basketArray.indexOf(namePosition);

    if (nrPosition == -1) {
        basketArray.push(namePosition);
        pricesArray.push(price);
        amountsArray.push(amount);
        messageArray.push('');
    } else {
        amountsArray[nrPosition]++;
    }
    orderListing();
}

function inputButton(orderNumber) {
    document.getElementById('inputDisplay' + orderNumber).classList.toggle('d-none');
}

function addMessage(orderNumber) {
    let input = document.getElementById('inputMessage' + orderNumber).value;

    let x = basketArray.indexOf(orderNumber);
    messageArray.splice(x, 1, input);

    document.getElementById('inputDisplay' + orderNumber).classList.toggle('d-none');
    orderListing();
}

function canselMessage(orderNumber) {
    addMessage(orderNumber);
}

function minusButton(orderNumber) {
    let x = basketArray.indexOf(orderNumber); // position von Warenkorb bestimmen

    if (amountsArray[x] > 0) {
        amountsArray[x]--;
        orderListing();
    }
    if (amountsArray[x] == 0) {
        amountsArray.splice(x, 1);
        totalCostArray.splice(x, 1);
        orderListing();
    }
}

function plusButton(orderNumber) {
    let x = basketArray.indexOf(orderNumber); // position von Warenkorb bestimmen
    amountsArray[x]++;
    orderListing();
}

function costOverview() {
    let cost = 0;
    let deliveryCosts = 2.00; // Versandkosten

    for (let i = 0; i < amountsArray.length; i++) {
        totalCostArray[i] = pricesArray[i] * amountsArray[i];

        cost += parseFloat(totalCostArray[i]);

        if (amountsArray.length == 0) {
            cost = 0;
        }
    }

    let y = deliveryCosts + cost;
    let difference = 25 - y;

    if (y < 25) {
        document.getElementById('minimumOrder').classList.remove('d-none');
        minimumOrder(difference.toFixed(2).replace('.', ','));
    };
    if (y > 25) {
        document.getElementById('minimumOrder').classList.add('d-none');
    };

    y = y.toFixed(2).replace('.', ',');

    let amount = 0;
    for (let index = 0; index < amountsArray.length; index++) {
        amount += amountsArray[index];
    }

    document.getElementById('subtotal').innerHTML = cost.toFixed(2).replace('.', ',') + ' €';
    document.getElementById('deliveryCosts').innerHTML = deliveryCosts.toFixed(2).replace('.', ',') + ' €';
    document.getElementById('totalCost').innerHTML = y + ' €';
    document.getElementById('payButton').innerHTML = `Bezahlen (${y}) €`;

    document.getElementById('basketTotalPrice').innerHTML = 'Warenkorb (' + y + ')&nbsp;€';
    document.getElementById('basketIcon').innerHTML = amount;
}

function payNow() {
    console.log('Ende');
}

function closeBasket() {
    basketButton();
}

function basketButton() {
    document.getElementById('shoppingCart').classList.toggle('shoppingCartResponsive');
    document.getElementById('body').classList.toggle('bodyOverflow');
    document.getElementById('closeIcon').classList.toggle('d-none');
}

// window.onscroll = function () {
//     let shoppingCart = document.getElementById('shoppingCart');

//     let scroll = Math.trunc(window.scrollY);

//     if (scroll < 69) {
//         shoppingCart.style.position = 'absolute';
//         shoppingCart.style.top = '69px';

//         shoppingCart.style.maxHeight = `calc(89vh + ${scroll}px)`;
//     }

//     if (scroll > 69) {
//         shoppingCart.style.position = 'fixed';
//         shoppingCart.style.top = '0px';
//     }
// };