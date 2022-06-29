const booksContainer = document.querySelector('.book-container');
const form = document.querySelector('form');
const list = document.querySelector('#book-list');
const addNew = document.querySelector('#add-books');
const contact = document.querySelector('#contact');
const bookList = document.querySelector('#listbook');
const addBook = document.querySelector('#addbook');
const contacts = document.querySelector('#contacts');

var today = new Date();
document.getElementById("showDate").innerHTML=today; 

bookList.addEventListener('click', (e) => {
  e.preventDefault();
  list.style.display = 'flex';
  addNew.style.display = 'none';
  contact.style.display = 'none';
});

addBook.addEventListener('click', () => {
  list.style.display = 'none';
  addNew.style.display = 'flex';
  contact.style.display = 'none';
});
contacts.addEventListener('click', () => {
  list.style.display = 'none';
  addNew.style.display = 'none';
  contact.style.display = 'flex';
});

// Create book class, and methods

class Books {
  constructor() {
    this.by = null;
    this.books = [];
  }

  generateBook(book) {
    this.by = 'by';
    return `<div>
        <ul>
          <li>"${book.title}"</li>
          <li>${this.by}</li>
          <li>${book.author}</li> 
        </ul>
      <button>Remove</button>
      </div>
      `;
  }

  showBooks() {
    const FromLocalStorage = JSON.parse(localStorage.getItem('books'));
    if (FromLocalStorage) {
      this.books = FromLocalStorage;
      booksContainer.innerHTML = FromLocalStorage
        .map((book) => this.generateBook(book))
        .join('');
    } else {
      localStorage.setItem('books', JSON.stringify(this.books));
      booksContainer.innerHTML = this.books.map((book) => this.generateBook(book)).join('');
    }
  }

  updateBooks() {
    const title = form.title.value.trim();
    const author = form.author.value.trim();
    if (title && author) {
      this.books.push({ title, author });
    }
    localStorage.setItem('books', JSON.stringify(this.books));
    this.showBooks();
  }

  removeBook(e) {
    if (e.target.tagName === 'BUTTON') {
      const title = e.target.parentElement.firstElementChild.firstElementChild.textContent;
      this.books = this.books.filter((obj) => obj.title !== title.slice(1, title.length - 1));
      localStorage.setItem('books', JSON.stringify(this.books));
      this.showBooks();
    }
  }
}

const book = new Books();
book.showBooks();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  book.updateBooks();
  form.reset();
});

// delete book

booksContainer.addEventListener('click', (e) => {
  book.removeBook(e);
});

// date

const date = new Date();
document.getElementById('date').innerHTML = date;