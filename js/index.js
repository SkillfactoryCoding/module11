// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;
// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

// цвет фруктов
const classArray = [{
  "fruit_violet": "фиолетовый",
  "fruit_green": "зеленый",
  "fruit_carmazin": "розово-красный",
  "fruit_yellow": "желтый",
  "fruit_lightbrown": "светло-коричневый"
}];

// /*** ОТОБРАЖЕНИЕ ***/
//функция поиска ключа по значению (нужна для заливки соответсвующим цветом рамку элемента)
Object.prototype.getKeyByValue = function (value, objs) {
  // защита от циклических ссылок
  if (!objs)
    objs = [];
  for (var prop in this) {
    if (this.hasOwnProperty(prop)) {
      if (this[prop] === value) {
        return prop;
      } else if (typeof this[prop] === "object" && objs.indexOf(this[prop]) == -1) {
        objs.push(this[prop]);
        var res = this[prop].getKeyByValue(value, objs);
        if (res)
          return res;
      }
    }
  }
}
// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  while (fruitsList.firstChild) fruitsList.removeChild(fruitsList.firstChild);
  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    const valArr = fruits[i].color;
    let li = document.createElement('li');
    li.className = 'fruit__item ' + classArray.getKeyByValue(valArr);
    //li_1.innerHTML = 'Первый элемент';
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    fruitsList.appendChild(li);
    let div = document.createElement('div');
    div.className = 'fruit__info';
    li.appendChild(div);
    let div_1 = document.createElement('div');
    let index = 'index: ' + i;
    div_1.appendChild(document.createTextNode(index));
    div.appendChild(div_1);
    let div_2 = document.createElement('div');
    div_2.appendChild(document.createTextNode('kind: ' + fruits[i].kind));
    div.appendChild(div_2);
    let div_3 = document.createElement('div');
    div_3.appendChild(document.createTextNode('color: ' + fruits[i].color));
    div.appendChild(div_3);
    let div_4 = document.createElement('div');
    div_4.appendChild(document.createTextNode('weight: ' + fruits[i].weight));
    div.appendChild(div_4);
  }
};
// первая отрисовка карточек
display();


shuffleButton.addEventListener('click', () => {
  let temp = JSON.stringify(fruits);
  shuffleFruits();
  if (temp === JSON.stringify(fruits)) alert('Порядок не изменился!');
  display();
});

/*** ПЕРЕМЕШИВАНИЕ ***/
// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    let r = getRandomInt(0, fruits.length - 1);
    let elem = fruits.splice(r, 1)[0];
    result.push(elem);
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
  }
  if (JSON.stringify(fruits) === JSON.stringify(result)) {
    alert('Порядок элементов не изменился!')
  } else {
    fruits = result;
  }
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/
// фильтрация массива
const filterFruits = () => {
  let result = [];
  console.log();
  let minWeight = document.querySelector('.minweight__input').value;
  let maxWeight = document.querySelector('.maxweight__input').value;
  if ((minWeight === '') || (maxWeight === '')) {
    alert('Одно или несколько полей незаполнены.')
  } else {
    result = fruits.filter((item) => {
      if ((item.weight >= minWeight) && (item.weight <= maxWeight)) {
        return true;
      } else {
        return false;
      }
    });
    // TODO: допишите функцию
    fruits = result;
  }
}
filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});
/*** СОРТИРОВКА ***/
let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки
const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  if (a.color === b.color) {
    return 0;
  }
  return a.color < b.color ? -1 : 1;
};
//Функция обмена элементов
function swap(fruits, firstIndex, secondIndex) {
  const temp = fruits[firstIndex];
  fruits[firstIndex] = fruits[secondIndex];
  fruits[secondIndex] = temp;
};
//функция разделитель
function partition(fruits, left, right) {
  var pivot = fruits[Math.floor((right + left) / 2)],
    i = left,
    j = right;
  while (i <= j) {
    while (fruits[i] < pivot) {
      i++;
    }
    while (fruits[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(fruits, i, j);
      i++;
      j--;
    }
  }
  return i;
};

const comparationWeight = (fruit1, fruit2) => {
  return fruit1.weight > fruit2.weight;
};

const sortAPI = {
  //функция сортировки пузырьком
  bubbleSort(arr, comparation) {
    for (let i = 0, endI = arr.length - 1; i < endI; i++) {
      let wasSwap = false;
      for (let j = 0, endJ = endI - i; j < endJ; j++) {
        if (comparation(arr[j], arr[j + 1])) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          wasSwap = true;
        }
      }
      if (!wasSwap) break;
    }
    return arr;
  },

  //функция быстрой сортировки
  quickSort(arr, comparation) {
    // функция обмена элементов
    function swap(arr, firstIndex, secondIndex) {
      [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];
    }

    // функция разделитель
    function partition(arr, comparation, left, right) {
      let pivot = arr[Math.floor((right + left) / 2)],
        i = left,
        j = right;
      while (i <= j) {
        while (comparation(pivot, arr[i])) {
          i++;
        }
        while (comparation(arr[j], pivot)) {
          j--;
        }
        if (i <= j) {
          swap(arr, i, j);
          i++;
          j--;
        }
      }
      return i;
    }

    // алгоритм быстрой сортировки
    function quickSortAlg(arr, comparation, left = 0, right = arr.length - 1) {
      let index;
      if (arr.length > 1) {
        index = partition(arr, comparation, left, right);
        if (left < index - 1) {
          quickSortAlg(arr, comparation, left, index - 1);
        }
        if (index < right) {
          quickSortAlg(arr, comparation, index, right);
        }
      }
      return arr;
    }

    // Прежний вариант
    function quickSort(fruits, left, right) {
      var index;
      if (parseInt(fruits.length) > 1) {
        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? fruits.length - 1 : right;
        index = partition(fruits, left, right);
        if (left < index - 1) {
          quickSort(fruits, left, index - 1);
        }
        if (index < right) {
          quickSort(fruits, index, right);
        }
      }
      return fruits;
    };
    // Новый
    function quickSort(fruits, left, right) {
      var index;
      if (parseInt(fruits.length) > 1) {
        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? fruits.length - 1 : right;
        index = partition(fruits, left, right);
        if (left < index - 1) {
          quickSort(fruits, left, index - 1);
        }
        if (index < right) {
          quickSort(fruits, index, right);
        }
      }
      return fruits;
    };
    // запуск быстрой сортировки
    quickSortAlg(arr, comparation);
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

// переключение типа сортировки 
sortChangeButton.addEventListener('click', () => {
  (sortKind == 'bubbleSort') ? sortKind = 'quickSort' : sortKind = 'bubbleSort';
  // вывод текущего типа сортировки
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  // Вывод в sortTimeLabel значение 'sorting...'
  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // Вывод в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});

addActionButton.addEventListener('click', () => {
  // проверяем заполнение всех полей
  if (kindInput.value == 0 || colorInput.value == 0 || weightInput.value == 0) {
    alert('Не заполнено одно из полей при добавлении нового элемента!');
  }
  else {
    fruits.push({ "kind": kindInput.value, "color": colorInput.value, "weight": weightInput.value });
  }
  display();
});