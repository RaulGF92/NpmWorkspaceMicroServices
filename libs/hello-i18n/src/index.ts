export default class HelloI18n {
    static getHelloByLanguage(lang?: string) {
        switch (lang) {
            case "es":
                return 'Hola';
            default:
                return 'Hello';
        }
    }
}
