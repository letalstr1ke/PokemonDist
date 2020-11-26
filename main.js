import Pokemon from "./js/pokemon.js";
import random from "./js/utils.js";

const $abilities = document.querySelector('#abilities');
const $logger = document.querySelector('#logs');

const player1 = new Pokemon({
  name: 'Pikachu',
  type: 'electric',
  hp: 500,
  selectors: 'character',
  abilities: [
    {
      name: 'Thunder Jolt',
      damage: random(15),
      charges: 6,
    },
    {
      name: 'Pika Papow',
      damage: random(25),
      charges: 4,
    }
  ],
});

const player2 = new Pokemon({
  name: 'Charmander',
  type: 'fire',
  hp: 400,
  selectors: 'enemy',
});

function init() {
  initCharakterAbilities(player1);
}

function initCharakterAbilities(person) {

  for(let i = 0; i < person.abilities.length; i++){

    const abilityButton = document.createElement('button');

    abilityButton.classList.add('button');
    abilityButton.innerText = person.abilities[i].name;

    const clickHandler = clicksCount(person.abilities[i].charges, person.abilities[i].name);

    abilityButton.addEventListener('click', function(){

      if(!clickHandler()){
        this.disabled = true;
        return;
      }
      player2.changeHP(random(person.abilities[i].damage), function(count) {
        generatorLog(player1, player2, count)
      });

    });  

    $abilities.appendChild(abilityButton);
  }

}

function disableAllAbilities() {
  const $buttons = $abilities.querySelectorAll('.button');

  for(let i = 0; i < $buttons.length; i++){
    $buttons[i].disabled = true;
  }

}

function generatorLog(firstPerson, secondPerson, count){
  const logs = [
    `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага. -${count} [${firstPerson.hp.current}]`,
    `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага. -${count} [${firstPerson.hp.current}]`,
    `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил. -${count} [${firstPerson.hp.current}]`,
    `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар. -${count} [${firstPerson.hp.current}]`,
    `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника. -${count} [${firstPerson.hp.current}]`,
    `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар. -${count} [${firstPerson.hp.current}]`,
    `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар. -${count} [${firstPerson.hp.current}]`,
    `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника -${count} [${firstPerson.hp.current}]`,
    `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника. -${count} [${firstPerson.hp.current}]`,
    `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику -${count} [${firstPerson.hp.current}]`,
  ];

  const $p = document.createElement('p');
  $p.innerText = logs[random(logs.length) -1];
  $logger.insertBefore($p, $logger.children[0]);

}

function clicksCount(counter, name) {
  
  return function () {
    
    const $p = document.createElement('p');
    $p.style = 'color:red;';
    $p.innerText = `Осталось ${--counter} зарядов у способности ${name}`; 
    $logger.insertBefore($p, $logger.children[0]);

    return counter > 0 ? true : false;
  }

}


init();
