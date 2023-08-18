import {FilterParam, Op, OpType} from '../interfaces';

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

