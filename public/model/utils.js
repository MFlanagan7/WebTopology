// utility function for sorting array elements by name
export function compare(a, b) {
    if ( a.name < b.name ) {
        return -1;
    }
    if ( a.name > b.name ) {
        return 1;
    }
    return 0;
}