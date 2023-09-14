class ApiMovies {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _checkResponse(res) {return res.ok ? res.json() : Promise.reject}

  _request(url, options) {
    return fetch(`${this._url}${url}`, options)
      .then(this._checkResponse)
  }

  getMovies() {
    return this._request('/')
  }
}
/*создаю экземпляр класса Api*/
const apiMovies = new ApiMovies({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default apiMovies
