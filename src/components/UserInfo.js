export default class UserInfo {
    constructor({nameSelector, aboutSelector, avatarSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
        this._avatarElement = document.querySelector(avatarSelector);
    }

    getId() {
        return this._id;
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent, 
            about: this._aboutElement.textContent
        }
    }

    setUserInfo({name, about, _id}) {
        this._nameElement.textContent = name;
        this._aboutElement.textContent = about;
        this._id = _id;
    }

    getAvatar() {
        return { avatar: this._avatarElement.src };
    }

    setAvatar(avatar) {
        this._avatarElement.src = avatar;
    }
}