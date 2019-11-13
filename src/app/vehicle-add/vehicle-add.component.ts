import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../_services';

@Component({
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css']
})
export class VehicleAddComponent implements OnInit {

  soldSelected: boolean;
  vehicleAddForm: FormGroup;

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
    this.vehicleAddForm = this.formBuilder.group({
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

  get f() { return this.vehicleAddForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.vehicleAddForm.invalid) {
      return;
    }
    this.vehicleService.create(this.vehicleAddForm.value)
      .subscribe(data => {
        this.router.navigate([this.returnUrl]);
      });
  }
}

