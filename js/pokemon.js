class Selectors{
  constructor(name) {
    this.elHP = document.getElementById(`health-${name}`);
    this.elProgressbar = document.getElementById(`progressbar-${name}`);
    this.root = document.querySelector(`.${name}`);
    this.elImg = this.root.querySelector('img');
    this.elName = this.root.querySelector('.name');
  }
}

class Pokemon extends Selectors{
  constructor({name, hp, type, selectors, attacks, img, gameController}){
    super(selectors);

    this.name = name;
    this.hp = {
      current: hp,
      total: hp,
    };
    this.type = type;
    this.attacks = attacks;
    this.img = img;
    this.gameController = gameController;
    this.renderHP();
    this.renderCard();
  }

  changeHP = (count, cb) => {
    this.hp.current -= count;
  
    if(this.hp.current <= 0){
      this.hp.current = 0;
      this.gameController.playerLost(this);
    }
  
    this.renderHP();
    cb && cb(count);
  }

  renderHP = () => {
    this.renderHPLife();
    this.renderHPProgressbar();
  }
  
  renderHPLife = () => {
    this.elHP.innerText = this.hp.current + ' / ' + this.hp.total;
  }
  
  renderHPProgressbar = () => {  
    this.elProgressbar.style.width = Math.floor( (this.hp.current/this.hp.total) * 100 ) + '%';
  }

  renderCard = () => {
    this.elImg.src = this.img;
    this.elName.innerText = this.name;
  }
}

export default Pokemon;
