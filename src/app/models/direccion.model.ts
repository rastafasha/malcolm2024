export class Direccion{
    constructor(
        public id: number,
        public nombres_completos: string,
        public direccion: string,
        public referencia : string,
        public pais: string,
        public ciudad : string,
        public zip : string,
        public user: string,
        public googlemaps: string,
    ){
    }
}