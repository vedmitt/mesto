export default class Section {
    constructor({ renderer }, selector) {
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    renderItems(items) {
        items.forEach(item => this._renderer(item));
    }

    prependItem(element) {
        this._container.prepend(element);
    } 
    
    appendItem(element) {
        this._container.append(element);
    }
}
