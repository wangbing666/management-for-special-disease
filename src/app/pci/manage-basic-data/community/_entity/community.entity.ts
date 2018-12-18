export class Community {
  id: number;
  latitude: number;
  longitude: number;
  communityAddress: string;
  communityName: string;


  constructor(obj?: Community) {
    this.id = obj && obj.id || 0;
    this.latitude = obj && obj.latitude || 0;
    this.longitude = obj && obj.longitude || 0;
    this.communityAddress = obj && obj.communityAddress || '';
    this.communityName = obj && obj.communityName || '';
  }
}
