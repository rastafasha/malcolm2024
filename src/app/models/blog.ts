import { environment } from "src/environments/environment";
import { Categoria } from './categoria';
const base_url = environment.apiUrlMedia;
export class Blog {

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
     public created_at: Date,
     public updated_at: Date,
     public status?: 'PUBLISHED' | 'PENDING' | 'REJECTED',
     public imagen?: string,
     public user_id?: string,
  ){}

  get imagenUrl(){

    if(!this.imagen){
      return `${base_url}/blogs/no-image.jpg`;
    } else if(this.imagen.includes('https')){
      return this.imagen;
    } else if(this.imagen){
      return `${base_url}/blogs/${this.imagen}`;
    }else {
      return `${base_url}/no-image.jpg`;
      // return `./assets/img/no-image.jpg`;
    }

  }
  


}
