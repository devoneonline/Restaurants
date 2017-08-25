﻿export abstract class BaseModel {
    id: number;
    createdByUserId: number;
    createdBy: People = {} as People;
    createdDateTime: string;
    modifiedByUserId: number;
    modifiedBy: People = {} as People;
    modifiedDateTime: string;
}

export class Restaurant extends BaseModel {
    name: string;
    description: string;
}

export class EmployersRestaurants extends BaseModel {
    restaurantId: number;
    theEmployer: Employers;
    employerId: number;
    theRestaurant: Restaurant;
}

export class Employers extends BaseModel {
    personId: number;
    theEmployerDetails: People;
}

export class People extends BaseModel {
    personFirstName: string;
    personMiddleName: string;
    personLastName: string;
}

export class Tupple<IFirst, ISecond> {
    item1: IFirst;
    item2: ISecond;
}

export class Phone extends BaseModel {
    restaurantId: number;
    phoneNumber: string;
    phoneDescription: string;
}

export class Address extends BaseModel {
    restaurantId: number;
    floor: number;
    streetNumber: string;
    route: string;
    locality: string;
    administrativeAreaLevel2: string;
    administrativeAreaLevel1: string;
    country: string;
    zipCode: number;
    googleLink: string;
    theLocationPoint: Coordinates;
}

export class Coordinates extends BaseModel {
    latitude: number;
    longitude: number;
}

export enum DayOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}

export class Worktime extends BaseModel {

    constructor() {
        super();

        var time_zone = new Date().getTimezoneOffset();

        this.utcMinutes = time_zone % 60;
        if (this.utcMinutes < 0)
            this.utcMinutes * (-1);

        if (time_zone < 0)
            this.utcHours = ((time_zone * (-1)) - this.utcMinutes) / 60;
        else
            this.utcHours = ((time_zone - this.utcMinutes) / 60) * (-1);

        this.startDay = DayOfWeek.Sunday;
        this.endDay = DayOfWeek.Sunday;
        this.startHours = 0;
        this.endHours = 0;
        this.startMinutes = 0;
        this.endMinutes = 0;
        this.startTime = '00:00:00';
        this.endTime = '00:00:00';

    }

    restaurantId: number;

    private _startDay: DayOfWeek
    startDayName: string;
    get startDay(): DayOfWeek {
        return this._startDay;
    }
    set startDay(value: DayOfWeek) {
        this._startDay = value;
        this.startDayName = DayOfWeek[value].toString();
    }
    

    private _endDay: DayOfWeek;
    endDayName: string;
    get endDay(): DayOfWeek {
        return this._endDay;
    }
    set endDay(value: DayOfWeek) {
        this._endDay = value;
        this.endDayName = DayOfWeek[value].toString();
    }

    utcHours: number = 0;
    utcMinutes: number = 0;

    startHours: number = 0;
    endHours: number = 0;

    startMinutes: number = 0;
    endMinutes: number = 0;

    private _startTime: string = '00:00:00';
    get startTime(): string {
        return this._startTime;
    }
    set startTime(value: string) {
        var splitted = value.split(':');

        var h: number = +splitted[0];
        var m: number = +splitted[1];

        var t = (h * 60 + m);
        if (this.utcHours < 0) {
            t = t + ((this.utcHours * (-1) * 60) + (this.utcMinutes * 1)) * (-1);
        } else {
            t = t + (this.utcHours * 60) + (this.utcMinutes * 1)
        }

        if (t < 0) t = t + (24 * 60);
        this.startMinutes = t % 60;
        this.startHours = (t - this.startMinutes) / 60;

        this._startTime = `${this.startHours < 10 ? '0' : ''}${this.startHours}:${this.startMinutes < 10 ? '0' : ''}${this.startMinutes}:00`;
    }

    private _endTime: string = '00:00:00';
    get endTime(): string {
        return this._endTime;
    }
    set endTime(value: string) {
        var splitted = value.split(':');

        var h: number = +splitted[0];
        var m: number = +splitted[1];

        var t = (h * 60 + m);
        if (this.utcHours < 0) {
            t = t + ((this.utcHours * (-1) * 60) + (this.utcMinutes * 1)) * (-1);
        } else {
            t = t + (this.utcHours * 60) + (this.utcMinutes * 1)
        }

        if (t < 0) t = t + (24 * 60);
        this.endMinutes = t % 60;
        this.endHours = (t - this.endMinutes) / 60;

        this._endTime = `${this.endHours < 10 ? '0' : ''}${this.endHours}:${this.endMinutes < 10 ? '0' : ''}${this.endMinutes}:00`;
    }

    totalStartMinutes(): number {
        return (this.startDay * 24 * 60)
            + (this.startHours * 60)
            + (this.startMinutes * 1);
    }

    totalEndMinutes(): number {
        return (this.endDay * 24 * 60)
            + (this.endHours * 60)
            + (this.endMinutes * 1);
    }

    timeDifference(): string[] {
        var diff = this.totalEndMinutes() - this.totalStartMinutes();
        if (diff < 0)
            diff = diff + 7 * 24 * 60;

        var m = diff % 60;
        var h = ((diff - m) / 60) % 24;
        var d = (((diff - m) / 60) - h) / 24;

        return [`${d} days`, `${h} h`, `${m} min`];
    }
}