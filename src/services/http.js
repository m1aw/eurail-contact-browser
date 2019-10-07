import qs from 'qs'

export class HttpService {

    defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    get = (url, params, config) => {
        let getUrl = url;
        if (params) {
            getUrl = url + '?' + qs.stringify(params);
        }
        return this.request('GET', getUrl, config);
    };

    post = (url, data, config) => this.request('POST',
        url,
        {
            body: JSON.stringify(data),
            ...config,
        });

    put = (url, data, config) => this.request('PUT',
        url,
        {
            body: JSON.stringify(data),
            ...config,
        });

    delete = (url, data, config) => this.request('DELETE',
        url,
        {
            body: JSON.stringify(data),
            ...config,
        });


    request(method, url, opts) {
        const options = {
            method,
            ...this.defaultOptions,
            ...opts,
        }

        return fetch(url, options)
            .then(this.handleErrors)
            .then(res => {
                if (res.status === 204 || res.status === 201) {
                    return res
                }

                return res.json()
            })
            .catch((err) => {
                throw err
            })
    }

    async handleErrors(response) {
        if (response.ok) {
            return response
        }

        throw new Error(response.text)
    }

}