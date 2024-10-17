export class Boeket {
    id: number;
    name: string;
    fotoUrl: string;
    likes: number = 0;
    comments: number = 0;

    constructor(id: number, name: string, fotoUrl: string) {
        this.id = id;
        this.name = name;
        this.fotoUrl = fotoUrl;
    }
}