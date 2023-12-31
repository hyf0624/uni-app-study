export default function(fn, time) {
	let timeout = null
	return function() {
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			fn.apply(this, arguments)
		}, time)
	}
}