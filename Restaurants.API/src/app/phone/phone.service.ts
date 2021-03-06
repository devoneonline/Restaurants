﻿import { Injector, Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';

import { BaseService } from './../common/base.service';
import { Phone } from './../common/model';

@Injectable()
export class PhoneService extends BaseService<Phone, Phone, Phone, Phone, Boolean> {

    constructor(
        injector: Injector
    ) {
        const url = 'api/restaurant/phone';
        const headers = new Headers({
            'Content-Type': 'application/json;charset=utf-8'
        });
        super(url, headers, injector);
    }

    getPagedList(
        restaurantId: number,
        pageNumber: number,
        pageSize: number
    ): Promise<Phone[]> {
        let params = new URLSearchParams();
        params.append("restaurantId", restaurantId.toString());
        params.append("pageNumber", pageNumber.toString());
        params.append("pageSize", pageSize.toString());

        let options = new RequestOptions({ search: params });

        return this.http
            .get(this.baseUrl, options)
            .toPromise()
            .then(response => response.json() as Phone[]
            ).catch(this.handleError);
    }

    delete(
        id: number,
        restaurantId: number
    ): Promise<Boolean> {
        const url = `${this.baseUrl}/${id}`;

        let params = new URLSearchParams();
        params.append("restaurantId", restaurantId.toString());

        let options = new RequestOptions({ headers: this.headers, search: params });

        return this.http.delete(url, options)
            .toPromise()
            .then(response => response.json() as Boolean)
            .catch(this.handleError);
    }
}