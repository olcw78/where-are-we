export class CallbackChain {
  _callbacks = [];

  register(fn) {
    if (typeof fn === "function") {
      this._callbacks.push(fn);
    }
    return this;
  }

  unregister() {
    this._callbacks.forEach(fn => (fn = null));
    return this;
  }

  invoke() {
    this._callbacks.forEach(fn => fn());
    return this;
  }
}
