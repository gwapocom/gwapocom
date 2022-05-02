document.addEventListener('DOMContentLoaded', displayBooks);

function getBooks() {
        let books;
        if (localStorage.getItem('books') == null) books = [];
        else books = JSON.parse(localStorage.getItem('books'));
        return books;
}

function displayBooks() {
        const books = getBooks();
        books.forEach(function(book) {
                const ui = new UI();
                ui.addBookToList(book);
        })
}

function addBook(book) {
        const books = getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
}

function removeBook(isbn) {
        const books = getBooks();
        books.forEach(function(book, index) {
                if (book.isbn === isbn) {
                        books.splice(index, 1);
                }
        })
        localStorage.setItem('books', JSON.stringify(books));
}



function Book(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
}



function UI() {}
UI.prototype.addBookToList = function(book) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML = `

<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><a href="#" class="delete">uten</a></td>

	`;

        list.appendChild(row);

};





// Show Alert
UI.prototype.showAlert = function(message, className) {
        // Create div
        const div = document.createElement('div');
        // Add classes
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector('.container');
        // Get form
        const form = document.querySelector('#book-form');
        // Insert alert
        container.insertBefore(div, form);

        // Timeout after 3 sec
        setTimeout(function() {
                document.querySelector('.alert').remove();
        }, 3000);
}

UI.prototype.deleteBook = function(target) {
        if (target.className === 'delete') {
                target.parentElement.parentElement.remove();
        }

}

UI.prototype.clearFields = function() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
}

//               function Store(){}
//    
//    Store.prototype.getBooks = function() {
//        let books;
//        if(localStorage.getItem('books') === null) {
//          books = [];
//        } else {
//          books = JSON.parse(localStorage.getItem('books'));
//        }
//    
//        return books;
//      }
//    
//      Store.prototype.displayBooks = function() {
//        const books = Store.getBooks();
//    
//        books.forEach(function(book){
//          const ui  = new UI();
//    
//          // Add book to UI
//          ui.addBookToList(book);
//        });
//      }
//    
//      Store.prototype.addBook = function(book) {
//        const books = Store.getBooks();
//    
//        books.push(book);
//    
//        localStorage.setItem('books', JSON.stringify(books));
//      }
//    
//      Store.prototype.removeBook = function(isbn) {
//        const books = Store.getBooks();
//    
//        books.forEach(function(book, index){
//         if(book.isbn === isbn) {
//          books.splice(index, 1);
//         }
//        });
//    
//        localStorage.setItem('books', JSON.stringify(books));
//      }
//    
//      document.addEventListener('DOMContentLoaded',
//              Store.displayBooks);


//=================================================================

document.getElementById('book-form').addEventListener('submit',
        function(e) {
                const title = document.getElementById('title').value,

                        author = document.getElementById('author').value,
                        isbn = document.getElementById('isbn').value

                const book = new Book(title, author, isbn);
                const ui = new UI();
                //console.log(ui);
                if (title === '' || author === '' || isbn === '') {
                        ui.showAlert('Please Fill in all cum', 'error');
                } else {
                        ui.addBookToList(book);
                        addBook(book);
                        ui.showAlert('Book Added!', 'success');

                        ui.clearFields();
                }


                e.preventDefault();
        })

//===================================================

document.getElementById('book-list').addEventListener('click', function(e) {

        const ui = new UI();
        ui.deleteBook(e.target);

        removeBook(e.target.parentElement.previousElementSibling.textContent);
        ui.showAlert('Book Removed!', 'success');

        e.preventDefault();
});
