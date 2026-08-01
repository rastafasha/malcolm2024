export interface I18nString {
  es: string;
  en: string;
}
export class Categoria {
    _id: string;
    name: I18nString;
    slug: string;
    created_at?: any;
    updated_at?: any;
  }
  