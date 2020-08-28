let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

let fruits = JSON.parse(fruitsJSON);

//_____________________
// ОТОБРАЖЕНИЕ

const display = (arr) => {
  const fruitsList = $('.fruits__list');

  for (let i = 0; i < arr.length; i++) {
    // TODO: формируем новый элемент <li>, как указано в разметке и добавляем на страницу
  }
};

// первая отрисовка карточек
display(fruits);

//_____________________
// ПЕРЕМЕШИВАНИЕ

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = (arr) => {
  let result = [];

  while (arr.length > 0) {
    // TODO: допишите функцию перемешивания массива (нетривиальная задача)
    // подсказка: вырезаем случайный элемент из arr, используя getRandomInt и вставляем в result
  }

  arr = result;
};

$('.shuffle__btn').click((e) => {
  shuffleFruits(fruits);
  display(fruits);
});

//_____________________
// ФИЛЬТРАЦИЯ

// фильтрация массива
const filterFruits = (arr) => {
  arr.filter((item) => {
    // TODO: опишите функцию-фильтр
  });
};

$('.filter__btn').click((e) => {
  filterFruits(fruits);
  display(fruits);
});

//_____________________
// СОРТИРОВКА

// инициализация состояния
let sortKind = 'bubbleSort';
let sortTime = '-';

// сравнение двух элементов
const comparationColor = (a, b) => {
  // TODO: допишите функцию
};

// API блока сортировки
const sortAPI = {
  // вывести название сортировки
  setSortKind() {
    $('.sort__kind').text(sortKind);
  },

  // получить название сортировки
  getSortKind() {
    return sortKind;
  },

  // вывести время сортировки
  setSortTime() {
    $('.sort__time').text(sortTime);
  },

  // сортировка пузырьком
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию
  },

  // быстрая сортировка
  quickSort(arr, comparation) {
    // TODO: допишите функцию
  },

  // выполняет сортировку и производит замер времени
  startSort(currentSort, arr, currentComparation) {
    const start = new Date().getTime();
    currentSort(arr, currentComparation);
    const end = new Date().getTime();
    return `${end - start} ms`;
  },
};

// инициализация полей при первом запуске ПО
sortAPI.setSortKind();
sortAPI.setSortTime();

$('.sort__action__btn').click((e) => {
  // TODO: установить время сортировки в значение 'sorting...'
  const sortKind = sortAPI.getSortKind();
  const currentSort = sortAPI[sortkind];
  const currentComparation = comparationColor;
  const timeSorting = sortAPI.startSort(currentSort, fruits, currentComparation);
  display(fruits);
  // TODO: установить время сортировки в значение timeSorting
});

//_____________________
// ДОБАВИТЬ ФРУКТ

// создание и добавление нового фрукта
const addFruit = () => {
  // TODO: допишите функцию
};

$('.add__action__btn').click((e) => addFruit());
