import faker from 'faker';
import { Mappable } from './Map';

export class Company implements Mappable {
    companyName: string;
    catchPhrase: string;
    location: {
        latitude: number;
        longitude: number;
    };
    color: string = 'blue';
    
    constructor() {
        this.companyName = faker.company.companyName;
        this.catchPhrase = faker.company.catchPhrase;
        this.location = {
            latitude: parseFloat(faker.address.latitude()),
            longitude: parseFloat(faker.address.longitude())
        };
    }

    markerContent(): string {
        return `<div>
                    <h1>Companyname: ${this.companyName}</h1><br/>
                    <h3>Catch phrase: ${this.catchPhrase}</h3>
                </div>
                `;
    }
}