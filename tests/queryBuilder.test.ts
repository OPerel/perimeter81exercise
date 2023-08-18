import {buildSqlFilters} from '../src/dataAccess/queryBuilder';
import {FilterParam} from '../src/interfaces';

describe('Query builder', () => {
  test('no filters', () => {
    expect(buildSqlFilters([])).toEqual('')
  });

  test('single filter', () => {
    const filter = {
      column: 'name',
      op: 'eq',
      value: 'tom',
    } as FilterParam
    expect(buildSqlFilters([filter])).toEqual(' WHERE name = tom');
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
  });
})