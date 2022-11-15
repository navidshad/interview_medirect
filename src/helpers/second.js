let callback = null;

setInterval(() => {
	if(typeof callback == 'function') {
		callback();
		callback = null;
	}
}, 1000);

export function executeAfterOneSec(task) {
	callback = task;
}