export class RatingModel {
  userId: number;
  topicId: number;
  percentage: number;
  updateDay: Date;
  id: number;

  public constructor(init?: Partial<RatingModel>) {
    Object.assign(this, init);
  }
}
