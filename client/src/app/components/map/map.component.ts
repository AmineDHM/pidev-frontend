import { EventType } from './../../../../../admin/src/app/services/event-services/event-type';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @Input() events: EventType[] = []

  ngOnChanges(changes: SimpleChanges) {
    let curr: any = changes['events'].currentValue
    this.events = curr
  }

  constructor() {}

  ngOnInit(): void {
  }
}
