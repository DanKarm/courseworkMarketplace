const STORAGE = window.localStorage;

export class Storage {
  constructor(key) {
    this.key = key;
  }
  load() {
    const raw = STORAGE.getItem(this.key);

    return JSON.parse(raw);
  }
  save(cities) {
    STORAGE.setItem(this.key, JSON.stringify(cities));
  }
}
