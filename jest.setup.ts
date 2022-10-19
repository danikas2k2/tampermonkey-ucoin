import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import 'jest-expect-message';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-namespace
import * as extended from 'jest-extended';
// eslint-disable-next-line import/no-namespace
import { toMatchOneOf, toMatchShapeOf } from 'jest-to-match-shape-of';
import './jest.setup@last';

expect.extend(extended);

expect.extend({
    toMatchOneOf,
    toMatchShapeOf,
});
