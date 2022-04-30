salesObj = require('./sales');
periodsObj = require('./periods');

// Loop over sales
let sales = [];
for (let i = 0; i < salesObj.length; i++) {
    const record = {
        product_id: salesObj[i].product.id,
        product_name: salesObj[i].product.name,
        period_id: salesObj[i].period.id,
        units: salesObj[i].units
    };
    sales.push(record);
}

// Sort Sales (SAVE)
// sales = sales.sort((a, b) => (a.period_id > b.period_id ? 1 : -1));

// Soft the sales array. Group products and then order periods
sales.sort(function (a, b) {
    // Sort by product
    if (a.product_id === b.product_id) {
        // Sort by period
        return a.period_id - b.period_id;
    }
    return a.product_id > b.product_id ? 1 : -1;
});

//console.log(sales);

let priorProduct = 0;
let tempProductRecord = [];
let grid = [];

// Loop over the sorted sales array
for (let i = 0; i < sales.length; i++) {
    // With current record and set current values
    const currRecord = sales[i];
    const currProduct = currRecord.product_id;
    const currPeriod = currRecord.period_id;
    const currUnits = currRecord.units;

    // If in a new product, create a new product record
    if (priorProduct === 0) {
        // Start a new record with a product name
        tempProductRecord = [currRecord.product_name];

        // Set the priorProduct to the current Product value
        priorProduct = currProduct;
    }
    if (currProduct > priorProduct) {
        // Flush out the current record to the grid
        grid.push(tempProductRecord);

        // Start a new record with a product name
        tempProductRecord = [currRecord.product_name];

        // Set the priorProduct to the current Product value
        priorProduct = currProduct;
    }
    if (i + 1 === sales.length) {
        // Flush out the current record to the grid
        grid.push(tempProductRecord);
    }

    // Push Period_id on to tempProductRecord
    tempProductRecord.push({ period_id: currPeriod, units: currUnits });
}

console.log(grid);

// // Loop over

// console.log(grid);

// // Grid.js record set and
// recordSet = [];
// outputRecord = [];

// // Loop over grid array
// for (let i = 0; i < grid.length; i++) {

//     let productRecord = grid[i];
//     outputRecord.push(productRecord[0]);
//     // Loop over each record starting in the second position
//     for (let j = 1; j < productRecord.length; j++) {
//         currPeriod = productRecord[j].period_id;

//         // Loop over periods
//         for (let k = 0; k < periodsObj.length; k++) {
//             if (periodsObj[k].id === currPeriod) {
//                 outputRecord.push(productRecord[j].units);
//             } else {
//                 outputRecord.push(null);
//             }
//         }
//     }
// }

//console.log(outputRecord);
