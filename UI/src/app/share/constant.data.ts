import {TestTypes} from './enums';
import {ListItem} from '../models/list-item.model';

export const TESTTYPES: ListItem<TestTypes>[] = [
  {text: 'Full Test', value: TestTypes.FullTest},
  {text: 'Short Test', value: TestTypes.ShortTest},
  {text: 'Part 5', value: TestTypes.Part5},
  {text: 'Part 6', value: TestTypes.Part6},
  {text: 'Part 7', value: TestTypes.Part7}];
export const TOIECPARTS: ListItem<number>[] = [
  {text: 'Part 1', value: 1},
  {text: 'Part 2', value: 2},
  {text: 'Part 3', value: 3},
  {text: 'Part 4', value: 4},
  {text: 'Part 5', value: 5},
  {text: 'Part 6', value: 6},
  {text: 'Part 7', value: 7}];
