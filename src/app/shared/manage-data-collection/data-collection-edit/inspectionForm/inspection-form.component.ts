import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InspectionCategoryService } from '../../../../pci/manage-basic-data/inspection-category/_service/inspection-category.service';
import { InspectionItemService } from '../../../../pci/manage-basic-data/inspection-item/_service/inspection-item.service';
import { Inspection } from '../../_entity/data-collection.entity';

@Component({
  selector: 'app-inspection-form',
  templateUrl: 'inspection-form.component.html'
})
export class InspectionFormComponent implements OnInit {
  @Input() id: any;
  @Input() data: any;
  @Output() dataChange: EventEmitter<any> = new EventEmitter();

  info: any;

  inspectionType: any;
  inspectionList: any;
  selectedType = null;
  examinationItemCheckDate: any;

  inspectionFormList: Inspection[] = [];

  constructor(
    private _inspectionItemService: InspectionItemService,
    private _inspectionCategoryService: InspectionCategoryService
  ) {
  }

  ngOnInit() {
    this.getInspectionCategories();

    this.info = this.data;
    // console.log('inspection-form:'+JSON.stringify(this.info));

    this.selectedType = this.info && this.info.itemId || null;
    if (this.selectedType) {
      if (this.info && this.info.list !== 0) {
        this.inspectionType = this.info.list;
      } else {
        this.getInspectionItems(this.selectedType);
      }
    }
  }

  saveAsDraft() {
    if (this.selectedType != this.info.itemId) {
      this.selectedType = this.info.itemId;
      this.getInspectionItems(this.selectedType);
    }
    this.dataChange.emit();
  }

  getInspectionItems(type) {
    this._inspectionItemService.getInspectionItems(0, 99999, type)
      .subscribe(
        res => {
          if (res.code === 0 && res.data && res.data.content) {
            this.inspectionList = res.data.content;
            this.inspectionList.forEach(obj => {
              obj.itemId = this.selectedType;
            });
            this.info.list = [];
            this.inspectionList.forEach(list => {
              this.info.list.push({
                name: list.name,
                type: list.type,
                max: list.max,
                min: list.min,
                reference: list.reference,
                unit: list.unit,
                value: ''
              })
            });
            // console.log(this.info);
          }
        })
  }

  getInspectionCategories() {
    return this._inspectionItemService.getInspectionCategories()
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          this.inspectionType = res.data;
        } else {
          this.inspectionType = [];
        }
      }, err => {
        this.inspectionType = [];
        throw new Error(err);
      })
  }

}
