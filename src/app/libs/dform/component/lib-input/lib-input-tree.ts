import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormTree } from '../../_entity/form-tree';

@Component({
  selector: 'app-input-tree',
  template: `
    <div [formGroup]="form">
      <div class="input_container">
        <section calss="input_content">
          <div class="clear" style="padding: 3px 0">
            <mat-icon style="float:left" *ngIf="!data.options.open" (click)="toggle(data.options)">add</mat-icon>
            <mat-icon style="float:left" *ngIf="data.options.open" (click)="toggle(data.options)">remove</mat-icon>
            <div style="float:left">
              <mat-checkbox [(checked)]="data.options.checked" (change)="getChecked($event, data.options)">
                {{data.options.menuName}}
              </mat-checkbox>
              <div *ngIf="data.options.open&&data.options.children" style="padding-top: 3px">
                <div *ngFor="let opt of data.options.children" class="clear" style="padding: 3px 0">
                  <mat-icon style="float:left" *ngIf="!opt.open" (click)="toggle(opt)">add</mat-icon>
                  <mat-icon style="float:left" *ngIf="opt.open" (click)="toggle(opt)">remove</mat-icon>
                  <div style="float:left">
                    <mat-checkbox [(checked)]="opt.checked" (change)="getChecked($event, opt)">
                      {{opt.menuName}}
                    </mat-checkbox>
                    <div *ngIf="opt.open&&opt.children" style="padding-top: 3px">
                      <div *ngFor="let subopt of opt.children" class="clear" style="padding: 3px 0">
                        <mat-icon style="float:left">remove</mat-icon>
                        <div style="float:left">
                          <mat-checkbox [(checked)]="subopt.checked" (change)="getChecked($event, subopt)">
                            {{subopt.menuName}}
                          </mat-checkbox>
                          <div *ngIf="subopt.open&&subopt.children" style="padding-top: 3px">
                            <div *ngFor="let ssubopt of subopt.children" class="clear" style="padding: 3px 0">
                              <mat-icon style="float:left">remove</mat-icon>
                              <div style="float:left">
                                <mat-checkbox [(checked)]="ssubopt.checked" (change)="getChecked($event, ssubopt)">
                                  {{ssubopt.menuName}}
                                </mat-checkbox>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <span class="input_span">{{data.label}}</span>
        <input type="hidden" [formControlName]="data.key" [(ngModel)]="value">
      </div>
    </div>
  `,
  styleUrls: ['./lib-input.scss']
})
export class LibInputTreeComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() data: FormTree;
  @Input() value: Array<any>;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('date') date: any;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.setInit(this.data.options);
    this.getValue();
  }

  getChecked(div, opt) {
    if (div.checked) {
      this.setChecked(opt);
      this.setParentChecked(opt.parentId);
    } else {
      this.setUnChecked(opt);
      this.setParentUnChecked(opt);
    }
    this.getValue();
  }

  setInit(data) {
    data.open = true;
    if (data.children && data.children.length !== 0) {
      data.children.forEach(obj => {
        this.setInit(obj);
      });
    }
  }

  getValue() {
    const value = [];
    if (this.data.options.checked) {
      value.push(this.data.options.menuId);
    }
    if (this.data.options.children) {
      this.data.options.children.forEach(obj => {
        if (obj.checked) {
          value.push(obj.menuId);
        }
        if (obj.children) {
          obj.children.forEach(subObj => {
            if (subObj.checked) {
              value.push(subObj.menuId);
            }
            if (subObj.children) {
              subObj.children.forEach(ssubObj => {
                if (ssubObj.checked) {
                  value.push(ssubObj.menuId);
                }
              });
            }
          });
        }
      });
    }
    this.value = value;
    this.cdr.detectChanges();
    this.valueChange.emit(value);
  }

  setChecked(data) {
    data.checked = true;
    if (data.children && data.children.length !== 0) {
      data.children.forEach(obj => {
        this.setChecked(obj);
      });
    }
  }

  setParentChecked(pid) {
    if (this.data.options.menuId === pid) {
      this.data.options.checked = true;
    }
    if (this.data.options.children) {
      this.data.options.children.forEach(obj => {
        if (obj.menuId === pid) {
          obj.checked = true;
          this.setParentChecked(obj.parentId);
        }
        if (obj.children && obj.children.length !== 0) {
          obj.children.forEach(subObj => {
            if (subObj.menuId === pid) {
              subObj.checked = true;
              this.setParentChecked(subObj.parentId);
            }
            if (subObj.children && subObj.children.length !== 0) {
              subObj.children.forEach(ssubObj => {
                if (ssubObj.menuId === pid) {
                  ssubObj.checked = true;
                  this.setParentChecked(ssubObj.parentId);
                }
              });
            }
          });
        }
      });
    }
  }

  setUnChecked(data) {
    data.checked = false;
    if (data.children && data.children.length !== 0) {
      data.children.forEach(obj => {
        this.setUnChecked(obj);
      });
    }
  }

  setParentUnChecked(opt) {
    if (this.data.options.children) {
      this.data.options.children.forEach(obj => {
        if (obj.children && obj.children.length !== 0) {
          obj.children.forEach(subObj => {
            if (subObj.parentId === opt.parentId) {
              let flag = 0;
              if (obj.children && obj.children.length !== 0) {
                obj.children.forEach(pobj => {
                  if (pobj.checked && pobj.menuId !== opt.parentId) {
                    flag++;
                  }
                });
              }
              obj.checked = flag > 0;
              this.setParentUnChecked(obj);
            }
          });
          if (obj.parentId === opt.parentId) {
            let flag = 0;
            this.data.options.children.forEach(pobj => {
              if (pobj.checked && pobj.menuId !== opt.parentId) {
                flag++;
              }
            });
            this.data.options.checked = flag > 0;
          }
        }
      });
    }
  }

  toggle(data) {
    data.open = !data.open;
  }

  change() {
    this.valueChange.emit(this.value);
  }
}
