export class Rating {
  userId: number;
  topicId: number;
  precentage: number;
  updateDaty: Date;
  id: number;

  public constructor(init?: Partial<Rating>) {
    Object.assign(this, init);
  }
}
