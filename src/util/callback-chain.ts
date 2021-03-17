/**
 * Delete chain to detect the trigger and affect on the every callbacks.
 */
class CallbackChain {
  private callbacks: Function[];

  constructor() {
    this.callbacks = []; // init with empty array.
  }

  /**
   * Register the callback function.
   * @param fn callback function.
   * @param args additional arguments.
   * @returns function chaining.
   */
  register(fn: Function, ...args: any[]): CallbackChain {
    this.callbacks.push((...args: any[]) => fn(...args));
    return this;
  }
  /**
   * Invoke all callback chain.
   * @returns function chaining.
   */
  invoke() {
    this.callbacks.forEach((fn: Function) => fn());
    return this;
  }
}

export default CallbackChain;
