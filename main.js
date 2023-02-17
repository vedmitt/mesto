(()=>{"use strict";var t={formInput:"form__input",formSubmitBtn:"form__save-btn",formSubmitBtnInactive:"form__save-btn_inactive",formInputTypeError:"form__input_type_error"},e=".popup-img__caption",n=".popup-img__image",r="popup_opened",o=".form",i=".form__input",a=".form__save-btn",u="#card-template",c="card__like-btn_active",l=".card__image";function s(t){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==s(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==s(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===s(o)?o:String(o)),r)}var o}var p=function(){function t(e,n,r,o,i,a,u){var c=e._id,l=e.name,s=e.link,f=e.likes,p=e.owner;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._id=c,this._name=l,this._link=s,this._likes=f,this._myUserId=n,this._ownerId=p._id,this._template=r,this._handleCardClick=o,this._handleRemoveCard=i,this._handleIncreaseLikes=a,this._handleDecreaseLikes=u}var e,n;return e=t,(n=[{key:"getId",value:function(){return this._id}},{key:"_getElement",value:function(){this._element=document.querySelector(this._template).content.querySelector(".card").cloneNode(!0)}},{key:"_checkMyLike",value:function(t,e){return t.some((function(t){var n=t._id;return e===n}))}},{key:"_setMyLike",value:function(){this._checkMyLike(this._likes,this._myUserId)&&this._likeCardBtn.classList.toggle(c)}},{key:"_setEventListeners",value:function(){var t=this;this._likeCardBtn=this._element.querySelector(".card__like-btn"),this._likeCardBtn.addEventListener("click",(function(){t._handleLikeCard()})),this._element.querySelector(l).addEventListener("click",(function(){t._handleCardClick(t._name,t._link)})),this._trashBtn=this._element.querySelector(".card__trash-btn"),this._myUserId===this._ownerId?this._trashBtn.addEventListener("click",(function(){t._handleRemoveCard(t)})):this._trashBtn.classList.add("card__trash-btn_hidden")}},{key:"remove",value:function(){this._element.remove(),this._element=null}},{key:"updateLikes",value:function(t){this._cardElementLikes.textContent=t.length||0,this._likeCardBtn.classList.toggle(c)}},{key:"_handleLikeCard",value:function(){this._likeCardBtn.classList.contains(c)?this._handleDecreaseLikes(this):this._handleIncreaseLikes(this)}},{key:"generate",value:function(){return this._getElement(),this._setEventListeners(),this._cardElementTitle=this._element.querySelector(".card__title"),this._cardElementImage=this._element.querySelector(l),this._cardElementLikes=this._element.querySelector(".card__like-counter"),this._cardElementTitle.textContent=this._name,this._cardElementImage.src=this._link,this._cardElementImage.alt=this._name,this._cardElementLikes.textContent=this._likes.length||0,this._setMyLike(),this._element}}])&&f(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function y(t){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},y(t)}function h(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==y(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==y(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===y(o)?o:String(o)),r)}var o}var m=function(){function t(e){var n=e.nameSelector,r=e.aboutSelector,o=e.avatarSelector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._nameElement=document.querySelector(n),this._aboutElement=document.querySelector(r),this._avatarElement=document.querySelector(o)}var e,n;return e=t,(n=[{key:"getId",value:function(){return this._id}},{key:"getUserInfo",value:function(){return{name:this._nameElement.textContent,about:this._aboutElement.textContent}}},{key:"setUserInfo",value:function(t){var e=t.name,n=t.about,r=t._id;this._nameElement.textContent=e,this._aboutElement.textContent=n,this._id=r}},{key:"getAvatar",value:function(){return{avatar:this._avatarElement.src}}},{key:"setAvatar",value:function(t){this._avatarElement.src=t}}])&&h(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function d(t){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},d(t)}function v(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==d(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==d(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===d(o)?o:String(o)),r)}var o}var b=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._formInputSelector=e.formInput,this._formSubmitBtnSelector=e.formSubmitBtn,this._formSubmitBtnInactiveSelector=e.formSubmitBtnInactive,this._formInputTypeErrorSelector=e.formInputTypeError,this._formElement=n}var e,n;return e=t,(n=[{key:"_disableSaveBtn",value:function(){this._buttonElement.classList.add(this._formSubmitBtnInactiveSelector),this._buttonElement.disabled=!0}},{key:"_enableSaveBtn",value:function(){this._buttonElement.classList.remove(this._formSubmitBtnInactiveSelector),this._buttonElement.disabled=!1}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(t){return!t.validity.valid}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?this._disableSaveBtn():this._enableSaveBtn()}},{key:"_showInputError",value:function(t,e){var n=this._formElement.querySelector(".".concat(t.id,"-error"));t.classList.add(this._formInputTypeErrorSelector),n.textContent=e}},{key:"_hideInputError",value:function(t){var e=this._formElement.querySelector(".".concat(t.id,"-error"));t.classList.remove(this._formInputTypeErrorSelector),e.textContent=""}},{key:"_checkInputValidity",value:function(t){t.validity.valid?this._hideInputError(t):this._showInputError(t,t.validationMessage)}},{key:"_setEventListeners",value:function(){var t=this;this._inputList=Array.from(this._formElement.querySelectorAll(".".concat(this._formInputSelector))),this._buttonElement=this._formElement.querySelector(".".concat(this._formSubmitBtnSelector)),this._toggleButtonState(),this._inputList.forEach((function(e){e.addEventListener("input",(function(){t._checkInputValidity(e),t._toggleButtonState()}))}))}},{key:"resetValidation",value:function(){var t=this;this._toggleButtonState(),this._inputList.forEach((function(e){t._hideInputError(e)}))}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&v(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function _(t){return _="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_(t)}function g(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==_(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==_(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===_(o)?o:String(o)),r)}var o}var S=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._popup=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this),this.setEventListeners()}var e,n;return e=t,(n=[{key:"open",value:function(){this._popup.classList.add(r),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove(r),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(t){"Escape"===t.key&&this.close()}},{key:"setEventListeners",value:function(){var t=this;this._popup.addEventListener("click",(function(e){(e.target===e.currentTarget||e.target.classList.contains("popup__close-btn"))&&t.close()}))}}])&&g(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function k(t){return k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},k(t)}function E(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==k(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==k(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===k(o)?o:String(o)),r)}var o}function w(){return w="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=O(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},w.apply(this,arguments)}function j(t,e){return j=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},j(t,e)}function O(t){return O=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},O(t)}var P=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&j(t,e)}(c,t);var r,o,i,a,u=(i=c,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=O(i);if(a){var n=O(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===k(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function c(t){var r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,c),(r=u.call(this,t))._caption=r._popup.querySelector(e),r._image=r._popup.querySelector(n),r}return r=c,(o=[{key:"open",value:function(t){var e=t.image,n=t.caption;this._image.src=e,this._image.alt=n,this._caption.textContent=n,w(O(c.prototype),"open",this).call(this)}}])&&E(r.prototype,o),Object.defineProperty(r,"prototype",{writable:!1}),c}(S);function I(t){return I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},I(t)}function L(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function C(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==I(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==I(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===I(o)?o:String(o)),r)}var o}function T(){return T="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=B(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},T.apply(this,arguments)}function R(t,e){return R=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},R(t,e)}function B(t){return B=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},B(t)}var q=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&R(t,e)}(l,t);var e,n,r,u,c=(r=l,u=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=B(r);if(u){var n=B(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===I(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function l(t){var e,n=t.selector,r=t.handleSubmitForm;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,l),(e=c.call(this,n))._formElement=e._popup.querySelector(o),e._inputElements=e._formElement.querySelectorAll(i),e._submitBtnElement=e._popup.querySelector(a),e._submitText=e._submitBtnElement.textContent,e._handleSubmitForm=r,e}return e=l,n=[{key:"renderLoading",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Сохранение...";this._submitBtnElement.textContent=t?e:this._submitText}},{key:"_getInputValues",value:function(){var t={};return this._inputElements.forEach((function(e){t[e.name]=e.value})),t}},{key:"setInputValues",value:function(t){for(var e=0,n=Object.entries(t);e<n.length;e++){var r=(a=n[e],u=2,function(t){if(Array.isArray(t))return t}(a)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i,a,u=[],c=!0,l=!1;try{if(i=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=i.call(n)).done)&&(u.push(r.value),u.length!==e);c=!0);}catch(t){l=!0,o=t}finally{try{if(!c&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(a,u)||function(t,e){if(t){if("string"==typeof t)return L(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?L(t,e):void 0}}(a,u)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];this._formElement.elements[o].value=i}var a,u}},{key:"close",value:function(){T(B(l.prototype),"close",this).call(this),this._formElement.reset()}},{key:"setEventListeners",value:function(){var t=this;T(B(l.prototype),"setEventListeners",this).call(this),this._popup.addEventListener("submit",(function(e){e.preventDefault(),t._handleSubmitForm(t._getInputValues())}))}}],n&&C(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),l}(S);function U(t){return U="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},U(t)}function x(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==U(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==U(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===U(o)?o:String(o)),r)}var o}function D(){return D="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=V(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},D.apply(this,arguments)}function A(t,e){return A=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},A(t,e)}function V(t){return V=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},V(t)}var F=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&A(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=V(r);if(o){var n=V(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===U(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function a(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),i.apply(this,arguments)}return e=a,(n=[{key:"setCallback",value:function(t){this._handleSubmit=t}},{key:"setEventListeners",value:function(){var t=this;D(V(a.prototype),"setEventListeners",this).call(this),this._popup.addEventListener("submit",(function(e){e.preventDefault(),t._handleSubmit()}))}}])&&x(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a}(S);function M(t){return M="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},M(t)}function N(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==M(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==M(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===M(o)?o:String(o)),r)}var o}var J=function(){function t(e,n){var r=e.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._renderer=r,this._container=document.querySelector(n)}var e,n;return e=t,(n=[{key:"renderItems",value:function(t){var e=this;t.forEach((function(t){return e._renderer(t)}))}},{key:"prependItem",value:function(t){this._container.prepend(t)}},{key:"appendItem",value:function(t){this._container.append(t)}}])&&N(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function H(t){return H="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},H(t)}function z(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==H(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==H(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===H(o)?o:String(o)),r)}var o}var $=function(){function t(e){var n=e.baseUrl,r=e.headers;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._baseUrl=n,this._headers=r}var e,n;return e=t,n=[{key:"_getResponseData",value:function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}},{key:"getUserInfo",value:function(){var t=this;return fetch("".concat(this._baseUrl,"/users/me"),{headers:this._headers}).then((function(e){return t._getResponseData(e)}))}},{key:"updateUserInfo",value:function(t){var e=this;return fetch("".concat(this._baseUrl,"/users/me"),{headers:this._headers,method:"PATCH",body:JSON.stringify(t)}).then((function(t){return e._getResponseData(t)}))}},{key:"updateAvatar",value:function(t){var e=this;return fetch("".concat(this._baseUrl,"/users/me/avatar"),{headers:this._headers,method:"PATCH",body:JSON.stringify(t)}).then((function(t){return e._getResponseData(t)}))}},{key:"getInitialCards",value:function(){var t=this;return fetch("".concat(this._baseUrl,"/cards"),{headers:this._headers}).then((function(e){return t._getResponseData(e)}))}},{key:"addCard",value:function(t){var e=this;return fetch("".concat(this._baseUrl,"/cards"),{headers:this._headers,method:"POST",body:JSON.stringify(t)}).then((function(t){return e._getResponseData(t)}))}},{key:"removeCard",value:function(t){var e=this;return fetch("".concat(this._baseUrl,"/cards/").concat(t),{headers:this._headers,method:"DELETE"}).then((function(t){return e._getResponseData(t)}))}},{key:"addLike",value:function(t){var e=this;return fetch("".concat(this._baseUrl,"/cards/").concat(t,"/likes"),{headers:this._headers,method:"PUT"}).then((function(t){return e._getResponseData(t)}))}},{key:"removeLike",value:function(t){var e=this;return fetch("".concat(this._baseUrl,"/cards/").concat(t,"/likes"),{headers:this._headers,method:"DELETE"}).then((function(t){return e._getResponseData(t)}))}}],n&&z(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}(),G=new $({baseUrl:"".concat("https://mesto.nomoreparties.co","/v1/").concat("cohort-59"),headers:{authorization:"64f46641-1d17-4ea8-b206-5bf810349ffe","Content-Type":"application/json"}});Promise.all([G.getUserInfo(),G.getInitialCards()]).then((function(t){K.setUserInfo(t[0]),K.setAvatar(t[0].avatar),Q.renderItems(t[1])})).catch((function(t){return"Ошибка загрузки информации: ".concat(t)}));var K=new m({nameSelector:".profile__user-name",aboutSelector:".profile__user-description",avatarSelector:".profile__avatar"}),Q=new J({renderer:function(t){var e=ot(t);Q.appendItem(e)}},"#photo-grid-container"),W=new P("#popup-view-image"),X=new F("#popup-del-card"),Y=new q({selector:"#popup-edit-profile",handleSubmitForm:function(t){Y.renderLoading(!0),G.updateUserInfo(t).then((function(t){K.setUserInfo(t),Y.close()})).catch((function(t){return"Ошибка редактирования профиля пользователя: ".concat(t)})).finally((function(){Y.renderLoading(!1)}))}}),Z=new q({selector:"#popup-edit-avatar",handleSubmitForm:function(t){Z.renderLoading(!0),G.updateAvatar(t).then((function(t){K.setAvatar(t.avatar),Z.close()})).catch((function(t){return"Ошибка загрузки аватара пользователя: ".concat(t)})).finally((function(){Z.renderLoading(!1)}))}}),tt=new q({selector:"#popup-add-card",handleSubmitForm:function(t){tt.renderLoading(!0),G.addCard(t).then((function(t){var e=ot(t);Q.prependItem(e),tt.close()})).catch((function(t){return"Ошибка отправки карточки на сервер: ".concat(t)})).finally((function(){tt.renderLoading(!1)}))}}),et=new b(t,document.forms["form-edit-avatar"]),nt=new b(t,document.forms["form-edit-profile"]),rt=new b(t,document.forms["form-add-card"]);function ot(t){return new p(t,K.getId(),u,(function(t,e){W.open({image:e,caption:t})}),(function(t){X.open(),X.setCallback((function(){!function(t){G.removeCard(t.getId()).then((function(){t.remove(),X.close()})).catch((function(t){return"Ошибка удаления карточки: ".concat(t)}))}(t)}))}),(function(t){!function(t){G.addLike(t.getId()).then((function(e){t.updateLikes(e.likes)})).catch((function(t){return"Ошибка установки лайка: ".concat(t)}))}(t)}),(function(t){!function(t){G.removeLike(t.getId()).then((function(e){t.updateLikes(e.likes)})).catch((function(t){return"Ошибка установки лайка: ".concat(t)}))}(t)})).generate()}et.enableValidation(),nt.enableValidation(),rt.enableValidation();var it=document.querySelector(".profile__avatar-overlay"),at=document.querySelector(".profile__edit-btn"),ut=document.querySelector(".profile__add-btn");it.addEventListener("click",(function(){Z.setInputValues(K.getAvatar()),et.resetValidation(),Z.open()})),at.addEventListener("click",(function(){Y.setInputValues(K.getUserInfo()),nt.resetValidation(),Y.open()})),ut.addEventListener("click",(function(){rt.resetValidation(),tt.open()}))})();