export class HealthNews {
  id: number;
  articleTypeId: number;
  author: string;
  type: number;
  richText: string;
  online: boolean;
  imageUrl: string;
  title: string;
  content: string;
  link: string;
  ranking: string;
  typeList: any;

  constructor(typeList, obj?: HealthNews) {
    this.id = obj && obj.id || 0;
    this.articleTypeId = obj && obj.articleTypeId || null;
    this.author = obj && obj.author || '';
    this.type = obj && obj.type || null;
    this.richText = obj && obj.richText || '';
    this.online = obj && obj.online || false;
    this.imageUrl = obj && obj.imageUrl || '';
    this.title = obj && obj.title || '';
    this.content = obj && obj.content || '';
    this.link = obj && obj.link || '';
    this.ranking = obj && obj.ranking || '';
    this.typeList = typeList;
  }
}
