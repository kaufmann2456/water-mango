import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
        return new Plant(plant.id, plant.name, new Date(plant.lastWateredTime), plant.imageUrl);
       })
    ));
  }

  updateLastWateredTime(id: number, dateTime: Date): Observable<Plant> {
    let params = new HttpParams()
    .set("id", id)
    .set("dateTime", dateTime.toISOString());
    
    return this.http.post<Plant>(`${environment.apiUrl}/updateLastWateredTime`, params)
    .pipe(
      map(plant => { 
        return new Plant(plant.id, plant.name, new Date(plant.lastWateredTime), plant.imageUrl);
      })
    );
  }
}
