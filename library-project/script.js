function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const book1 = new Book('Pride and Prejudice', 'Jane Austen', 358, false);
const book2 = new Book('Alice in Wonderland', 'Lewis Carroll', 252, true);

const myLibrary = [book1, book2];

function displayLibrary() {
    const library = document.getElementById("library");
    library.replaceChildren();
    myLibrary.forEach(book => {
        const bookEl = document.createElement('div');
        bookEl.className = 'book-item';
        document.getElementById('library').appendChild(bookEl);
        const bookTitle = document.createElement('h4');
        bookTitle.textContent = `${book.title} by ${book.author}`;
        bookEl.appendChild(bookTitle);
        const pages = document.createElement('p');
        pages.textContent = `${book.pages} pages`;
        bookEl.appendChild(pages);
        const readStatus = document.createElement('span');
        readStatus.textContent = "read: ";
        const readCheckbox = document.createElement('input');
        readCheckbox.setAttribute("type", "checkbox");
        readCheckbox.checked = book.read;
        readStatus.appendChild(readCheckbox);
        bookEl.appendChild(readStatus);
    });
}

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

const addBookButton = document.querySelector("#add-book");

function addBook() {

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').value;

    myLibrary.push(new Book(title, author, pages, read));
    displayLibrary();
}

displayLibrary();