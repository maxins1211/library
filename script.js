const myLibrary = [];
function Book(tittle, author, pages, read) {
  this.tittle = tittle;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.changeStatus = function () {
  if (this.read === "Completed") {
    this.read = "Not Read";
  } else this.read = "Completed";
};

const addBookToLibrary = function (tittle, author, pages, read) {
  const book = new Book(tittle, author, pages, read);
  myLibrary.push(book);
};

const showBook = document.querySelector(".submit");
const section = document.querySelector("section");
const addBook = document.querySelector(".add-book");
const modal = document.querySelector("dialog");
const closeModal = document.querySelector(".close");
const bookTittle = document.querySelector("#book-tittle");
const bookAuthor = document.querySelector("#book-author");
const bookPage = document.querySelector("#book-page");
const addBookForm = document.querySelector("#add-book-form");

const printAllBooks = function () {
  section.textContent = "";
  myLibrary.forEach((book, index) => {
    const div = document.createElement("div");
    const h1 = document.createElement("h1");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");
    const button1 = document.createElement("button");
    const button2 = document.createElement("button");

    h1.textContent = book.tittle;
    h2.textContent = "by " + book.author;
    p.textContent = "Pages:" + book.pages;
    button1.textContent = book.read;
    button2.textContent = "Remove";

    h1.classList.add("tittle");
    h2.classList.add("author");
    p.classList.add("page");
    button1.classList.add("status");
    if (book.read === "Completed") {
      button1.classList.toggle("completed");
    }
    button2.classList.add("remove");
    div.classList.add("card");
    div.setAttribute("data-index", index);

    div.appendChild(h1);
    div.appendChild(h2);
    div.appendChild(p);
    div.appendChild(button1);
    div.appendChild(button2);

    section.appendChild(div);

    button1.addEventListener("click", () => {
      button1.classList.toggle("completed");
      book.changeStatus();
      button1.textContent = book.read;
    });

    button2.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      printAllBooks();
    });
  });
};

addBook.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
});

addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let read;
  document.querySelector("#check-box").checked
    ? (read = "Completed")
    : (read = "Not Read");

  addBookToLibrary(bookTittle.value, bookAuthor.value, bookPage.value, read);
  printAllBooks();
  bookTittle.value = "";
  bookAuthor.value = "";
  bookPage.value = "";
  document.querySelector("#check-box").checked = false;

  modal.close();
});
