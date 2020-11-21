const $abilities = document.querySelector('#abilities');
const $logger = document.querySelector('#logs');

const character = {
  name: 'Pikachu',
  defaultHP: 100,
  damageHP: 100,
  hp: {
    current: 100,
    total: 100,
  },
  elHP: document.getElementById('health-character'),
  elProgressbar: document.getElementById('progressbar-character'),
  abilities: [
    {
      name: 'Thunder Jolt',
      damage: random(15)
    },
    {
      name: 'Pika Papow',
      damage: random(25)
    }
  ],
  renderHP: renderHP,
  renderHPLife: renderHPLife,
  renderHPProgressbar: renderHPProgressbar,
  changeHP: changeHP,
}

const enemy = {
  name: 'Charmander',
  defaultHP: 100,
  damageHP: 100,
  hp: {
    current: 150,
    total: 150,
  },
  elHP: document.getElementById('health-enemy'),
  elProgressbar: document.getElementById('progressbar-enemy'),
  renderHP: renderHP,
  renderHPLife: renderHPLife,
  renderHPProgressbar: renderHPProgressbar,
  changeHP: changeHP,
}

function init() {
  character.renderHP();
  enemy.renderHP();
  initCharakterAbilities(character);
}

function renderHP() {
  this.renderHPLife();
  this.renderHPProgressbar();
}

function renderHPLife() {
  this.elHP.innerText = this.hp.current + ' / ' + this.hp.total;
}

function renderHPProgressbar() {  
  this.elProgressbar.style.width = Math.floor( (this.hp.current/this.hp.total) * 100 ) + '%';
}

function changeHP(count){
  this.hp.current -= count;

  const log = this === enemy ? generatorLog(this, character, count) : generatorLog(this, enemy, count);

  if(this.hp.current <= 0){
    this.hp.current = 0;
    alert(this.name + 'Проиграл бой!');
    disableAllAbilities();
  }

  this.renderHP();
}

function random(num) {
  return Math.ceil(Math.random() * num);
}

function initCharakterAbilities(person) {

  for(let i = 0; i < person.abilities.length; i++){

    const abilityButton = document.createElement('button');

    abilityButton.classList.add('button');
    abilityButton.innerText = person.abilities[i].name;

    abilityButton.addEventListener('click', function(){

      enemy.changeHP(random(person.abilities[i].damage));

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



init();