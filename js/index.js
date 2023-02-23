// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const clearFilterButton = document.querySelector('.clear__filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const WeightInput = document.querySelector('.weight__input'); // поле с весом
const maxWeightInput = document.querySelector('.maxweight__input'); // поле с весом
const minWeightInput = document.querySelector('.minweight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;


// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);
let oldFruits = [];
/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  fruitsList.innerHTML = "";
  // чтобы заполнить актуальными данными из fruits

  for (let i = 0; i < fruits.length; i++) {
    
	  let fruit = document.createElement('li');
    fruit.classList.add('fruit__item');
    fruit.classList.add('fruit_grey');
    let fruitinfo = document.createElement('div');
    fruitinfo.classList.add('fruit__info');
    let index = document.createElement('div');
	  index.innerHTML = "index: " + i;
    let kind = document.createElement('div');
	  kind.innerHTML = "kind: " + fruits[i].kind;
    let color = document.createElement('div');
	  color.innerHTML = "color: " + fruits[i].color;
    let weight = document.createElement('div');
	  weight.innerHTML = "weight: " + fruits[i].weight;
	  fruitsList.appendChild(fruit);
    fruit.appendChild(fruitinfo);
    fruitinfo.appendChild(index).appendChild(kind).appendChild(color).appendChild(weight);
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  let oldStringFruits = JSON.stringify(fruits);
  while (fruits.length > 0) {


    var randomInt = getRandomInt(0, fruits.length - 1);

    result.push((fruits.splice(randomInt, 1))[0]);


    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    
  }
  if(oldStringFruits === JSON.stringify(result)){
    alert("случайно список пересобрался в точно такой же");
  }
  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  if(fruits.length > oldFruits.length){
    oldFruits = fruits;
  }
  fruits = fruits.filter((item) => {
    return ((item.weight>minWeightInput.value) && (item.weight<maxWeightInput.value));
  });
};

//Очистка фильтрации


filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});



const clearFilterFruits = () => {
  
  if(fruits.length < oldFruits.length){
    fruits = oldFruits;
  }
}

clearFilterButton.addEventListener('click', () => {
  clearFilterFruits();
  display();
});
/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

//цвета в алфавитном порядке
const comparationColor = (a, b) => {
  return a.color.toLowerCase() > b.color.toLowerCase();  
};
const comparationColorAnti = (a, b) => {
  return a.color.toLowerCase() < b.color.toLowerCase();  
};

const sortAPI = {
  bubbleSort(arr, comparation) {

    for (let i = 0; i < arr.length-1; i++) { 
      for (let j = 0; j < arr.length-1-i; j++) { 
          if (comparation(arr[j], arr[j+1])) { 
              let temp = arr[j+1]; 
              arr[j+1] = arr[j]; 
              arr[j] = temp; 
          }
      }
  }  
    // TODO: допишите функцию сортировки пузырьком
  },

  quickSort(arr, comparation) {

    arr = quickSortTrue(arr);
    // TODO: допишите функцию быстрой сортировки
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
    if(sortKind == "bubbleSort"){
      sortKind = "quickSort";
    }else{
      sortKind = "bubbleSort";
    }
    sortKindLabel.textContent = sortKind;
    sortTimeLabel.textContent = sortTime = "-";
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'

  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  if(kindInput.value.trim() == '' || colorInput.value.trim() == '' || !(Number(WeightInput.value)>0)){
    alert("Некорректный ввод данных.");
  }
  else{
    var newFruit = {"kind": kindInput.value, "color": colorInput.value, "weight": WeightInput.value};
    fruits.push(newFruit);
    oldFruits.push(newFruit);
    // TODO: создание и добавление нового фрукта в массив fruits
    // необходимые значения берем из kindInput, colorInput, weightInput
    display();
  }
});











// алгоритм быстрой сортировки

function swap(items, firstIndex, secondIndex){
  const temp = items[firstIndex];
  items[firstIndex] = items[secondIndex];
  items[secondIndex] = temp;
}

// функция разделитель
function partition(items, left, right) {
  var pivot = items[Math.floor((right + left) / 2)],
      i = left,
      j = right;
  while (i <= j) {
      while (comparationColorAnti(items[i], pivot)) {
          i++;
      }
      while ((comparationColor(items[j], pivot))) {
          j--;
      }
      if (i <= j) {
          swap(items, i, j);
          i++;
          j--;
      }
  }
  return i;
}

function quickSortTrue(items, left, right) {
  var index;
  if (items.length > 1) {
      left = typeof left != "number" ? 0 : left;
      right = typeof right != "number" ? items.length - 1 : right;
      index = partition(items, left, right);
      if (left < index - 1) {
        quickSortTrue(items, left, index - 1);
      }
      if (index < right) {
        quickSortTrue(items, index, right);
      }
  }
  return items;
}