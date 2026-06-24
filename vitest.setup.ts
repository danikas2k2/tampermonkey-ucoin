import '@testing-library/jest-dom/vitest';
import * as extended from 'jest-extended';
import { toMatchOneOf, toMatchShapeOf } from 'jest-to-match-shape-of';

const gmStorage: Record<string, unknown> = {};
const g = globalThis as Record<string, unknown>;
g.GM_getValue = (key: string, defaultValue?: unknown) =>
    key in gmStorage ? gmStorage[key] : defaultValue;
g.GM_setValue = (key: string, value: unknown) => {
    gmStorage[key] = value;
};

expect.extend(extended);
expect.extend({ toMatchOneOf, toMatchShapeOf });
