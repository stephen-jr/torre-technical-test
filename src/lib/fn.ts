const ucfirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
const ucwords = (str: string) => str.split(' ').map(ucfirst).join(' ');

export { ucfirst, ucwords };