const addButton = document.getElementById('add');
const dialog = document.getElementById('addBookDialog');
const cancelDialog = document.getElementById('cancelAddDialog');
const addBookForm = document.getElementById('addBookForm');
const booksDisplay = document.querySelector('.books-display');
const prevButton = document.getElementById('left-nav');
const nextButton = document.getElementById('right-nav');
const removeButton = document.getElementById('remove');
const removeBookDialog = document.getElementById('removeBookDialog');
const cancelRemoveDialog = document.getElementById('cancelRemoveDialog');
const removeBookForm = document.getElementById('removeBookForm');
const bookNameInput = document.getElementById('bookName');
const bookYearInput = document.getElementById('bookYear');

const myLibrary = [];
let currentPage = 0;
const cardsPerPage = 3;

function Book(name, year, description, isRead) {
    this.name = name; 
    this.year = year; 
    this.description = description; 
    this.isRead = isRead;
};

function updateNavigationButtons() {
    prevButton.disabled = currentPage === 0;

    const totalPages = Math.ceil(myLibrary.length / cardsPerPage);

    nextButton.disabled = currentPage >= totalPages - 1;
}

function changeBookStatusToRead(book) {
    if (book && book.isRead === "no") {
        book.isRead = "yes";
        updateBooksDisplay();
    }
}

function updateBooksDisplay() {
    booksDisplay.innerHTML = "";

    const startIndex = currentPage * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    const currentBooks = myLibrary.slice(startIndex, endIndex);

    currentBooks.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <p class="title">${book.name} (${book.year})</p>
            <p>${book.description}</p>
            <p class="status ${book.isRead === "yes" ? "read" : "unread"}">
                Status: ${book.isRead === "yes" ? "Read" : "Unread"}
            </p>
            <div class="icons-card">
                ${book.isRead === "yes" ? "" : `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" title="eye-plus-outline">
                    <path d="M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C12.36,19.5 12.72,19.5 13.08,19.45C13.03,19.13 13,18.82 13,18.5C13,18.14 13.04,17.78 13.1,17.42C12.74,17.46 12.37,17.5 12,17.5C8.24,17.5 4.83,15.36 3.18,12C4.83,8.64 8.24,6.5 12,6.5C15.76,6.5 19.17,8.64 20.82,12C20.7,12.24 20.56,12.45 20.43,12.68C21.09,12.84 21.72,13.11 22.29,13.5C22.56,13 22.8,12.5 23,12C21.27,7.61 17,4.5 12,4.5M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M18,14.5V17.5H15V19.5H18V22.5H20V19.5H23V17.5H20V14.5H18Z" />
                </svg>`}
            </div>
        `;

        const svgIcon = card.querySelector(".icons-card");
        if (svgIcon) {
            svgIcon.addEventListener("click", () => {
                changeBookStatusToRead(book);
            });
        }

        booksDisplay.appendChild(card);
    });

    updateNavigationButtons();
}

function addBookToLibrary() {
    const formData = new FormData(addBookForm);

    const book = new Book(
        formData.get('bookName'),
        formData.get('bookYear'),
        formData.get('bookDescription'),
        formData.get('bookRead')
    );  
    
    myLibrary.push(book);
    updateBooksDisplay();
    console.log('New Book:', book);
    console.log('Library:', myLibrary);
    
    dialog.style.display = 'none';
    addBookForm.reset();
};

function removeBookFromLibrary() {
    const nameToRemove = bookNameInput.value;
    const yearToRemove = bookYearInput.value;

    const bookIndex = myLibrary.findIndex(
        (book) => book.name === nameToRemove && book.year === yearToRemove
    );

    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
        updateBooksDisplay();
        console.log('Removed Book:', nameToRemove, yearToRemove);
        console.log('Updated Library:', myLibrary);
    } else {
        alert('Book not found!');
    }

    removeBookDialog.style.display = 'none';
    removeBookForm.reset();
}

addButton.addEventListener('click', () => {
    dialog.style.display = 'flex';
});
    
cancelDialog.addEventListener('click', () => {
    dialog.style.display = 'none';
    addBookForm.reset();
});

addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
});

prevButton.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        updateBooksDisplay();
    }
});

nextButton.addEventListener('click', () => {
    const totalPages = Math.ceil(myLibrary.length / cardsPerPage);
    
    if (currentPage < totalPages - 1) {
        currentPage++;
        updateBooksDisplay();
    }
});

removeButton.addEventListener('click', () => {
    removeBookDialog.style.display = 'flex';
});

cancelRemoveDialog.addEventListener('click', () => {
    removeBookDialog.style.display = 'none';
    removeBookForm.reset();
});

removeBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    removeBookFromLibrary();
});