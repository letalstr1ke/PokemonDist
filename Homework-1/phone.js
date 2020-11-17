// const inputPhone = prompt('Введите номер телефона');

const phone = '+79787190678';

function validatePhone(phone){
  if(phone.length < 11){
    return 'Неверный формат!';
  }
  let result = '';

  for(let i = 0; i < phone.length; i++){
    if(i === 2){
      result += ' (';
    }else if(i === 5){
      result += ') ';
    }else if(i === 8 || i === 10){
      result += '-';
    }
    result += phone.charAt(i);
  }

  return result;
}

console.log(validatePhone(phone));