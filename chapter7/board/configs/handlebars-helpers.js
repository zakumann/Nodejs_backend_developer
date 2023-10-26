module.exports = {
    // convert Length of List
    lengthOfList: (list = []) => list.length,
    // compare two values check same or not.
    eq: (val1, val2) => val1 === val2,
    // ISO Date String convert to Date.
    dataString: (isoString) => new Date(isoString).toLocaleDateString(),
};