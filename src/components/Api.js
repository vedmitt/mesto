export default class Api {
    constructor({baseUrl, headers}) {  
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
    } 

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, { 
            headers: this._headers 
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    updateUserInfo(userInfo) {
        return fetch(`${this._baseUrl}/users/me`, { 
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(userInfo)
         })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    updateAvatar(url) {
        return fetch(`${this._baseUrl}/users/me/avatar`, { 
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(url)
         })
            .then(res => {
                return this._getResponseData(res);
            })
    }
  
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, { 
            headers: this._headers 
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    addCard(card) {
        return fetch(`${this._baseUrl}/cards`, { 
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(card)
         })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    removeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, { 
            headers: this._headers,
            method: 'DELETE'
         })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, { 
            headers: this._headers,
            method: 'PUT'
         })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, { 
            headers: this._headers,
            method: 'DELETE'
         })
            .then(res => {
                return this._getResponseData(res);
            })
    }
  }