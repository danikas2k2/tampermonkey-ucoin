import '@testing-library/jest-dom';
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
