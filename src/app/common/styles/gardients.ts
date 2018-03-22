export class Gardients {
  static getGardient(from: string, to: string): string {
    return `linear-gradient(65deg,${from} 0,${to} 100%)`;
  }
  static getGardientText(from: string, to: string): object {
    return {
      background: this.getGardient(from, to),
      '-webkit-text-fill-color': 'transparent',
      '-webkit-background-clip': 'text'
    };
  }
}