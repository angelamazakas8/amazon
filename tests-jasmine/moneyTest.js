import { formatCurrency } from "../scripts/utils/money.js";

describe('test suite: formatCurrency', () => {
    it('converts cents into dollars', () => {

        // except compares two values
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('works with zero', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    })

    it('rounding up', () => {
        expect(formatCurrency(2019.5)).toEqual('20.20');
    })

    it('rounding down', () => {
        expect(formatCurrency(2019.4)).toEqual('20.19');
    })
});
