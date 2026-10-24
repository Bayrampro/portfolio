const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

const source = ts.transpileModule(
  fs.readFileSync(path.join(__dirname, "../lib/observe-active-section.ts"), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } }
).outputText;

function section(id, top, bottom, highlights = "") {
  return { dataset: { kbSection: id, kbHighlights: highlights }, getBoundingClientRect: () => ({ top, bottom }) };
}

function setup(initialSections) {
  let sections = initialSections;
  const listeners = new Map();
  const frames = new Map();
  const observers = [];
  const changes = [];
  let nextFrame = 0;
  const window = {
    innerHeight: 800,
    addEventListener: (name, callback) => listeners.set(name, callback),
    removeEventListener: (name) => listeners.delete(name),
    requestAnimationFrame: (callback) => { frames.set(++nextFrame, callback); return nextFrame; },
    cancelAnimationFrame: (id) => frames.delete(id),
  };
  class Observer {
    constructor(callback) { this.callback = callback; observers.push(this); }
    observe() {}
    disconnect() { this.disconnected = true; }
  }
  const exports = {};
  vm.runInNewContext(source, {
    exports, window,
    document: { body: {}, querySelectorAll: () => sections },
    MutationObserver: Observer, ResizeObserver: Observer,
  });
  const stop = exports.observeActiveSection((value) => changes.push(value));
  const flush = () => { const pending = [...frames.values()]; frames.clear(); pending.forEach((callback) => callback()); };
  return { window, listeners, frames, observers, changes, stop, flush, replace: (value) => { sections = value; } };
}

test("scrolling selects Legion and Dolka instead of retaining project 04", () => {
  const env = setup([section("project4", 0, 800)]);
  env.flush();
  assert.equal(env.changes.at(-1).id, "project4");
  for (const id of ["project5", "project6"]) {
    env.replace([section("project4", -1600, -800), section(id, 0, 800, "flutter,dart,git")]);
    env.listeners.get("scroll")();
    env.flush();
    assert.equal(env.changes.at(-1).id, id);
    assert.equal(env.changes.at(-1).highlights.join(","), "flutter,dart,git");
  }
});

test("sections inserted or replaced after mount are tracked without reload", () => {
  const env = setup([section("project4", 0, 800)]);
  env.flush();
  env.replace([section("project5", 0, 800)]);
  env.observers[0].callback();
  env.flush();
  assert.equal(env.changes.at(-1).id, "project5");
  env.replace([section("project6", 0, 800, "flutter, dart, git")]);
  env.observers[0].callback();
  env.flush();
  assert.equal(env.changes.at(-1).id, "project6");
  assert.equal(env.changes.at(-1).highlights.join(","), "flutter,dart,git");
});

test("viewport centre wins across sections of unequal heights", () => {
  const env = setup([section("project5", -1600, 300), section("project6", 300, 1100)]);
  env.flush();
  assert.equal(env.changes.at(-1).id, "project6");
  env.window.innerHeight = 400;
  env.listeners.get("resize")();
  env.flush();
  assert.equal(env.changes.at(-1).id, "project5");
});

test("layout resize updates selection without scrolling", () => {
  const env = setup([section("project5", 0, 800), section("project6", 800, 1600)]);
  env.flush();
  env.replace([section("project5", -500, 300), section("project6", 300, 1100)]);
  env.observers[1].callback();
  env.flush();
  assert.equal(env.changes.at(-1).id, "project6");
});

test("scroll updates coalesce and cleanup removes pending work", () => {
  const env = setup([section("project5", 0, 800)]);
  env.listeners.get("scroll")();
  env.listeners.get("scroll")();
  assert.equal(env.frames.size, 1);
  env.stop();
  assert.equal(env.frames.size, 0);
  assert.equal(env.listeners.size, 0);
  assert.ok(env.observers.every((observer) => observer.disconnected));
});
