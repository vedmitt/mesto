export default class UserInfo {
    constructor({name, about, avatar}) {
        this._name = document.querySelector(name);
        this._about = document.querySelector(about);
        this._avatar = document.querySelector(avatar);
    }

    getId() {
        return this._id;
    }

    getUserInfo() {
        return {
            name: this._name.textContent, 
            about: this._about.textContent
        }
    }

    setUserInfo({name, about, _id}) {
        this._name.textContent = name;
        this._about.textContent = about;
        this._id = _id;
    }

    getAvatar() {
        return { avatar: this._avatar.src };
    }

    setAvatar(avatar) {
        this._avatar.src = avatar;
    }
}