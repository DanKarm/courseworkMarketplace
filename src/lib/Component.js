export class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};
    this.element = null;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.rerender();
  }

  render() {
    throw new Error("Not implemented");
  }

  rerender() {
    const newEl = this.render();
    this.element.replaceWith(newEl);
    this.element = newEl;
  }

  mount() {
    this.element = this.render();

    return this.element;
  }
}
