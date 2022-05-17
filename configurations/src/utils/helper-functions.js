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

function validateOptionsObject(optionsObject) {
    if (typeof optionsObject !== 'object') {
        return false;
    }

    if (!optionsObject.hasOwnProperty('field') || !optionsObject.hasOwnProperty('operator') || !optionsObject.hasOwnProperty('value')) {
        return false;
    }

    return true;
}

module.exports = {
    compareValues,
    validateOptionsObject
}