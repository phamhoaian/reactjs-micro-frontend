import QueryString from 'query-string'
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

export const REQUEST_TYPE = {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
}

export default class BaseService {
    static async fetchData (method, apiUrl, query, body) {
      return new Promise(async (resolve, reject) => {
        let url = API_ENDPOINT + apiUrl;
        if (method === REQUEST_TYPE.GET && query) {
          url = url + '?' + QueryString.stringify(query);
        }
        try {
          let opt = {
            method: method,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          };
          if (body) {
            opt.body = JSON.stringify(body);
          }
          const response = await fetch(url, opt);
          const responJson = await response.json();
          resolve(responJson);
        } catch (error) {
          console.log('error', error)
          reject(error);
        }
      });
    }
  }