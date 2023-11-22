import { environment } from "src/environments/environment";
import { Categoria } from './categoria';
const base_url = environment.apiUrlMedia;
export class Portafolio {

  constructor(
    public id: number,
    public  title: string,
    public  description: string,
    public  introhome: string,
     public categorias: Categoria,
     public slug: string,
     public popup: string,
     public youtubeurl: string,
     public isFeatured: boolean,
     public createdAt: Date,
     public updatedAt: Date,
     public status?: 'PUBLISHED' | 'PENDING' | 'REJECTED',
     public imagen?: string,
     public user_id?: string,
  ){}

  get imagenUrl(){

    if(!this.imagen){
      return `${base_url}/portafolios/no-image.jpg`;
    } else if(this.imagen.includes('https')){
      return this.imagen;
    } else if(this.imagen){
      return `${base_url}/${this.imagen}`;
    }else {
      return `${base_url}/no-image.jpg`;
      // return `./assets/img/no-image.jpg`;
    }

  }
  


}
