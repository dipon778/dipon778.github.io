class Book {
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn = isbn;
    }
}

class UI{

    addBookToList(book){
        const list = document.getElementById("book-list");

        //create tr elemwnt 
        const row = document.createElement('tr');
        //inserts cols 
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td> <a href="#" class="delete">X</a> </td>
        `;
        list.appendChild(row);
    }

    showAlert(message , classname){
    
        //create div
        
        const div = document.createElement('div');
        //add classname
        div.className = `alert  ${classname}`;
        

        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');

        const form = document.querySelector('#book-form');

        container.insertBefore(div, form);

        //Timeout after 3 s
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }
    deleteBook(target){
        if(target.className=== 'delete'){
            target.parentElement.parentElement.remove();
        }
    

    }
    clearFields(){
        document.getElementById("title").value="";
        document.getElementById("author").value="";
        document.getElementById("isbn").value="";
    }

}

///Local storage class
class Store{

    static getBooks(){
        let books ;
        if(localStorage.getItem('books')=== null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;

    }

    static displayBooks(){
        const books =Store.getBooks();

        books.forEach(function(book){
            const ui = new UI();
            //add book to UI
            ui.addBookToList(book);
        });

    }
    static addBook(book){
        const books =Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));

    }
    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach(function(book,index){
            if(isbn === book.isbn){
                books.splice(index,1);
            }
        });

        localStorage.setItem('books',JSON.stringify(books));
    }

}

//DOM load  EVENT

document.addEventListener('DOMContentLoaded',Store.displayBooks);


document.getElementById('book-form').addEventListener('submit',function(e){
    
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;

    const book =new Book(title,author,isbn);
   
    //ui
    const ui = new UI();

    //validate 
    if(title === '' || author === '' || isbn === ''){
        //Error allert
        ui.showAlert("Please Fill All the Fields",'error');
    } else {
        //Add to book LIst
        ui.addBookToList(book);

        //Add book to local starage 
        Store.addBook(book);
        //show success
        ui.showAlert('Book Added!' , 'success');
        //clear Fields
        ui.clearFields();
    }


    e.preventDefault();
});

// Event Listener for Delete 

document.getElementById('book-list').addEventListener('click',function(e){

    const ui = new UI();
    ui.deleteBook(e.target);

    //remove from storage

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    ui.showAlert('Book Removed ' , 'success' );

    e.preventDefault();
});