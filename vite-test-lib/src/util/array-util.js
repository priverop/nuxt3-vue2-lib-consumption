export const fieldSorter = (fields) => {
    return (a, b) => fields.map(field => {
        let dir = 1;
        if (field[0] === '-') {
            dir = -1;
            field = field.substring(1);
        }

        const result = !a[field] || a[field] > b[field] ? dir : (!b[field] || a[field] < b[field]) ? -(dir) : 0;
        // console.log('sort: a=[' + a[field] + '], b=[' + b[field] + '], result=[' + result + ']');
        return result;
        // return a[field] > b[field] ? dir : a[field] < b[field] ? -(dir) : 0;
    }).reduce((p, n) => p ? p : n, 0);
}
