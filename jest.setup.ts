import '@testing-library/jest-dom';

if (typeof globalThis.structuredClone === 'undefined') {
    globalThis.structuredClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));
}

const gmStorage: Record<string, unknown> = {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.GM_getValue = (key: string, defaultValue?: any) =>
    key in gmStorage ? gmStorage[key] : defaultValue;
global.GM_setValue = (key: string, value: unknown) => {
    gmStorage[key] = value;
};
import 'jest-expect-message';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import * as extended from 'jest-extended';

import { toMatchOneOf, toMatchShapeOf } from 'jest-to-match-shape-of';
import './jest.setup@last';

expect.extend(extended);

expect.extend({
    toMatchOneOf,
    toMatchShapeOf,
});
