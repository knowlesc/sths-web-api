export class SortHelper {
  static validateAndConvertSort(field: string, allowedSortFields: string[]): { field: string, descending: boolean } {
    if (!field) {
      return { field: null, descending: false };
    }

    let trimmedField = field;
    let descending = false;
    if (field[0] === '-') {
      trimmedField = field.substring(1);
      descending = true;
    }

    if (allowedSortFields.indexOf(trimmedField) < 0) {
      return { field: null, descending: false };
    }

    return { field: trimmedField, descending: descending };
  }
}
