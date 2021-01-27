// Storage Controller

//Item Controller

const ItemCtrl = (function(){
    class Item {
        constructor(id, name, calories) {
            this.id = id;
            this.name = name;
            this.calories = calories;
        }
    }

    //data Stractre
    const data = {
        items : [
            
        ],
        curreItem : null,
        totalCalories : 0
    }
    return {
        getItems: function(){
            return data.items;
        },
        addItem:function(name,calories){
            //Create id
            let ID;
            if(data.items.length>0){
                ID=data.items[data.items.length-1].id + 1;
            } else {
                ID = 0;
            }

            //Calories to number
            calories = parseInt(calories);

            //Create new item
            newItem = new Item(ID,name,calories);
            data.items.push(newItem); 

            return newItem;
        },
        updateItem : function(name,calories){

            //calories to number 
            calories = parseInt(calories);

            let found = null;

            data.items.forEach(function(item){

                if(item.id == data.curreItem.id){
                    item.name = name;
                    item.calories =calories;
                    found = item;
                }
            });

            return found;

        },

        deleteItem : function(id){

            //Get ids 
            ids = data.items.map(function(item){
                return item.id;
            });

            //get index
            const index = ids.indexOf(id);

            //remove item
            data.items.splice(index , 1);
        },
        clearAllItems : function(){
            data.items = [];
        },
        getItemById : function(id){
            let found = null;

            data.items.forEach(function(item){
                if(item.id === id){
                    found = item;
                }
            });
            return found;
        },
        setCurrentItem : function(item){
            data.curreItem = item;
        },
        getCurrentItem : function(){
            return data.curreItem;
        },
        getTotalCalories : function(){

            let total=0;

            //loop through items 
            data.items.forEach(element => {
                total += element.calories;
            });

            //set total calorie in data structure
            data.totalCalories = total;
           console.log(total);

            return data.totalCalories;
        },
        logData: function(){
            return data;
        }
    }
})();

//UI Controller 
const UICtrl = (function(){
 
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
    }

    return{
        populateItemList: function(items){
            let html = '';
            items.forEach(item => {
                    html+=`<li class="collection-item" id="item-${item.id}">
                                <strong>${item.name}: </strong><em>${item.calories} Calories</em>
                                <a href="#" class="secondary-content">
                                <i class="edit-item fa fa-pencil"></i>
                                </a>
                           </li>`;
            });
            // Insert List Items 
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getItemInput : function(){
            return {
                name : document.querySelector(UISelectors.itemNameInput).value,
                calories : document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        updateListItem : function(item){
            let listItems = document.querySelectorAll(UISelectors.listItems);
            
            listItems = Array.from(listItems);

            listItems.forEach(function(listItem){
                const itemID = listItem.getAttribute('id');

                if(itemID ===`item-${item.id}`){
                    document.querySelector(`#${itemID}`).innerHTML =
                    `<strong>${item.name}: </strong><em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                    </a>`;
                }

            });

            
        },
        deleteListItem : function(id){

            const itemID =`#item-${id}`;

            const item = document.querySelector(itemID);

            item.remove();

        },

        addListItem: function(item){

            //show the list 
            document.querySelector(UISelectors.itemList).style.display = 'block';
            //Create li Element
            const li = document.createElement('li');
            //add class
            li.className = 'collection-item';

            li.id = `item-${item.id}`;
            //Add html
            li.innerHTML = `
            <strong>${item.name}: </strong>
            <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
            </a>`;
            //Insert iTem
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li)
            
        },
        clearInput : function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';

        },
        addItemToForm : function (){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        removeItems : function(){

            let listItems = document.querySelectorAll(UISelectors.itemList);

            //turn it into an array
            listItems = Array.from(listItems);
            

            listItems.forEach(function(item){
                item.remove();
                
            });
        },
        hideList: function(){
            document.querySelector(UISelectors.itemList).getElementsByClassName.display = 'none';
        },
        showTotalcalories : function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        clearEditState : function(){
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState : function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        getSelector: function(){
            return UISelectors;
        }
    }

})();


//App Controller
const App = (function(ItemCtrl, UICtrl){

    // Load event Listener 
    const loadEventListners = function(){
        //Get UI Selectors
        const UISelectors = UICtrl.getSelector();
        //Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click',itemAddSubmit);

        //edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click',itemUpdateSubmit);

        //Back icon click event
        document.querySelector(UISelectors.backBtn).addEventListener('click',UICtrl.clearEditState);
    
        //delete icon click event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click',itemDeleteSubmit);

        //clear icon click event
        document.querySelector(UISelectors.clearBtn).addEventListener('click',clearAllItemsClick);
    };

    const itemAddSubmit = function(e){
        //get form input from UIcontroller
        const input = UICtrl.getItemInput();

        if(input.name !== '' && input.calories !== ''){
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            UICtrl.addListItem(newItem);
            
            //Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            UICtrl.showTotalcalories(totalCalories);

            //Clear fields
            UICtrl.clearInput();
        }        
         console.log("add");
        e.preventDefault();
    }

    const itemUpdateSubmit = function(e){
            
        if(e.target.classList.contains('edit-item')){
            
            //get list item id 
            const listId = e.target.parentNode.parentNode.id;
            
            //break into array

            const listIdArr = listId.split('-');

            const id = parseInt(listIdArr[1]);

            //get item
            const itemToEdit = ItemCtrl.getItemById(id);

            //current item
            ItemCtrl.setCurrentItem(itemToEdit);

            //add item to form 
            UICtrl.addItemToForm();

            console.log(itemToEdit);


        }
        e.preventDefault();

    }

    //delete button event 
    const itemDeleteSubmit = function(e){
        console.log(123);

        //get current item

        const currentItem = ItemCtrl.getCurrentItem();

        //delete from data structure
        ItemCtrl.deleteItem(currentItem.id);

        //delete from ui
        UICtrl.deleteListItem(currentItem.id);

         //Get total calories
         const totalCalories = ItemCtrl.getTotalCalories();

         UICtrl.showTotalcalories(totalCalories);

         UICtrl.clearEditState();

        e.preventDefault();
    }

    //clear items event 
    const clearAllItemsClick = function(){

        //delete all items 
        ItemCtrl.clearAllItems();

        //Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        UICtrl.showTotalcalories(totalCalories);
        
        UICtrl.removeItems();

        
    }


    //public methods
    return {
        init: function(){
            console.log('initializing app ....');

            //clear edit state
            UICtrl.clearEditState();

            //Fetch Item from Item Controller
            const items = ItemCtrl.getItems();
            
            //check if any items
            if(items.length === 0)
            {
                UICtrl.hideList();
            } else {
                UICtrl.populateItemList(items);
            }           

            loadEventListners();
            
        }
    }

})(ItemCtrl, UICtrl);

App.init();