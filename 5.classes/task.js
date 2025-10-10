class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this._state = 100;
    this.type = null;
  }

  set state(newState) {
    let value = Number(newState);
    if (value < 0) {
      this._state = 0;
    } else if (value > 100) {
      this._state = 100;
    } else {
      this._state = value;
    }
  }

  get state() {
    return this._state;
  }

  fix() {
    this.state = this._state * 1.5;
  }
}

class Magazine extends PrintEditionItem {
  constructor(...args) {
    super(...args);
    this.type = "magazine";
  }
}

class Book extends PrintEditionItem {
  constructor(author, ...args) {
    super(...args);
    this.author = author;
    this.type = "book";
  }
}

class NovelBook extends Book {
  constructor(...args) {
    super(...args);
    this.type = "novel";
  }
}

class FantasticBook extends Book {
  constructor(...args) {
    super(...args);
    this.type = "fantastic";
  }
}

class DetectiveBook extends Book {
  constructor(...args) {
    super(...args);
    this.type = "detective";
  }
}

/**/
const picknick = new FantasticBook(
  "Аркадий и Борис Стругацкие",
  "Пикник на обочине",
  1972,
  168
);

console.log(picknick.author); //"Аркадий и Борис Стругацкие"
picknick.state = 10;
console.log(picknick.state); //10
picknick.fix();
console.log(picknick.state); //15

/**/

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book && typeof book.state === "number" && book.state > 30) {
      this.books.push(book);
    }
  }

  findBookBy(type, value) {
    for (let book of this.books) {
      if (book[type] !== undefined && book[type] === value) {
        return book;
      }
    }
    return null;
  }

  giveBookByName(bookName) {
    const index = this.books.findIndex((b) => b.name === bookName);
    if (index !== -1) {
      const [book] = this.books.splice(index, 1);
      return book;
    }
    return null;
  }
}

const library = new Library("City Library");

library.addBook(new Magazine("Science Today", 2023, 60));
library.addBook(new Book("The Great Adventure", 1950, 320, "John Doe", 85));
library.addBook(new NovelBook("War and Peace", 1869, 1225, "L. Tolstoy", 90));
library.addBook(
  new DetectiveBook("The Silent Clue", 1920, 240, "A. Writer", 70)
);

let targetBook = library.findBookBy("releaseDate", 1919);
if (!targetBook) {
  targetBook = new NovelBook("Mystery of 1919", 1919, 400, "Unknown", 75);
  library.addBook(targetBook);
}
console.log("Target book for 1919:", targetBook ? targetBook.name : null);

const given = library.giveBookByName("The Great Adventure");
console.log("Given book:", given ? given.name : null);

if (given) {
  given.damage(50);
  console.log(`Damage applied to "${given.name}", new state: ${given.state}`);
}

if (given) {
  given.repair(30);
  console.log(`Repair applied to "${given.name}", new state: ${given.state}`);
}

if (given) {
  library.addBook(given);
  console.log(`Library now has ${library.books.length} book(s).`);
}

/**/

const library2 = new Library("Библиотека имени Ленина");

library2.addBook(
  new DetectiveBook(
    "Артур Конан Дойл",
    "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
    2019,
    1008
  )
);
library2.addBook(
  new FantasticBook(
    "Аркадий и Борис Стругацкие",
    "Пикник на обочине",
    1972,
    168
  )
);
library2.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
library2.addBook(new Magazine("Мурзилка", 1924, 60));

console.log(library2.findBookBy("name", "Властелин колец")); //null
console.log(library2.findBookBy("releaseDate", 1924).name); //"Мурзилка"

console.log("Количество книг до выдачи: " + library2.books.length); //Количество книг до выдачи: 4
library2.giveBookByName("Машина времени");
console.log("Количество книг после выдачи: " + library2.books.length); //Количество книг после выдачи: 3
