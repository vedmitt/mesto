export default class Section {
    constructor({ items, renderer }, selector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._isPrepend = false;
        this._container = document.querySelector(selector);
    }

    setRenderedItems(items, isPrepend=false) {
        this._renderedItems = items;
        this._isPrepend = isPrepend;
    }

    renderItems() {
        this._renderedItems.forEach(item => this._renderer(item))
    }

    addItem(element) {
        // добавление карточки в начало или конец контейнера
        if (!this._isPrepend) {
            this._container.append(element);
        } else {
            this._container.prepend(element);
        }
    }
}
