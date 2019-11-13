import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Vehicle } from '../_models';
import { VehicleService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';


@Component({templateUrl: 'vehicle-list.component.html'})
export class VehicleListComponent implements OnInit {
    vehicles: Vehicle[] = [];

    constructor(private vehicleService: VehicleService,
        private router: Router) {}

    ngOnInit() {
        this.vehicleService.getAll().pipe(first()).subscribe(vehicles => { 
            this.vehicles = vehicles.data; 
        });
    }

    deleteVehicle(vehicle: Vehicle): void {
        if (confirm('Deseja realmente exluir?')) {
            this.vehicleService.delete(vehicle.id)
                .subscribe(data => {
                    this.vehicles = this.vehicles.filter(u => u !== vehicle);
                })
        }
    };

    editVehicle(vehicle: Vehicle): void {
        window.localStorage.removeItem("vehicleId");
        window.localStorage.setItem("vehicleId", vehicle.id.toString());
        this.router.navigate(['/veiculos/edit', vehicle.id]);
    };
}