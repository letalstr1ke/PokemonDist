import Pokemon from "./pokemon.js";
import random from "./utils.js";
import Network from './network.js';

class GameController{
  constructor() {
    this.player1 = undefined;

    this.player2 = undefined;

    this.$abilities = document.querySelector('#abilities');
    this.$logger = document.querySelector('#logs');

    this.gameState = '';

    document.querySelector('.playground').classList.add('inActive');
    document.getElementById('startGame').addEventListener('click', () => {
      this.startGame();
      document.querySelector('.playground').classList.remove('inActive');
      document.getElementById('startGame').style.display = 'none';
    });
  }

  startGame =  async () => {
    const pokemons = await this.getAllPokemons();
    const pikachu = pokemons.find(item => item.name === 'Pikachu');
    const enemy = pokemons[random(0, pokemons.length - 1)];

    this.player1 = new Pokemon({
      ...pikachu,
      selectors: 'player1',
      gameController: this,
    });

    this.player2 = new Pokemon({
      ...enemy,
      selectors: 'player2',
      gameController: this,
    });

    this.player1.attacks.forEach( item => {

      const abilityButton = document.createElement('button');
      abilityButton.classList.add('button');
      abilityButton.innerText = `${item.name} (${item.maxCount})`;
      const clickHandler = this.clicksCount(item.maxCount, item.name, abilityButton);

      abilityButton.addEventListener('click',  () => {
        if (!clickHandler()) {
          abilityButton.disabled = true;
          return;
        }
        this.player2.changeHP(random(item.minDamage, item.maxDamage), (count) => {
          this.generatorLog(this.player1, this.player2, count);
        });

      });

      this.$abilities.appendChild(abilityButton);

    });
  }

  resetGame = async () => {
    const pokemons = await this.getAllPokemons();
    const enemy = pokemons[random(0, pokemons.length - 1)];

    this.player2 = new Pokemon({
      ...enemy,
      selectors: 'player2',
      gameController: this,
    });

  }

  playerLost = (player) => {
    // alert(`${player.name} проиграл бой!`);
    this.resetGame();
  }

  clicksCount = (counter, name, $btn) => {

    return () =>  {

      const $p = document.createElement('p');
      $p.style = 'color:red;';
      $p.innerText = `Осталось ${--counter} зарядов у способности ${name}`;
      this.$logger.insertBefore($p, this.$logger.children[0]);
      $btn.innerText = `${name} (${counter})`;

      return counter > 0 ? true : false;
    }

  }

  generatorLog = (firstPerson, secondPerson, count) => {
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
    $p.innerText = logs[random(0, logs.length -1)];
    this.$logger.insertBefore($p, this.$logger.children[0]);

  }

  getAllPokemons = async () => {
    const q = await fetch(`https://reactmarathon-api.netlify.app/api/pokemons`);
    const body = await q.json();

    return body;
  }

}

export default GameController;
