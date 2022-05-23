import { Component } from '@angular/core';
import { Plant } from './models/plant';
import { PlantService } from './services/plant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'water-mango-frontend';

  constructor(private plantService: PlantService) {
    plantService.getPlants().subscribe
    (data => 
      {
        let plants: Plant[] = data;
      });
  }
}
