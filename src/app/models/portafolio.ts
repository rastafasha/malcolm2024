import { environment } from "src/environments/environment";
import { Categoria } from './categoria';
const base_url = environment.mediaUrlRemoto;
export class Portafolio {

  constructor(
    public id: number,
    public  title: string,
    public  description: string,
    public  introhome: string,
     public category: Categoria,
     public slug: string,
     public popup: string,
     public youtubeurl: string,
     public isFeatured: boolean,
     public createdAt: Date,
     public updatedAt: Date,
     public status?: 'PUBLISHED' | 'PENDING' | 'REJECTED',
     public img?: string,
     public user_id?: string,
  ){}

  get imagenUrl(){

    if(!this.img){
      return `${base_url}/portafolios/no-image.jpg`;
    } else if(this.img.includes('https')){
      return this.img;
    } else if(this.img){
      return `${base_url}/${this.img}`;
    }else {
      return `${base_url}/no-image.jpg`;
      // return `./assets/img/no-image.jpg`;
    }

  }
  


}
