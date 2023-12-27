import { getTemp } from '../lib/utils';

describe('getTemp', () => {
	it('Given 10, get 10', () => {
		expect(getTemp(10)).toEqual(10);
	});
	it('Given 10.1, get 10.1', () => {
		expect(getTemp(10.1)).toEqual(10.1);
	});
	it('Given 10.11, get 10.1', () => {
		expect(getTemp(10.11)).toEqual(10.1);
	});
	it('Given 10.15, get 10.2', () => {
		expect(getTemp(10.15)).toEqual(10.2);
	});
	it('Given 10.19, get 10.2', () => {
		expect(getTemp(10.19)).toEqual(10.2);
	});
});
