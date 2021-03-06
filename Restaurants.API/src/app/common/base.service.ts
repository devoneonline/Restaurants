import { Injector } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

export abstract class BaseService<TEntity, TCreateReturn, TReadReturn, TUpdateReturn, TDeleteReturn> {

    protected baseUrl: string = null;
    protected headers: Headers = null;
    protected http: Http;

    constructor(
        url: string,
        headers: Headers,
        injector: Injector
    ) { 
        this.baseUrl = url;
        this.headers = headers;
        this.http = injector.get(Http);
    }

    getSingle(
        id: number
    ): Promise<TReadReturn> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as TReadReturn)
            .catch(this.handleError);
    }

    getList(args: any): Promise<TReadReturn[]> {
        return this.http.get(this.baseUrl)
            .toPromise()
            .then(response => response.json() as TReadReturn[]
            ).catch(this.handleError);
    }

    getPagedList(
        args: any,
        pageNumber: number,
        pageSize: number
    ): Promise<TReadReturn[]> {
        let params = new URLSearchParams();
        params.append("pageNumber", pageNumber.toString());
        params.append("pageSize", pageSize.toString());

        let options = new RequestOptions({ search: params });

        return this.http
            .get(this.baseUrl, options)
            .toPromise()
            .then(response => response.json() as TReadReturn[]
            ).catch(this.handleError);
    }

    create(
        item: TEntity
    ): Promise<TCreateReturn> {
        let options = new RequestOptions({ headers: this.headers });

        let json = JSON.stringify(item);
        Object.keys(item).filter(key => key[0] === "_").forEach(key => {
            json = json.replace(key, key.substring(1));
        });

        return this.http
            .post(this.baseUrl, json, options)
            .toPromise()
            .then(response => response.json() as TCreateReturn)
            .catch(this.handleError);
    }

    update(
        id: number,
        item: TEntity
    ): Promise<TUpdateReturn> {
        const url = `${this.baseUrl}/${id}`;
        let options = new RequestOptions({ headers: this.headers });

        let json = JSON.stringify(item);
        Object.keys(item).filter(key => key[0] === "_").forEach(key => {
            json = json.replace(key, key.substring(1));
        });

        return this.http
            .put(url, json, options)
            .toPromise()
            .then(response => response.json() as TUpdateReturn)
            .catch(this.handleError);
    }

    delete(
        id: number,
        args: any
    ): Promise<TDeleteReturn> {
        const url = `${this.baseUrl}/${id}`;
        let options = new RequestOptions({ headers: this.headers });

        return this.http
            .delete(url, options)
            .toPromise()
            .then(response => response.json() as TDeleteReturn)
            .catch(this.handleError);
    }

    protected handleError(error: Response): Promise<any> {
        var x;
        var y = ['Something went wrong'];

        try {
            x = error.json()
        } catch (e) {
            x = y;
        }

        if (Array.isArray(x))
            return Promise.reject(x)
        else
            return Promise.reject(y);
    }
}
