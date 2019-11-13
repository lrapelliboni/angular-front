import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../_services';

@Component({
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.css']
})
export class VehicleEditComponent implements OnInit {
  
  soldSelected: boolean;
  vehicleEditForm: FormGroup;

  submitted = false;
  returnUrl: string;
  error = '';

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService) {
    this.soldSelected = true;
  }

  ngOnInit() {

    let vehicleId = window.localStorage.getItem("vehicleId");
    this.vehicleService.getById(+vehicleId)
      .subscribe( data => {       
        this.vehicleEditForm.setValue(data.data);
      });

    this.vehicleEditForm = this.formBuilder.group({
      id: [''],
      veiculo: ['', Validators.required],
      marca: [''],
      ano: [''],
      descricao: [''],
      vendido: [this.soldSelected],
    });

    this.returnUrl = '/veiculos';
  }

  changeSold() {
    this.soldSelected = !this.soldSelected;
  }

  get f() { return this.vehicleEditForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.vehicleEditForm.invalid) {
      return;
    }
    this.vehicleService.update(this.vehicleEditForm.value)
      .subscribe(data => {
        this.router.navigate([this.returnUrl]);
      });
  }
}

