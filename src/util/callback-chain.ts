class CallbackChain {
  _callbacks: Function[] = [];

  register(fn: Function) {
    this._callbacks.push(fn);
    return this;
  }

  invoke() {
    this._callbacks.forEach((fn: Function) => fn());
    return this;
  }
}

export default CallbackChain;
