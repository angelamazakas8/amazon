// using code to test code
import { formatCurrency } from "../scripts/utils/money.js";
console.log('test suite: formatCurrency')

if (formatCurrency(2095) === '20.95')
    {console.log('regular numbers: passed');}

else{
    console.log('failed');
}

if (formatCurrency(0) === '0.00')
    {console.log('zero: passed');}

else{
    console.log('failed');
}

// check for rounding up
if (formatCurrency(2000.5) === '20.01')
    {console.log('rounding up: passed');}

else{
    console.log('failed');
}

// check for rounding down
if (formatCurrency(2000.4) === '20.00')
    {console.log('rounding down: passed');}

else{
    console.log('failed');
}