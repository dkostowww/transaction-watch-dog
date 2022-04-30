/**
 * A custom task emitter class
 * which can trigger
 * a callback function on a 
 * specified time interval
 * and clear it if required
 */

class TaskEmitter {
    taskId;
    taskCleared = 0;

    async scheduleTask(timeInterval, callback) {
        try {
            await callback();
        } catch (error) {
            console.error(error);
        }

        if (!this.taskCleared) {
            this.taskId = setTimeout(() => {
                this.scheduleTask(timeInterval, callback)
            }, timeInterval)
        }
    }

    async rescheduleTask(timeInterval, callback) {
        this.taskCleared = 0;
        this.scheduleTask(timeInterval, callback);
    }

    clearTask() {
        this.taskCleared = 1;
        clearTimeout(this.taskId);
    }
}

module.exports = TaskEmitter;