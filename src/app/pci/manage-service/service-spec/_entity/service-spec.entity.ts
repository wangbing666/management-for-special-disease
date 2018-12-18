/**
 * Created by zhanglin on 2017/7/25.
 */
export class ServiceSpec {
  id: number;
  name: string;
  specificationIdx: number;
  price: string;
  count: string;
  serviceId: number;
  serviceName: string;
  operator: string;
  enable: boolean;
  constructor( obj ?: ServiceSpec) {
    this.id = obj && obj.id || 0;
    this.name = obj && obj.name || '';
    this.specificationIdx = obj && obj.specificationIdx || 0;
    this.price = obj && obj.price || '';
    this.count = obj && obj.count || '';
    this.serviceId = obj && obj.serviceId || 1;
    this.serviceName = obj && obj.serviceName || '';
    this.operator = obj && obj.operator || '';
    this.enable = obj && obj.enable || null;
  }
}
