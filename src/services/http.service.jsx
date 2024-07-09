class HttpService {
  constructor() {
    this.options = {
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json', // 'Content-Type': 'application/x-www-form-urlencoded',
        // Authorization: localStorage.getItem('accessToken'),
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
    };
  }

  get = async (url) => {
    return new Promise((res, rej) => {
      fetch(url, {
        method: 'GET',
        ...this.options,
      })
        .then((res) => res.json())
        .then((data) => {
          res(data);
        })
        .catch((err) => {
          rej(err);
        });
    });
  };

  post = async (url, payload) => {
    return new Promise((res, rej) => {
      fetch(url, {
        method: 'POST',
        body: payload ? JSON.stringify(payload) : undefined,
        ...this.options,
      })
        .then((res) => (res.status !== 204 ? res.json() : null))
        .then((data) => {
          res(data);
        })
        .catch((err) => {
          rej(err);
        });
    });
  };

  put = async (url, payload) => {
    return new Promise((res, rej) => {
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify(payload),
        ...this.options,
      })
        .then((res) => res.json())
        .then((data) => {
          res(data);
        })
        .catch((err) => {
          rej(err);
        });
    });
  };

  delete = async (url) => {
    return new Promise((res, rej) => {
      fetch(url, {
        method: 'DELETE',
        ...this.options,
      })
        .then((res) => res.json())
        .then((data) => {
          res(data);
        })
        .catch((err) => {
          rej(err);
        });
    });
  };
}

export default HttpService;
