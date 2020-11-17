const firstRow = 'мама мыла раму';
const secondRow = 'собака друг человека';

const letter = prompt('Введите букву для поиска');
function getRow(firstRow, secondRow) {
  return getCharEntriesCount(letter, firstRow) > getCharEntriesCount(letter, secondRow) ? firstRow : secondRow;
}

function getCharEntriesCount(char, str) {
  let result = 0;
  for(let i = 0; i < str.length; i++){
    if(str.charAt(i) === char){
      result++;
    }
  }
  console.log(result);
  return result;
}

console.log(getRow(firstRow, secondRow));