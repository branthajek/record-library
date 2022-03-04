import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {
  @Input() content!: string;
  @Output() closePopover = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onClose() {
    this.closePopover.emit(true);
  }
}
