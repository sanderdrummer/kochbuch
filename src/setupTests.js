// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

const Dexie = require("dexie");
Dexie.dependencies.indexedDB = require("fake-indexeddb");
Dexie.dependencies.IDBKeyRange = require("fake-indexeddb/lib/FDBKeyRange");

jest.mock("tesseract.js");
