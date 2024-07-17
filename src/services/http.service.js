const options = {
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

class HttpService {
  static get = async (url) => {
    return new Promise((res, rej) => {
      fetch(url, {
        method: 'GET',
        ...options,
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

  static post = async (url, payload) => {
    return new Promise((res, rej) => {
      fetch(url, {
        method: 'POST',
        body: payload ? JSON.stringify(payload) : undefined,
        ...options,
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

  static put = async (url, payload) => {
    return new Promise((res, rej) => {
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify(payload),
        ...options,
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

  static delete = async (url) => {
    return new Promise((res, rej) => {
      fetch(url, {
        method: 'DELETE',
        ...options,
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
