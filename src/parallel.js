export class Parallel {
  constructor(threadsLimit = Infinity) {
    this.threadsLimit = threadsLimit;
    this.jobs = [];
  }
  job(fn) {
    this.jobs.push(fn);
    return this;
  }
  done(cb) {
    const { jobs, threadsLimit } = this;
    const results = new Array(jobs.length);
    let completed = 0;
    let running = 0;
    let jobIndex = 0;

    if (jobs.length === 0) {
      return Promise.resolve().then(() => cb([]));
    }

    return new Promise((resolve) => {
      const runNext = () => {
        while (running < threadsLimit && jobIndex < jobs.length) {
          const currentIndex = jobIndex++;
          const currentJob = jobs[currentIndex];
          running++;

          currentJob((result) => {
            results[currentIndex] = result;
            running--;
            completed++;

            if (completed === jobs.length) {
              cb(results);
              resolve(results);
            } else {
              runNext();
            }
          });
        }
      };
      runNext();
    });
  }
}
