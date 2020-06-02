import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './popup.css';
import TodoPanel from './blocks/todo-panel';
import TodoItem from './blocks/todo-item';

(function(){

const todoPanel = new TodoPanel();
const todoItem = new TodoItem();

window.onload = () => {
    chrome.storage.local.get(null , (result) => {
        for (let key in result) {
            todoPanel.htmlCreate( result[key]['name'], key, result[key]['important'], result[key]['done'] );    
        }
    })
}

const main = document.querySelector('.todo');

document.querySelector('.todo__input').addEventListener('input', todoPanel.inputer);
document.querySelector('.todo__button').addEventListener('click', todoPanel.addItem);
main.addEventListener('click', todoItem.important);
main.addEventListener('click', todoItem.remove);
main.addEventListener('click', todoItem.done);

})();