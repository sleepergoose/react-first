class HttpService {
  constructor() {
    this.options = {
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json', // 'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: localStorage.getItem('accessToken'),
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
    };
  }

  get = async (url) => {
    const response = fetch(url, {
      method: 'GET',
      ...this.options,
    });

    return await response.json();
  };

  post = async (url, payload) => {
    const response = fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      ...this.options,
    });

    return await response.json();
  };

  put = async (url, payload) => {
    const response = fetch(url, {
      method: 'PUT',
      body: JSON.stringify(payload),
      ...this.options,
    });

    return await response.json();
  };

  delete = async (url) => {
    const response = fetch(url, {
      method: 'DELETE',
      ...this.options,
    });

    return await response.json();
  };
}

export default HttpService;
