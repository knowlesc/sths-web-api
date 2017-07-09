export class ParamHelper {
  static parseNumberParam(param: number) {
    if (isNaN(param) || param !== 0 && !param) {
      return -1;
    }

    return parseInt(param.toString());
  }
}
