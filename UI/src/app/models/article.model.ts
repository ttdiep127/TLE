export class ArticleModel {
  id: number;
  title: string;
  description: string;
  createdDate?: Date;
  createdBy?: number;
  topicId: number;
  views?: number;

  public constructor(init?: Partial<ArticleModel>) {
    Object.assign(this, init);
  }
}
