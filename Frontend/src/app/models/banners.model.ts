export class Banners {

    image: Array<string>;
    title: string;
    subtitle: string;
    button: boolean;

    constructor (
        image: Array<string> = [],
        title: string = '',
        subtitle: string = '',
        button: boolean = false
    ){
        this.image = image;
        this.title = title;
        this.subtitle = subtitle;
        this.button = button
    }
}