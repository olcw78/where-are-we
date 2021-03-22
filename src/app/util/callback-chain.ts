/**
 * Delete chain to detect the trigger and affect on the every callbacks.
 */
class CallbackChain {
  private readonly callbacks: Function[];

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
    this.callbacks.push(fn(...args));
    return this;
  }
  /**
   * Invoke all callback chain.
   * @params args additional arguments.
   * @returns function chaining.
   */
  invoke(...args: any[]): CallbackChain {
    this.callbacks.forEach((fn: Function) => fn(...args));
    return this;
  }
}

export default CallbackChain;
