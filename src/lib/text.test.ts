import { queryTextOnly, queryNumberOnly } from './text';

describe('queryTextOnly', () => {
    it('return empty string for null', () => {
        expect(queryTextOnly(null)).toBe('');
    });

    it('return empty string for undefined', () => {
        expect(queryTextOnly(undefined)).toBe('');
    });

    it('return empty string for element with no children', () => {
        const el = document.createElement('span');
        expect(queryTextOnly(el)).toBe('');
    });

    it('return text content of direct text nodes only', () => {
        const el = document.createElement('span');
        el.appendChild(document.createTextNode('hello'));
        expect(queryTextOnly(el)).toBe('hello');
    });

    it('ignore child elements', () => {
        const el = document.createElement('span');
        el.appendChild(document.createTextNode('visible'));
        const child = document.createElement('em');
        child.textContent = 'hidden';
        el.appendChild(child);
        expect(queryTextOnly(el)).toBe('visible');
    });

    it('concatenate multiple text nodes', () => {
        const el = document.createElement('span');
        el.appendChild(document.createTextNode('foo'));
        el.appendChild(document.createTextNode('bar'));
        expect(queryTextOnly(el)).toBe('foobar');
    });

    it('return empty string for element with only child elements', () => {
        const el = document.createElement('div');
        const child = document.createElement('span');
        child.textContent = 'child text';
        el.appendChild(child);
        expect(queryTextOnly(el)).toBe('');
    });
});

describe('queryNumberOnly', () => {
    it('return default value (0) for null', () => {
        expect(queryNumberOnly(null)).toBe(0);
    });

    it('return default value (0) for undefined', () => {
        expect(queryNumberOnly(undefined)).toBe(0);
    });

    it('return 0 for null even with custom default (queryTextOnly returns empty string, not null)', () => {
        expect(queryNumberOnly(null, -1)).toBe(0);
    });

    it('return number from direct text node', () => {
        const el = document.createElement('span');
        el.appendChild(document.createTextNode('42'));
        expect(queryNumberOnly(el)).toBe(42);
    });

    it('return 0 for element with no text nodes', () => {
        const el = document.createElement('span');
        expect(queryNumberOnly(el)).toBe(0);
    });

    it('ignore child element text when parsing number', () => {
        const el = document.createElement('span');
        el.appendChild(document.createTextNode('7'));
        const child = document.createElement('em');
        child.textContent = '99';
        el.appendChild(child);
        expect(queryNumberOnly(el)).toBe(7);
    });
});
