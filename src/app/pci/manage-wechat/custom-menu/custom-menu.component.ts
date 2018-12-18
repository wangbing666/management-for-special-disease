import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { DialogEdit } from '../../../libs/dmodal/dialog.entity';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { CustomMenuService } from './_service/custom-menu.service';
import { CustomMenuTableService } from './_service/custom-menu-table.service';
import { CustomMenuFormService } from './_service/custom-menu-form.service';
import { ERRMSG } from '../../_store/static';
import { EditDialog } from '../../../libs/dmodal/dialog-edit.component';

@Component({
  selector: 'app-custom-menu',
  templateUrl: 'custom-menu.component.html'
})
export class CustomMenuComponent implements OnInit {
  containerConfig: ContainerConfig;
  customMenuTable: TableOption;
  customSubMenuTable: TableOption;
  subMenuTitle: string;
  menuId: number;

  constructor(
    private customMenuService: CustomMenuService,
    private customMenuTableService: CustomMenuTableService,
    private customMenuFormService: CustomMenuFormService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.customMenuService.customMenuConfig();
    this.customMenuTable = new TableOption({
      titles: this.customMenuTableService.setTitles(),
      ifPage: false
    });
    this.customSubMenuTable = new TableOption({
      titles: this.customMenuTableService.setSubTitles(),
      ifPage: false
    });
    this.getLocalMenus();
  }

  getLocalMenus() {
    this.hideSubMenu();
    this.customMenuTable.reset();
    this.customMenuService.getMenuLocal()
      .subscribe(
        res => {
          this.customMenuTable.loading = false;
          if (res.data && res.data.length === 0 && res.code === 0) {
            this.customMenuTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.code === 0) {
            this.customMenuTable.lists = res.data.button;
            this.formatMenu(this.customMenuTable.lists);
          } else {
            this.customMenuTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.customMenuTable.loading = false;
          console.log(err);
          this.customMenuTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  getRemoteMenus() {
    this.hideSubMenu();
    this.customMenuTable.reset();
    this.customMenuService.getMenuRemote()
      .subscribe(
        res => {
          this.customMenuTable.loading = false;
          if (res.data && res.data.length === 0 && res.code === 0) {
            this.customMenuTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.code === 0) {
            this.customMenuTable.lists = res.data.button;
            this.formatMenu(this.customMenuTable.lists);
          } else {
            this.customMenuTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.customMenuTable.loading = false;
          console.log(err);
          this.customMenuTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  gotoHandle(data) {
    if (data.key === 'subMenu' && data.value.sub_button) {
      this.menuId = data.value.id;
      this.subMenuTitle = `二级菜单列表 - ${data.value.name}`;
      this.customSubMenuTable.lists = data.value.sub_button;
    } else if (data.key === 'subMenu' && !data.value.sub_button) {
      this.menuId = data.value.id;
      this.subMenuTitle = `二级菜单列表 - ${data.value.name}`;
      this.customSubMenuTable.lists = [];
      this.customSubMenuTable.errorMessage = '该项没有子菜单哦～';
    } else if (data.key === 'edit') {
      this.edit(null, data.value);
    } else if (data.key === 'editSub') {
      this.edit(data.value.parentId, data.value);
    } else if (data.key === 'del') {
      HintDialog(`确定要删除菜单：${data.value.name}？`, this.dialog).afterClosed()
        .subscribe(result => {
          if (result && result.key === 'confirm') {
            this.menuDel(data.value.id);
          }
        })
    }
  }

  newMenu() {
    this.edit(null, null);
  }

  newSubMenu(id) {
    this.edit(id, null);
  }

  edit(parentId, data) {
    const config: DialogEdit = new DialogEdit({
      title: '新增／编辑菜单',
      form: this.customMenuFormService.setForm(parentId || null, data || null)
    });
    EditDialog(config, this.dialog).afterClosed().subscribe(result => {
      // console.log(result);
      if (result) {
        this.getValue(result);
      }
    })
  }

  // 提交保存信息
  getValue(data) {
    if (data.id) {
      this.customMenuService.menuUpdate(data)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog('修改菜单成功！', this.dialog);
            this.getLocalMenus();
          } else {
            HintDialog(res.msg || '修改菜单失败！', this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.netErrMsg, this.dialog);
        })
    } else {
      this.customMenuService.menuCreate(data)
        .subscribe(
          res => {
            if (res.code === 0) {
              HintDialog('新增菜单成功！', this.dialog);
              this.getLocalMenus();
            } else {
              HintDialog(res.msg || '新增菜单失败！', this.dialog);
            }
          }, err => {
            console.log(err);
            HintDialog(ERRMSG.netErrMsg, this.dialog);
          })
    }
  }

  hideSubMenu() {
    this.menuId = null;
    this.subMenuTitle = null;
    this.customSubMenuTable.lists = [];
  }

  menuDel(id) {
    this.customMenuService.menuDel(id)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('删除菜单成功！', this.dialog);
          this.getLocalMenus();
        } else {
          HintDialog(res.msg || '删除菜单失败！', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.netErrMsg, this.dialog);
      })
  }

  toPush() {
    HintDialog('确定要发布本地菜单到远程微信服务号？', this.dialog).afterClosed()
      .subscribe(result => {
        if (result && result.key === 'confirm') {
          this.pushToRemote();
        }
      })
  }

  pushToRemote() {
    this.customMenuService.menuPush()
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('发布到远程成功！', this.dialog);
        } else {
          HintDialog(res.msg || '发布到远程失败！', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.netErrMsg, this.dialog);
      })
  }

  formatMenu(data) {
    data.forEach(obj => {
      if (obj.sub_button) {
        obj.sub_button.forEach(subObj => {
          subObj.parentId = obj.id;
          subObj.parentName = obj.name;
        })
      }
    })
  }
}
