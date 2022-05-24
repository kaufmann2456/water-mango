import { Component } from '@angular/core';
import { Plant } from './models/plant';
import { PlantService } from './services/plant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  plants: Plant[];

  constructor(plantService: PlantService) {
    plantService.getPlants().subscribe
    (plants => {
        this.plants = plants;
      }
    ),
    (err => {
      console.log(err);
      }
    );
  }
}
