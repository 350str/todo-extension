import './todo-panel.css';

export default class TodoPanel {

    htmlCreate( data, key, important = false, done = false ) {
        const container = document.querySelector('.todo__items');
        const newItem = document.createElement("div");
          
        container.append(newItem);
        newItem.classList.add('todo__item');
        newItem.setAttribute('id', `${key}`);
        newItem.insertAdjacentHTML('beforeEnd', `
                <div class="list-group-item todo__text">${data}</div>
                <button class="btn btn-outline-success btn-sm float-right todo__button_important">!</button>
                <button class="btn btn-outline-danger btn-sm float-right todo__button_delete">Del</button>`
        );
    
        const todoText = newItem.querySelector('.todo__text');
    
        if (important) 
                todoText.classList.add('todo__text_bold');
        if (done) 
                todoText.classList.add('todo__text_done');
    }

    addItem = () => {
        const inputVal = document.querySelector('.todo__input');
        const button = document.querySelector('.todo__button');

        chrome.storage.local.get(null , ( result ) => {
            const maxVal = ( Object.keys(result).length ) ? Math.max(...Object.keys(result)) + 1 : 0;
            this.htmlCreate(inputVal.value, maxVal);
            chrome.storage.local.set( { [`${maxVal}`]: {  name: inputVal.value, important: false, done: false } }, 
                () => {
                    inputVal.value = '';
                    button.setAttribute('disabled', true);
                } );
        }); 
    }

    inputer() {
        const inputVal = document.querySelector('.todo__input');
        const button = document.querySelector('.todo__button');

        if (inputVal.validity.valid) {
            button.removeAttribute('disabled')
        } else {
            button.setAttribute('disabled', true);
        }
    }

}