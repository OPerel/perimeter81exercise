import {OpType, Op, FilterParam, OrderParam} from '../interfaces';

// column names will have to be validates for different pets
// SQL injection

const mapOpToSql = (op: OpType): string => ({
  [Op.Equal]: '=',
  [Op.NotEqual]: '!=',
  [Op.LessThan]: '<',
  [Op.GreaterThan]: '>'
}[op])

const buildSqlFilterClause = (filter: FilterParam): string => {
  const {column, op, value} = filter;
  return `${column} ${mapOpToSql(op)} '${value}'`;
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

export const buildSqlQuery = (type: string, filterParams: FilterParam[], orderParam: OrderParam | null): string => {
  return `select * from ${type}${buildSqlFilters(filterParams)}${buildSqlOrderClause(orderParam)};`
}

export const createColumnsByPet = (type: string) => {
  // columns list should be enforced for each type
  switch (type) {
    case 'birds': {
      return ['can_fly'];
    }
    default: {
      return ['color']
    }
  }
}