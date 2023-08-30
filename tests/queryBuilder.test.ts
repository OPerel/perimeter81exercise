import {buildSqlFilters, buildSqlOrderClause, buildSqlQuery} from '../src/dataAccess/sqlQueryBuilder';
import {FilterParam, OrderParam} from '../src/interfaces';
import {buildMongoFilters, buildMongoOrderClause} from '../src/dataAccess/mongoQuerybuilder';

describe('Query builder', () => {
  test('no filters', () => {
    expect(buildSqlFilters([])).toEqual('');
    expect(buildMongoFilters([])).toEqual({});
  });

  test('single filter', () => {
    const filter = {
      column: 'name',
      op: 'eq',
      value: 'tom',
    } as FilterParam

    expect(buildSqlFilters([filter])).toEqual(' WHERE name = tom');
    expect(buildMongoFilters([filter])).toEqual({name: {$eq: 'tom'}});
  });

  test('two filters', () => {
    const filters = [
      {
        column: 'name',
        op: 'eq',
        value: 'tom',
      },
      {
        column: 'age',
        op: 'gt',
        value: '3',
      }
    ];

    expect(buildSqlFilters(filters as FilterParam[])).toEqual(' WHERE name = tom AND age > 3');
    expect(buildMongoFilters(filters as FilterParam[])).toEqual({name: {$eq: 'tom'}, age: {$gt: '3'}});
  });

  test('order clause', () => {
    const order = {
      column: 'age',
      order: 'ASC'
    };

    expect(buildSqlOrderClause(order as OrderParam)).toEqual(' ORDER BY age ASC');
    expect(buildMongoOrderClause(order as OrderParam)).toEqual({age: 1});
  });

  test('query with filter and order', () => {
    const order = {
      column: 'age',
      order: 'ASC'
    };

    const filters = [{
      column: 'name',
      op: 'eq',
      value: 'tom',
    }]

    expect(buildSqlQuery(filters as FilterParam[], order as OrderParam))
      .toEqual('select * from pets WHERE name = tom ORDER BY age ASC;');
  });

  test('query with two filters and order', () => {
    const order = {
      column: 'age',
      order: 'ASC'
    };

    const filters = [
      {
        column: 'name',
        op: 'eq',
        value: 'tom',
      }, {
        column: 'age',
        op: 'gt',
        value: '3',
      }
    ]

    expect(buildSqlQuery(filters as FilterParam[], order as OrderParam))
      .toEqual('select * from pets WHERE name = tom AND age > 3 ORDER BY age ASC;');
  });
})