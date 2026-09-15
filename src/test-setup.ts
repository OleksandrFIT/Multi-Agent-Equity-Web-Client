import '@testing-library/jest-dom'

// jsdom has no ResizeObserver; chart wrappers use it to keep width in sync.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
;(globalThis as unknown as { ResizeObserver: typeof ResizeObserverStub }).ResizeObserver = ResizeObserverStub
