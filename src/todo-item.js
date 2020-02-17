export default class TodoItem {
    
    important(event) {
        const id = event.target.parentElement.getAttribute('id');
        if (event.target.classList.contains('todo__button_important')) {

            event.target.previousElementSibling.classList.toggle('todo__text_bold');
            chrome.storage.local.get([`${id}`], (result) => {
                result[id]['important'] = !result[id]['important'];
                chrome.storage.local.set({[`${id}`]: result[id]});
            })
        };
    }

    done(event) {
        const id = event.target.parentElement.getAttribute('id');
        if (event.target.classList.contains('todo__text')) {
        
            event.target.classList.toggle('todo__text_done');
            chrome.storage.local.get([`${id}`], (result) => {
                result[id]['done'] = !result[id]['done'];
                chrome.storage.local.set({[`${id}`]: result[id]});
            })
        }        
    }

    remove(event) {
        const id = event.target.parentElement.getAttribute('id');
        if (event.target.classList.contains('todo__button_delete')) {
            event.target.parentElement.remove();    
            chrome.storage.local.remove(`${id}`);
        }
    }
}