// add books

objectlist = [];

const addForm =document.forms['add-books'];
const form =document.querySelector('form');

const mbookList=document.querySelector('.list-of-books');
mbookList.setAttribute('style','list-style-type:none');


addForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const titleName = addForm.querySelector('.name').value;
  const authorName = addForm.querySelector('.author').value;

  objectlist.push({
    bookname:titleName , author:authorName
  })
  
  localStorage.setItem('books',JSON.stringify(objectlist))
  form.reset();

  const li = document.createElement('li');
  const title = document.createElement('div');
  const author = document.createElement('div');
  const deleteBtn = document.createElement('button');

  title.classList.add('name');
  author.classList.add('author');
  deleteBtn.classList.add('delete');


  li.appendChild(title);
  li.appendChild(author);
  li.appendChild(deleteBtn);
  lists.appendChild(li);

li.appendChild(title);
li.appendChild(author);
li.appendChild(deleteBtn);
bookContainer.appendChild(li);

title.textContent =titleName;
author.textContent =authorName;
deleteBtn.textContent='delete';

})

// generate books

function generateBooks({
    bookname, author
  }){
    return `
    <li>
    <div class="name">${bookname}</div>
    <div class="name">${author}</div>
    <button class="delete"> Remove </button>
    <hr>
   </li>
    `;
  }


  const bookContainer=document.querySelector('.book-container ul');
  
  const bookList=objectlist.map(book => generateBooks(book)).join('');
  
  bookContainer.innerHTML+=bookList;
  
  
  const lists =document.querySelector ('#book-list ul');
  
  
  let booksFromLocalStorage = JSON.parse(localStorage.getItem('books'));
  if (booksFromLocalStorage) {
    bookContainer.innerHTML = booksFromLocalStorage
      .map((book) => generateBooks(book))
      .join('');
  } 
  else {
    bookContainer.innerHTML = books.map((book) => generateBooks(book)).join('');
  }


//   delete books


bookContainer.addEventListener ('click' ,function (e) {
    const title = e.target.parentElement.firstElementChild.textContent;
    if (e.target.className =='delete') {
      const li = e.target.parentElement;
      bookContainer.removeChild(li);
      objectlist = objectlist.filter((obj) => obj.bookname !== title);
      console.log(objectlist);
      console.log(title);
      localStorage.setItem('books',JSON.stringify(objectlist))
    }
  });
  
