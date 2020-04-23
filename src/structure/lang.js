import en from '../localization/en';

class LanguageHandler {
  #currentLang;
  
  constructor() {
    this.#currentLang = en;
  }
}

const Lang = new LanguageHandler();

export default Lang;