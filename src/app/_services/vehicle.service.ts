import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Vehicle, GetVehiclesResponse } from '../_models';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class VehicleService {
    constructor(private http: HttpClient) { }

    url = 'http://127.0.0.1:8000/api/veiculos';
  
    getAll() {
        return this.http.get<Vehicle[]>(this.url);
    }

    getById(id: number) {
        return this.http.get<Vehicle>(this.url + '/' + id);
    }

    create(Vehicle: Vehicle) {
        return this.http.post(this.url, Vehicle);
    }

    update(Vehicle: Vehicle) {
        return this.http.put(this.url + '/' + Vehicle.id, Vehicle);
    }

    delete(id: number) {
        return this.http.delete(this.url + '/' + id);
    }
}