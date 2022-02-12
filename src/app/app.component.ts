import { Component } from '@angular/core';

// REVIEW For dynamic data, more info is needed around nullable values.
interface Blocks {
  name: String;
  farmName: String;
  status: String;
  variant: String | null;
  size: Number;
  deletedAt: String | null;
  createdAt: String;
}


const Blocks_Data: Blocks[] =
  [
    {
      "name": "A2",
      "farmName": "Brooklyn",
      "variant": "Durance",
      "deletedAt": null,
      "status": "PRODUCTION",
      "createdAt": "2020-04-18T22:00:00.000+00:00",
      "size": 2.44444
    },
    {
      "name": "A3",
      "farmName": "Brooklyn",
      "variant": null,
      "deletedAt": null,
      "status": "AREA",
      "createdAt": "2020-04-18T22:00:00.000+00:00",
      "size": 3.887263
    },
    {
      "name": "A11",
      "farmName": "Brooklyn",
      "variant": "Butternut",
      "status": "COMPLETE",
      "deletedAt": "2020-09-21T22:00:00.000+00:00",
      "createdAt": "2020-04-18T22:00:00.000+00:00",
      "size": 1.338473663
    },
    {
      "name": "L8-0",
      "farmName": "Langplaas",
      "variant": "Tomato",
      "deletedAt": null,
      "status": "PRODUCTION",
      "createdAt": "2021-05-11T22:00:00.000+00:00",
      "size": 5.443324
    },
    {
      "name": "L23-1",
      "farmName": "Langplaas",
      "variant": null,
      "deletedAt": null,
      "status": "AREA",
      "createdAt": "2021-04-22T22:00:00.000+00:00",
      "size": 0.223442
    },
    {
      "name": "L13-9",
      "farmName": "Langplaas",
      "variant": "Green Pepper",
      "status": "COMPLETE",
      "deletedAt": "2021-09-21T22:00:00.000+00:00",
      "createdAt": "2021-04-18T22:00:00.000+00:00",
      "size": 3.2234
    }
  ];




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  columns: string[] = ['name', 'farmName', 'status', 'variant', 'size', 'deletedAt', 'createdAt',];
}