export class ArticleModel {
  id: number;
  title: string;
  description: string;
  createdDate?: Date;
  createdBy?: number;
  topicId: number;
  view?: number;

  public constructor(init?: Partial<ArticleModel>) {
    Object.assign(this, init);
  }
}
