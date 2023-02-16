export default class Api {
    constructor({serverUrl, groupId, personalToken}) {  
        this._baseUrl = `${serverUrl}/v1/${groupId}`;
        this._option = {
            headers: {
                authorization: personalToken,
                'Content-Type': 'application/json'
                },
            body: null,
            method: 'GET'
        };
    }

    getUserInfo() {
        this._option.method = 'GET';
        this._option.body = null;

        return fetch(`${this._baseUrl}/users/me`, this._option)
            .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
            })
    }

    updateUserInfo(userInfo) {
        this._option.method = 'PATCH';
        this._option.body = JSON.stringify(userInfo);

        return fetch(`${this._baseUrl}/users/me`, this._option)
            .then(res => {
                if (res.ok) {
                return res.json();
                }
                return Promise.reject(res.status);
            })
    }

    updateAvatar(url) {
        this._option.method = 'PATCH';
        this._option.body = JSON.stringify(url);

        return fetch(`${this._baseUrl}/users/me/avatar`, this._option)
            .then(res => {
                if (res.ok) {
                return res.json();
                }
                return Promise.reject(res.status);
            })
    }
  
    getInitialCards() {
        this._option.method = 'GET';
        this._option.body = null;

        return fetch(`${this._baseUrl}/cards`, this._option)
            .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
            })
    }

    addCard(card) {
        this._option.method = 'POST';
        this._option.body = JSON.stringify(card);

        return fetch(`${this._baseUrl}/cards`, this._option)
            .then(res => {
                if (res.ok) {
                return res.json();
                }
                return Promise.reject(res.status);
            })
    }

    removeCard(cardId) {
        this._option.method = 'DELETE';
        this._option.body = null;

        return fetch(`${this._baseUrl}/cards/${cardId}`, this._option)
            .then(res => {
                if (res.ok) {
                return res.json();
                }
                return Promise.reject(res.status);
            })
    }

    addLike(cardId) {
        this._option.method = 'PUT';
        this._option.body = null;

        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, this._option)
            .then(res => {
                if (res.ok) {
                return res.json();
                }
                return Promise.reject(res.status);
            })
    }

    delLike(cardId) {
        this._option.method = 'DELETE';
        this._option.body = null;

        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, this._option)
            .then(res => {
                if (res.ok) {
                return res.json();
                }
                return Promise.reject(res.status);
            })
    }
  }