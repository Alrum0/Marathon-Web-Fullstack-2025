class Timer {
    constructor(title, delay, stopCount) {
        this.title = title;
        this.delay = delay;
        this.stopCount = stopCount;
        this.timer = null;
    }

    start() {
        console.log(`Timer ${this.title} started (delay=${this.delay}, stopCount=${this.stopCount})`);
        this.timer = setInterval(() => this.tick(), this.delay);
    }
    tick() {
        if (this.stopCount === 0) {
            return this.stop();
            return;
        }
        console.log(`Timer ${this.title} Tick! | cycles left ${--this.stopCount}`);
    }
    stop() {
        clearInterval(this.timer);
        console.log(`Timer ${this.title} stopped`);
    }
    
}
function runTimer(title, delay, stopCount) {
    const time = new Timer(title, delay, stopCount);
    time.start();
}
