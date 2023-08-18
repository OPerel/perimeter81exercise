import {OpType, Op, FilterParam} from '../interfaces';

const mapOpToSql = (op: OpType): string => ({
  [Op.Equal]: '=',
  [Op.NotEqual]: '!=',
  [Op.LessThan]: '<',
  [Op.GreaterThan]: '>'
}[op])

const buildSqlFilterClause = (filter: FilterParam): string => {
  const {column, op, value} = filter;
  return `${column} ${mapOpToSql(op)} ${value}`;
}

export const buildSqlFilters = (filters: FilterParam[]): string => {
  if (filters.length === 0) {
    return '';
  }

  const filterArray = filters.map(buildSqlFilterClause);
  return ' WHERE ' + filterArray.join(' AND ');
}