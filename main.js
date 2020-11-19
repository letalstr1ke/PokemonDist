// const $btn = document.getElementById('btn-kick');
const $abilities = document.getElementById('abilities');

const character = {
  name: 'Pikachu',
  defaultHP: 100,
  damageHP: 100,
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
  ]
}

const enemy = {
  name: 'Charmander',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-enemy'),
  elProgressbar: document.getElementById('progressbar-enemy'),
}

// $btn.addEventListener('click', function() {
//   changeHP(random(15), character);
//   changeHP(random(15), enemy);
// });

function init() {
  renderHP(character);
  renderHP(enemy);
  initCharakterAbilities(character);
}

function renderHP(person) {
  renderHPLife(person);
  renderHPProgressbar(person);
}

function renderHPLife(person) {
  person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
}

function renderHPProgressbar(person) {
  person.elProgressbar.style.width = person.damageHP + '%';
}

function changeHP(count, person){
  if(person.damageHP < count){
    person.damageHP = 0;

    alert(person.name + 'Проиграл бой!');

    // $btn.disabled = true;
    disableAllAbilities();

  }else{
    person.damageHP -= count;
  }

  renderHP(person);
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

      changeHP(random(person.abilities[i].damage), enemy);

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

init();