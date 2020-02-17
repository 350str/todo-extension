import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './popup.css';
import TodoPanel from './todo-panel';
import TodoItem from './todo-item';

(function(){

const main = document.querySelector('.todo');
const button = document.querySelector('.todo__button');
const inputVal = document.querySelector('.todo__input');

const todoPanel = new TodoPanel();
const todoItem = new TodoItem();

window.onload = () => {
    chrome.storage.local.get(null , (result) => {
        for (let key in result) {
            todoPanel.htmlCreate( result[key]['name'], key, result[key]['important'], result[key]['done'] );    
        }
    })
}

inputVal.addEventListener('input', todoPanel.inputer);
button.addEventListener('click', todoPanel.addItem);
main.addEventListener('click', todoItem.important);
main.addEventListener('click', todoItem.remove);
main.addEventListener('click', todoItem.done);

})();