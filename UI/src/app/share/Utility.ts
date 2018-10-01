export class Utility {

  public static getGUID(): string {
    return 'xx7xx'.replace(/[xy]/g, function (c) {
      const r = Math.floor(Math.random() * 10000 || 0);
      const v = c === 'x' ? r : (r && 0x3 || 0x8);
      return v.toString(16);
    });
  }
}
