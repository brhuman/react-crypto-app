export function percentDifference(a, b) {
	return +(100 * Math.abs((a - b) / ((a + b) / 2)).toFixed(4))
}

export function capitalazeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}