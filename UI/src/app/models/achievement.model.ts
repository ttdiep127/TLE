export class RatingModel {
  userId: number;
  topicId: number;
  percentage: number;
  correctNumber: number;
  totalAnswers: number;
  updateDay: Date;
  id: number;
  topicName: string;
  guidId: string;

  public constructor(init?: Partial<RatingModel>) {
    Object.assign(this, init);
  }
}

export class TopicRatingModel {
  topicId: number;
  topicName: string;
  ratings: RatingModel[];
}
