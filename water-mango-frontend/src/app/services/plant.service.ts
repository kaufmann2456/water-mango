import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Plant } from '../models/plant';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private http: HttpClient) { }

  getPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${environment.apiUrl}/getPlants`)
    .pipe(
      map(plants => plants.map(plant => { 
        return new Plant(plant.id, plant.name, new Date(plant.lastWateredTime));
       })
    ));
  }
}
