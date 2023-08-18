import {FilterParam, Op, OpType, OrderParam} from '../interfaces';
import {Sort} from 'mongodb';

const mapOpToMongo = (op: OpType): string => ({
  [Op.Equal]: '$eq',
  [Op.NotEqual]: '$ne',
  [Op.LessThan]: '$lt',
  [Op.GreaterThan]: '$gt'
}[op]);


const buildMongoFilterClause = (filter: FilterParam) => {
  const {column, op, value} = filter;
  return {[column]: {[mapOpToMongo(op)]: `${value}`}};
}

export const buildMongoFilters = (filters: FilterParam[]) => {
  if (filters.length === 0) {
    return {};
  }

  return filters.reduce((allFilters, currentFilter) => {
    return {...allFilters, ...buildMongoFilterClause(currentFilter)}
  }, {})
}

const mongoOrderBy = (order: 'ASC' | 'DESC'): 1 | -1 => {
  return order === 'ASC' ? 1 : -1;
}

export const buildMongoOrderClause = (orderParam: OrderParam): Sort => {
  const {column, order} = orderParam

  return {[column]: mongoOrderBy(order)}
}

