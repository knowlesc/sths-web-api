export class FieldHelper {
  static totalResultsQuery = `SELECT count(*) as count`;

  static generateSelectQuery(
    commaSeparatedFields: string,
    allowedFields: string[],
    getFullColumnDescriptor: (field: string) => string) {

    const fieldsToSelect = commaSeparatedFields ?
      commaSeparatedFields.split(',') : allowedFields;

    const allowedFieldsToSelect = fieldsToSelect.filter(
      (field) => allowedFields.indexOf(field) >= 0);

    const parsedFields = allowedFieldsToSelect
      .map(getFullColumnDescriptor);

    return `SELECT ${parsedFields.join(',\n')}`;
  }
}
