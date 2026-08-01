import { environment } from "src/environments/environment";
import { Categoria } from './categoria';
const base_url = environment.mediaUrlRemoto;
// Define la estructura bilingüe para tus textos
export interface I18nString {
  es: string;
  en: string;
}

export class Portafolio {
  constructor(
    public _id: string,
    public title: I18nString,        // 👈 Actualizado a Objeto Bilingüe
    public description: I18nString,  // 👈 Actualizado a Objeto Bilingüe
    public introhome: I18nString,    // 👈 Actualizado a Objeto Bilingüe
    public category: Categoria,
    public slug: string,
    public popup: string,
    public youtubeurl: string,
    public isFeatured: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    public status?: 'PUBLISHED' | 'PENDING' | 'REJECTED',
    public user_id?: string,
  ) {}


  img: string;
    get imagenUrl() {

        if (!this.img) {
            return `assets/img/no-image.jpg`;
        } else if (this.img.includes('https')) {
            return this.img;
        } else if (this.img) {
            return `${base_url}/pagos/${this.img}`;
        } else {
            return `${base_url}/pagos/no-image.jpg`;
        }

    }


}
