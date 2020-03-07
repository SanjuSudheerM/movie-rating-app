import { ArrayListPipe } from './array-list.pipe';

describe('ArrayListPipe', () => {
  it('create an instance', () => {
    const pipe = new ArrayListPipe();
    expect(pipe).toBeTruthy();
  });
  it('should construct comma separates string', () => {
    const pipe = new ArrayListPipe();
    const category = ['action', 'drama'];
    expect(pipe.transform(category)).toEqual('action, drama');
  });

  it('should return empty string if array is undefined', () => {
    const pipe = new ArrayListPipe();
    const category = undefined;
    expect(pipe.transform(category)).toEqual('');
  });

  it('should not return string with comma at the end', () => {
    const pipe = new ArrayListPipe();
    const category = ['action'];
    expect(pipe.transform(category).split(',').length).toEqual(1);
  });
});
