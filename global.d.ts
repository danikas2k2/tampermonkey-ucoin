import '@testing-library/jest-dom';
import 'jest-expect-message';
import 'jest-extended';
import 'jest-to-match-shape-of';

declare global {
    interface HTMLFormControlsCollection {
        [name: string]: HTMLInputElement | RadioNodeList | undefined;
    }
}
