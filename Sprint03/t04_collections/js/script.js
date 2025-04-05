const guestList = new WeakSet();
const guest1 = { name: 'John' };
const guest2 = { name: 'Misha' };
const guest3 = { name: 'Laya' };
const guest4 = { name: 'Rostick' };
const guest5 = { name: 'Svetlana' };

guestList.add(guest1);
guestList.add(guest2);
guestList.add(guest3);
guestList.add(guest4);
guestList.add(guest5);

// Тести для WeakSet
console.log("Is John in the guest list?", guestList.has(guest1)); // true
console.log("Is Misha in the guest list?", guestList.has(guest2)); // true
console.log("Is Laya in the guest list?", guestList.has({ name: 'Laya' })); // false, це новий об'єкт
guestList.delete(guest1);
console.log("Is John in the guest list after removal?", guestList.has(guest1)); // false

const menu = new Map([
    ['Pizza', 9],
    ['Burger', 22],
    ['Pasta', 12],
    ['Soup', 8],
    ['mivina', 9999]
]);

// Тести для Map
menu.set("Salad", 6);
console.log("Menu items with prices:");
menu.forEach((price, dish) => {
    console.log(`${dish}: $${price}`);
});
console.log("Price of Pasta:", menu.get('Pasta')); // 12
menu.delete('Soup');
console.log("Menu after deleting Soup:", menu);
console.log('Soup has on menu? ', menu.has('Soup'));
console.log('Size: ', menu.size);
menu.clear();

const bankVault = new WeakMap();
const informMasha = { username: 'qwerty123', password: 'qwe1212' };
const informMisha = { username: 'ytrewq123', password: 'mivina228' };
const informAndrey = { username: 'djdchd', password: 'mivina338' };
const informStepa = { username: 'ocsds', password: 'mivina488' };
const informArcadiy = { username: 'asdsds', password: 'mivina688' };

bankVault.set(informMasha, 'Secret Document');
bankVault.set(informMisha, 'Gold Bars');
bankVault.set(informAndrey, 'Golden Rings');
bankVault.set(informStepa, 'mivina');
bankVault.set(informArcadiy, 'umbrella');

console.log("Misha in box has:", bankVault.get(informMisha)); // Gold Bars
console.log("Masha in box has:", bankVault.get(informMasha)); // Secret Document
console.log("Andrey in box has:", bankVault.get(informAndrey)); 
console.log("Stepa in box has:", bankVault.get(informStepa)); 
console.log("Arcadiy in box has:", bankVault.get(informArcadiy)); 
// Неможливо отримати значення для нового об'єкта
console.log(bankVault.get({ username: 'qwerty123' })); // undefined
console.log(bankVault.has('Secret Document')) // false


const coinCollection = new Set();
coinCollection.add("Bitcoin");
coinCollection.add("Ethereum");
coinCollection.add("Dogecoin");
coinCollection.add("Litecoin");
coinCollection.add("Ripple");

// Тести для Set
console.log("Coin Collection:");
coinCollection.forEach(coin => {
    console.log(coin);
});
console.log("Does coin collection contain Bitcoin?", coinCollection.has("Bitcoin")); // true
coinCollection.delete("Dogecoin");
console.log("Coin Collection after removal of Dogecoin:");
coinCollection.forEach(coin => {
    console.log(coin);
});
console.log("Size of coin collection:", coinCollection.size); // 4
coinCollection.clear();
console.log("Size after clearing:", coinCollection.size); // 0