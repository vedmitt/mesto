export default class UserInfo {
    constructor({name, desc}) {
        this._name = document.querySelector(name);
        this._description = document.querySelector(desc);
    }

    getUserInfo() {
        return {name: this._name.textContent, job: this._description.textContent}
    }

    setUserInfo({name, job}) {
        this._name.textContent = name;
        this._description.textContent = job;
    }
}