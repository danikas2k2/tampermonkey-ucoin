import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import {
    cancel,
    dataHrefClickHandler,
    disable,
    documentFragment,
    enable,
    formSubmitHandler,
    handleLinkClick,
    hide,
    linkClickHandler,
    reload,
    scrollIntoView,
    show,
    slug,
    sp,
    todayMonth,
    toggle,
    tt,
    unique,
    updateOptionalElement,
    updateRequiredElement,
    wrapDataHrefClicks,
    wrapFormSubmit,
} from './utils';

describe('sp', () => {
    it('return empty string for empty string', () => {
        expect(sp('')).toEqual('');
    });

    it('return trimmed string', () => {
        expect(sp(' a ')).toEqual('a');
    });

    it('return trimmed string with single spaces between words', () => {
        expect(sp('  a    b    c  ')).toEqual('a b c');
    });

    it('return trimmed string with single spaces between words replacing all unicode spaces', () => {
        render(
            <div role="button">
                &ensp; a &nbsp; b &#xA0; &#x2000; &#x2001; c &#x2002; &#x200A; &thinsp; d &emsp; e
                &#x2007;
            </div>
        );
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expect(sp(screen.getByRole('button').textContent!)).toEqual('a b c d e');
    });
});

describe('tt', () => {
    it('return empty string for empty string', () => {
        expect(tt('')).toEqual('');
    });

    it('return capitalised word', () => {
        expect(tt('some')).toEqual('Some');
    });

    it('return capitalised first word', () => {
        expect(tt('some words')).toEqual('Some words');
    });

    it('return capitalised first word going after spaces', () => {
        expect(tt('  some words  ')).toEqual('  Some words  ');
    });
});

describe('show', () => {
    it('remove "hide" class from specified element', () => {
        render(
            <div role="button" className="hide">
                <div className="a hide" />
                <div className="b" />
                <div>
                    <div className="a hide" />
                    <div className="c hide" />
                </div>
            </div>
        );

        const button = screen.getByRole('button');
        show(button);
        expect(button).not.toHaveClass('hide');
        expect(button.firstChild).toHaveClass('hide');
    });

    it('remove "hide" class from all specified elements', () => {
        render(
            <div role="button" className="hide">
                <div className="a hide" />
                <div className="b" />
                <div>
                    <div className="a hide" />
                    <div className="c hide" />
                </div>
            </div>
        );

        const button = screen.getByRole('button');
        show(button, ...button.querySelectorAll<HTMLElement>('.a'));
        expect(button).not.toHaveClass('hide');

        for (const child of button.children) {
            expect(child).not.toHaveClass('hide');
        }

        const inner = button.lastChild;
        expect(inner?.firstChild).not.toHaveClass('hide');
        expect(inner?.lastChild).toHaveClass('hide');
    });
});

describe('hide', () => {
    it('add "hide" class from specified element', () => {
        render(
            <div role="button">
                <div className="a" />
                <div className="b" />
                <div>
                    <div className="a" />
                    <div className="c" />
                </div>
            </div>
        );

        const button = screen.getByRole('button');
        hide(button);
        expect(button).toHaveClass('hide');
        expect(button.firstChild).not.toHaveClass('hide');
    });

    it('add "hide" class from all specified elements', () => {
        render(
            <div role="button">
                <div className="a" />
                <div className="b" />
                <div>
                    <div className="a" />
                    <div className="c" />
                </div>
            </div>
        );

        const button = screen.getByRole('button');
        hide(button, ...button.querySelectorAll<HTMLElement>('.a'));
        expect(button).toHaveClass('hide');
        expect(button.firstChild).toHaveClass('hide');

        const inner = button.lastChild;
        expect(inner).not.toHaveClass('hide');
        expect(inner?.firstChild).toHaveClass('hide');
        expect(inner?.lastChild).not.toHaveClass('hide');
    });
});

describe('toggle', () => {
    it('remove "hide" class from specified element', () => {
        render(
            <div role="button" className="hide">
                <div className="a hide" />
                <div className="b" />
                <div>
                    <div className="a hide" />
                    <div className="c hide" />
                </div>
            </div>
        );

        const button = screen.getByRole('button');
        toggle(true, button);
        expect(button).not.toHaveClass('hide');
        expect(button.firstChild).toHaveClass('hide');
    });

    it('remove "hide" class from all specified elements', () => {
        render(
            <div role="button" className="hide">
                <div className="a hide" />
                <div className="b" />
                <div>
                    <div className="a hide" />
                    <div className="c hide" />
                </div>
            </div>
        );

        const button = screen.getByRole('button');
        toggle(true, button, ...button.querySelectorAll<HTMLElement>('.a'));
        expect(button).not.toHaveClass('hide');

        for (const child of button.children) {
            expect(child).not.toHaveClass('hide');
        }

        const inner = button.lastChild;
        expect(inner?.firstChild).not.toHaveClass('hide');
        expect(inner?.lastChild).toHaveClass('hide');
    });

    it('add "hide" class from specified element', () => {
        render(
            <div role="button">
                <div className="a" />
                <div className="b" />
                <div>
                    <div className="a" />
                    <div className="c" />
                </div>
            </div>
        );

        const button = screen.getByRole('button');
        toggle(false, button);
        expect(button).toHaveClass('hide');
        expect(button.firstChild).not.toHaveClass('hide');
    });

    it('add "hide" class from all specified elements', () => {
        render(
            <div role="button">
                <div className="a" />
                <div className="b" />
                <div>
                    <div className="a" />
                    <div className="c" />
                </div>
            </div>
        );

        const button = screen.getByRole('button');
        toggle(false, button, ...button.querySelectorAll<HTMLElement>('.a'));
        expect(button).toHaveClass('hide');
        expect(button.firstChild).toHaveClass('hide');

        const inner = button.lastChild;
        expect(inner).not.toHaveClass('hide');
        expect(inner?.firstChild).toHaveClass('hide');
        expect(inner?.lastChild).not.toHaveClass('hide');
    });
});

describe('enable', () => {
    it('remove "disable" class from specified element', () => {
        render(
            <div role="button" className="disable">
                <div className="a disable" />
                <div className="b" />
                <div>
                    <div className="a disable" />
                    <div className="c disable" />
                </div>
            </div>
        );

        const button = screen.getByRole('button');
        enable(button);
        expect(button).not.toHaveClass('disable');
        expect(button.firstChild).toHaveClass('disable');
    });

    it('remove "disable" class from all specified elements', () => {
        render(
            <div role="button" className="disable">
                <div className="a disable" />
                <div className="b" />
                <div>
                    <div className="a disable" />
                    <div className="c disable" />
                </div>
            </div>
        );

        const button = screen.getByRole('button');
        enable(button, ...button.querySelectorAll<HTMLElement>('.a'));
        expect(button).not.toHaveClass('disable');

        for (const child of button.children) {
            expect(child).not.toHaveClass('disable');
        }

        const inner = button.lastChild;
        expect(inner?.firstChild).not.toHaveClass('disable');
        expect(inner?.lastChild).toHaveClass('disable');
    });
});

describe('disable', () => {
    it('add "disable" class from specified element', () => {
        render(
            <div role="button">
                <div className="a" />
                <div className="b" />
                <div>
                    <div className="a" />
                    <div className="c" />
                </div>
            </div>
        );

        const button = screen.getByRole('button');
        disable(button);
        expect(button).toHaveClass('disable');
        expect(button.firstChild).not.toHaveClass('disable');
    });

    it('add "disable" class from all specified elements', () => {
        render(
            <div role="button">
                <div className="a" />
                <div className="b" />
                <div>
                    <div className="a" />
                    <div className="c" />
                </div>
            </div>
        );

        const button = screen.getByRole('button');
        disable(button, ...button.querySelectorAll<HTMLElement>('.a'));
        expect(button).toHaveClass('disable');
        expect(button.firstChild).toHaveClass('disable');

        const inner = button.lastChild;
        expect(inner).not.toHaveClass('disable');
        expect(inner?.firstChild).toHaveClass('disable');
        expect(inner?.lastChild).not.toHaveClass('disable');
    });
});

describe('cancel', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('prevent event default and stop propagation', () => {
        const event = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
        } as unknown as Event;
        cancel(event);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();
    });
});

describe('reload', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('reload current page and return null', () => {
        jest.spyOn(window, 'location', 'get').mockReturnValue({
            reload: jest.fn(),
        } as unknown as Location);
        expect(reload()).toBeNull();
        expect(location.reload).toHaveBeenCalled();
    });
});

describe('documentFragment', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('create document fragment from source', () => {
        const fragment = documentFragment('<div id="test" role="article">Content</div>');
        expect(fragment).toEqual(expect.any(DocumentFragment));

        const element = fragment.querySelector<HTMLDivElement>('#test');
        expect(element).toEqual(expect.any(HTMLDivElement));
        expect(element?.getAttribute('role')).toEqual('article');
        expect(element?.textContent).toEqual('Content');
    });
});

describe('dataHrefClickHandler', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('handle click on [data-href] element', () => {
        const element = {
            href: '',
            dispatchEvent: jest.fn(),
        } as unknown as HTMLAnchorElement;

        jest.spyOn(document, 'createElement').mockReturnValueOnce(element);

        const event = {
            type: 'click',
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
            target: {
                dataset: {
                    href: '/test',
                },
            },
        } as unknown as Event;

        dataHrefClickHandler(event);

        expect(event.preventDefault).toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();

        expect(document.createElement).toHaveBeenCalledTimes(1).toHaveBeenCalledWith('a');

        expect(element.href).toEqual('/test');
        expect(element.dispatchEvent)
            .toHaveBeenCalledTimes(1)
            .toHaveBeenCalledWith(expect.any(MouseEvent));
    });
});

describe('wrapDataHrefClicks', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('wrap all [data-href] elements with dataHrefClickHandler', () => {
        jest.spyOn(HTMLElement.prototype, 'addEventListener');

        render(
            <div role="article">
                <div data-href="/1">1</div>
                <div data-href="/2">2</div>
                <div data-href="/3">3</div>
            </div>
        );

        const element = screen.getByRole('article');
        jest.clearAllMocks();

        wrapDataHrefClicks(element);

        expect(HTMLElement.prototype.addEventListener)
            .toHaveBeenCalledTimes(3)
            .toHaveBeenLastCalledWith('click', dataHrefClickHandler);
    });
});

describe('updateRequiredElement', () => {
    const onUpdated = jest.fn();
    const onMissing = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('do nothing if no element for update was specified', () => {
        render(
            <div>
                <div id="test" role="article">
                    Initial content
                </div>
            </div>
        );

        const fragment = documentFragment('<div id="test" role="article">Updated content</div>');

        updateRequiredElement(fragment, null, onUpdated, onMissing);
        expect(onUpdated).not.toHaveBeenCalled();
        expect(onMissing).not.toHaveBeenCalled();
        expect(screen.getByRole('article')).toHaveTextContent('Initial content');
    });

    it('update element by id', () => {
        render(
            <div>
                <div id="test" role="article">
                    Initial content
                </div>
            </div>
        );

        const fragment = documentFragment('<div id="test" role="article">Updated content</div>');

        const element = screen.getByRole('article');
        updateRequiredElement(fragment, element, onUpdated, onMissing);
        expect(onUpdated).toHaveBeenCalledWith(element);
        expect(onMissing).not.toHaveBeenCalled();
        expect(element).toHaveTextContent('Updated content');
    });

    it('missed new element for update', () => {
        render(
            <div>
                <div id="test" role="article">
                    Initial content
                </div>
            </div>
        );

        const fragment = documentFragment('<div id="missed" role="article">Updated content</div>');

        const element = screen.getByRole('article');
        updateRequiredElement(fragment, element, onUpdated, onMissing);
        expect(onUpdated).not.toHaveBeenCalledWith(element);
        expect(onMissing).toHaveBeenCalledWith(element);
    });
});

describe('updateOptionalElement', () => {
    it('do nothing if no element for update was specified', () => {
        render(
            <div>
                <div id="test" role="article">
                    Initial content
                </div>
            </div>
        );

        const fragment = documentFragment('<div id="test" role="article">Updated content</div>');

        const updated = updateOptionalElement(fragment, null);
        expect(screen.getByRole('article')).toHaveTextContent('Initial content');
        expect(updated).toBeNull();
    });

    it('update element by id', () => {
        render(
            <div>
                <div id="test" role="article">
                    Initial content
                </div>
            </div>
        );

        const fragment = documentFragment('<div id="test" role="article">Updated content</div>');

        const element = screen.getByRole('article');
        const updated = updateOptionalElement(fragment, element);
        expect(element).toHaveTextContent('Updated content');
        expect(updated).toEqual(element);
    });

    it('missed new element for update', () => {
        render(
            <div>
                <div id="test" role="article">
                    Initial content
                </div>
            </div>
        );

        const fragment = documentFragment('<div id="missed" role="article">Updated content</div>');

        const element = screen.getByRole('article');
        const updated = updateOptionalElement(fragment, element);
        expect(element).toHaveTextContent('Initial content');
        expect(updated).toBeNull();
    });
});

describe('formSubmitHandler', () => {
    const onSubmit = jest.fn();
    const onSuccess = jest.fn();

    const expectedTarget = document.createElement('form');
    const event = {
        type: 'submit',
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        target: expectedTarget,
    } as unknown as Event;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('handle form submit', async () => {
        await formSubmitHandler(event, onSubmit, onSuccess);

        expect(event.preventDefault).toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();
        expect(onSubmit).toHaveBeenCalledWith(event);
        expect(onSuccess).toHaveBeenCalledWith(expectedTarget);
    });

    it('handle form submit with false returned', async () => {
        onSubmit.mockReturnValueOnce(false);

        await formSubmitHandler(event, onSubmit, onSuccess);

        expect(event.preventDefault).toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();
        expect(onSubmit).toHaveBeenCalledWith(event);
        expect(onSuccess).not.toHaveBeenCalledWith();
    });

    it('handle form submit without onSubmit', async () => {
        await formSubmitHandler(event, null, onSuccess);

        expect(event.preventDefault).toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();
        expect(onSubmit).not.toHaveBeenCalledWith(event);
        expect(onSuccess).toHaveBeenCalledWith(expectedTarget);
    });
});

describe('wrapFormSubmit', () => {
    const onSubmit = jest.fn();
    (globalThis as unknown as { onSubmit: jest.Mock }).onSubmit = onSubmit;
    const onSuccess = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('wrap form submit', async () => {
        render(<form aria-label="form"></form>);
        const form = screen.getByRole<HTMLFormElement>('form');
        form.setAttribute('onsubmit', 'onSubmit(event)');

        wrapFormSubmit(form, onSuccess);
        expect(form.onsubmit).toBeNull();

        form.submit();
        await waitFor(() => expect(onSubmit).toHaveBeenCalledWith(expect.any(Event)));
        expect(onSuccess).toHaveBeenCalledWith(form);
    });
});

describe('linkClickHandler', () => {
    const onClick = jest.fn();
    const onSuccess = jest.fn();

    const expectedTarget = document.createElement('a');
    const event = {
        type: 'submit',
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        target: expectedTarget,
    } as unknown as Event;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('handle link click', async () => {
        await linkClickHandler(event, onClick, onSuccess);

        expect(event.preventDefault).toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();
        expect(onClick).toHaveBeenCalledWith(event);
        expect(onSuccess).toHaveBeenCalledWith(expectedTarget);
    });

    it('handle form submit with false returned', async () => {
        onClick.mockReturnValueOnce(false);

        await linkClickHandler(event, onClick, onSuccess);

        expect(event.preventDefault).toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();
        expect(onClick).toHaveBeenCalledWith(event);
        expect(onSuccess).not.toHaveBeenCalledWith();
    });

    it('handle form submit without onClick', async () => {
        await linkClickHandler(event, null, onSuccess);

        expect(event.preventDefault).toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();
        expect(onClick).not.toHaveBeenCalledWith(event);
        expect(onSuccess).toHaveBeenCalledWith(expectedTarget);
    });
});

describe('handleLinkClick', () => {
    const onClick = jest.fn();
    (globalThis as unknown as { onClick: jest.Mock }).onClick = onClick;
    const onSuccess = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('wrap form submit', async () => {
        render(<a href="/">content</a>);
        const link = screen.getByRole<HTMLAnchorElement>('link');
        link.setAttribute('onclick', 'onClick(event)');

        void handleLinkClick(link, onSuccess);
        expect(link.onsubmit).toBeNull();

        link.click();
        await waitFor(() => expect(onClick).toHaveBeenCalledWith(expect.any(Event)));
        expect(onSuccess).toHaveBeenCalledWith(link);
    });
});

describe('todayMonth', () => {
    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        jest.useFakeTimers('modern');
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('get today year and month', () => {
        jest.setSystemTime(new Date('2023-04-15'));
        expect(todayMonth()).toEqual('2023-04');
    });
});

describe('unique', () => {
    it('get unique numeric values', () => {
        expect(unique([1, 1, 2, 3, 1, 3, 4, 2, 4])).toEqual([1, 2, 3, 4]);
    });

    it('get unique string values', () => {
        expect(unique(['a', 'b', 'a', 'c', 'b', 'a', 'd', 'b', 'c'])).toEqual(['a', 'b', 'c', 'd']);
    });

    it('get unique mixed values', () => {
        expect(unique([1, 'a', '1', 'b', '2', 'a', 2])).toEqual([1, 'a', '1', 'b', '2', 2]);
    });

    it('get empty for empty', () => {
        expect(unique([])).toEqual([]);
    });
});

describe('slug', () => {
    it('switch to lowercase', () => {
        expect(slug('ThisIsTheTest')).toEqual('thisisthetest');
    });

    it('replace all non-alphanumeric symbols to dash', () => {
        expect(slug('this+15(a)test')).toEqual('this-15-a-test');
    });

    it('replace sequence of non-alphanumeric symbols to single dash', () => {
        expect(slug('this is -~- a test')).toEqual('this-is-a-test');
    });

    it('remove leading sequence of non-alphanumeric symbols', () => {
        expect(slug('-~- this is a test')).toEqual('this-is-a-test');
    });

    it('remove trailing sequence of non-alphanumeric symbols', () => {
        expect(slug('this is a test -~-')).toEqual('this-is-a-test');
    });

    it('get empty for empty', () => {
        expect(slug('')).toEqual('');
    });
});

describe('scrollIntoView', () => {
    const mockScroll = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('scroll element into view', () => {
        render(<button>Test</button>);
        const element = screen.getByRole('button');
        element.scrollIntoView = mockScroll;
        scrollIntoView(element);
        expect(mockScroll).toHaveBeenCalledWith({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest',
        });
    });

    it('do not scroll on null', () => {
        scrollIntoView(null);
        expect(mockScroll).not.toHaveBeenCalled();
    });
});
