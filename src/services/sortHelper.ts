export class SortHelper {
  static validateAndConvertSort(
    field: string,
    allowedFields: string[],
    getFullColumnName?: (field: string) => string): { field: string, descending: boolean } {

    if (!field) {
      return { field: null, descending: false };
    }

    let trimmedField = field;
    let descending = false;
    if (field[0] === '-') {
      trimmedField = field.substring(1);
      descending = true;
    }

    if (allowedFields.indexOf(trimmedField) < 0) {
      return { field: null, descending: false };
    } else if (getFullColumnName) {
      return { field: getFullColumnName(trimmedField), descending: descending };
    } else {
      return { field: trimmedField, descending: descending };
    }
  }
}
