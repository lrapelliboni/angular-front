
export class Vehicle {
    constructor(
        public id: number,
        public veiculo: string,
        public marca: string,
        public ano: number,
        public descricao: string,
        public vendido: boolean
    ) { }
    // id: number;
    // veiculo: string;
    // marca: string;
    // ano: number;
    // descricao: string;
    // vendido: boolean;
}
export interface GetVehiclesResponse {
    data: Vehicle[];
}