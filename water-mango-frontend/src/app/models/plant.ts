export class Plant {
    id: number;
    name: string;
    lastWateredTime: Date;
    imageUrl: string;

    constructor(id: number, name: string, lastWateredDate: Date, imageUrl: string) {
        this.id = id;
        this.name = name;
        this.lastWateredTime = lastWateredDate;
        this.imageUrl = imageUrl;
    }
}