import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Vehicle } from '../_models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';


@Component({ templateUrl: 'vehicle-list.component.html' })
export class VehicleListComponent implements OnInit {
    vehicles: Vehicle[] = [];

    vehicleSearchForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
        private vehicleService: VehicleService,
        private router: Router) { }

    ngOnInit() {
        this.vehicleSearchForm = this.formBuilder.group({
            query: ['']
        });

        this.vehicleService.getAll().pipe(first()).subscribe(vehicles => {
            this.vehicles = vehicles.data;
        });
    }
    get f() { return this.vehicleSearchForm.controls; }

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

    onKey(event: any) { 
        let query = event.target.value;
        this.vehicleService.getByQuery(query).pipe(first()).subscribe(vehicles => {
            this.vehicles = vehicles.data;
        });
    }
}