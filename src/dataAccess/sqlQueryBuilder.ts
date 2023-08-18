import {OpType, Op, FilterParam, OrderParam} from '../interfaces';

// column names will have to be validates for different pets

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

export const buildSqlOrderClause = (orderParam: OrderParam | null): string => {
  if (orderParam === null) {
    return ''
  }

  const {column, order} = orderParam;

  return ` ORDER BY ${column} ${order}`;
}

export const buildSqlQuery = (filterParams: FilterParam[], orderParam: OrderParam | null): string => {
  return `select * from dogs${buildSqlFilters(filterParams)}${buildSqlOrderClause(orderParam)};`
}