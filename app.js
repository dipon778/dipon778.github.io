//
function Book(title,author,isbn){
    this.title = title;
    this.author =author;
    this.isbn = isbn;
}

function UI(){}

UI.prototype.addBooktolist = function(book){
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
};

UI.prototype.showAlert = function(message ,classname){
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

};

//Delete Book
UI.prototype.deleteBook = function(target){
    if(target.className=== 'delete'){
        target.parentElement.parentElement.remove();
    }

};

///Clear Fields 
UI.prototype.clearFields= function(){
    document.getElementById("title").value="";
    document.getElementById("author").value="";
    document.getElementById("isbn").value="";
};


//Event listener adding book 

document.getElementById('book-form').addEventListener('submit',function(e){
    
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;

    const book =new Book(title,author,isbn);
   
    //ui
    const ui = new UI();

    console.log(ui);

    //validate 
    if(title==='' || author === '' || isbn ===''){
        //Error allert
        ui.showAlert("Please Fill All the Fields",'error');
    } else {
        //Add to book LIst
        ui.addBooktolist(book);

        //show success
        ui.showAlert('Book Added!' , 'success');
        console.log("kjbasfjk");


        //clear Fields
        ui.clearFields();
    }


    e.preventDefault();
});

// Event Listener for Delete 

document.getElementById('book-list').addEventListener('click',function(e){

    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert('Book Removed ' , 'success' );

    e.preventDefault();
});