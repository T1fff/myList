// Book Class
class Book {
    constructor(title, author){
        this.title = title;
        this.author = author;
    }
}


//UI Class
class UI{
    static displayBooks(){
        const books = Store.getBooks();

        books.forEach((book) => UI.addBook(book));
    }

    static addBook(book) {
        const list = document.querySelector("#book-list");
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
            `;
        row.className = `table-secondary`
        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains("delete")){
            el.parentElement.parentElement.remove()
        }
    }

    static showAlert(message, className){
        const div = document.createElement("div");
        div.className = `alert  alert-${className} mt-4`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        container.insertBefore(div, form);

        setTimeout(() =>document.querySelector(".alert").remove(), 2000 )
    }


    static clearFields(){
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
    }
}

// Store Class
class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem("books") === null) {
            books = [];
        } else [
            books = JSON.parse(localStorage.getItem("books"))
        ]
        return books;
    }

    static addBookLS(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books))
    }

    static removeBookLS(author){
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.author === author){
                books.splice(index, 1)
            }
        })

        localStorage.setItem("books", JSON.stringify(books))
    }
}

//Event -> Display Book
document.addEventListener("DOMContentLoaded", UI.displayBooks);


//Event -> Add Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;

    //Validation
    if(title == "" || author == ""){
        UI.showAlert("You should fill in all the fields!", "danger");
    } else {
        const book = new Book(title, author);
        UI.addBook(book);
        Store.addBookLS(book);
        UI.showAlert("Your book has been added succesfully", "success");
        UI.clearFields();
    }
})

//Event -> Remove Book
document.querySelector("#book-list").addEventListener("click", (e) => {
    UI.deleteBook(e.target);
    Store.removeBookLS(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert("Your book has been deleted succesfully!", "danger");
})