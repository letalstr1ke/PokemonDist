class Selectors{
  constructor(name) {
    this.elHP = document.getElementById(`health-${name}`);
    this.elProgressbar = document.getElementById(`progressbar-${name}`);
  }
}

class Pokemon extends Selectors{
  constructor({name, hp, type, selectors, abilities}){
    super(selectors);

    this.name = name;
    this.hp = {
      current: hp,
      total: hp,
    };
    this.type = type;
    this.abilities = abilities;

    this.renderHP();
  }

  changeHP = (count, cb) => {
    this.hp.current -= count;
  
    if(this.hp.current <= 0){
      this.hp.current = 0;
      alert(this.name + 'Проиграл бой!');
      disableAllAbilities();
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

}

export default Pokemon;
