async function compareValues(firstValue, secondValue, operator) {
    switch(operator) {
        case '=': {
            return firstValue === secondValue;
        }
        case '<': {
            return firstValue < secondValue;
        }
        case '>': {
            return firstValue > secondValue;
        }
        case '<=': {
            return firstValue <= secondValue;
        }
        case '>=': {
            return firstValue >= secondValue;
        }
        default: {
            return 'Unsupported operation';
        }
    }
}

module.exports = {
    compareValues
}