export class Plant {
    id: number;
    name: string;
    lastWateredTime: Date;

    constructor(id: number, name: string, lastWateredDate: Date) {
        this.id = id;
        this.name = name;
        this.lastWateredTime = lastWateredDate;
    }
}