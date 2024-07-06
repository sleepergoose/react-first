class HttpService {
  constructor() {
    this.options = {
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json', // 'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: localStorage.getItem('token'),
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
    };
  }

  get = async (url) => {
    return await fetch(url, {
      method: 'GET',
      ...this.options,
    }).then((response) => response.json());
  };

  post = async (url, payload) => {
    return await fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      ...this.options,
    }).then((response) => response.json());
  };

  put = async (url, payload) => {
    return await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(payload),
      ...this.options,
    }).then((response) => response.json());
  };

  delete = async (url) => {
    return await fetch(url, {
      method: 'DELETE',
      ...this.options,
    }).then((response) => response.json());
  };
}

export default HttpService;
