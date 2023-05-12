import { waitFor } from '@testing-library/dom';
import { decorateDelay, decoratedDelay, randomDecoratedDelay } from './delay';

describe('delay', () => {
    const mockComplete = jest.fn();
    const mockDecorator = jest.fn();

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should delay for given time', async () => {
        decoratedDelay(1000, mockDecorator).finally(mockComplete);
        jest.advanceTimersByTime(500);
        await waitFor(() => expect(mockComplete).not.toHaveBeenCalled());
        jest.advanceTimersByTime(1000);
        await waitFor(() => expect(mockComplete).toHaveBeenCalled());
        await waitFor(() => expect(mockDecorator).not.toHaveBeenCalled());
    });

    it('call decorator if delay longer than 1 second', async () => {
        decoratedDelay(1500, mockDecorator).finally(mockComplete);
        await waitFor(() => expect(mockDecorator).toHaveBeenCalledWith(1500, 1000));
        await waitFor(() => expect(mockComplete).not.toHaveBeenCalled());
        jest.advanceTimersByTime(1500);
        await waitFor(() => expect(mockComplete).toHaveBeenCalled());
    });

    it('do not call decorator if delay longer shorted than 2 second', async () => {
        decoratedDelay(1500, mockDecorator, 2000).finally(mockComplete);
        await waitFor(() => expect(mockComplete).not.toHaveBeenCalled());
        jest.advanceTimersByTime(1500);
        await waitFor(() => expect(mockComplete).not.toHaveBeenCalled());
        await waitFor(() => expect(mockDecorator).not.toHaveBeenCalled());
    });

    it('call decorator if delay longer than 2 second', async () => {
        decoratedDelay(2500, mockDecorator, 2000).finally(mockComplete);
        await waitFor(() => expect(mockDecorator).toHaveBeenCalledWith(2500, 2000));
        await waitFor(() => expect(mockComplete).not.toHaveBeenCalled());
        jest.advanceTimersByTime(2500);
        await waitFor(() => expect(mockComplete).not.toHaveBeenCalled());
    });
});

jest.spyOn(Math, 'random').mockReturnValue(0.5);

describe('randomDelay', () => {
    const mockComplete = jest.fn();
    const mockDecorator = jest.fn();

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should delay for random time, starting from default minimum', async () => {
        randomDecoratedDelay(1000, undefined, mockDecorator).finally(mockComplete);
        await waitFor(() => expect(mockDecorator).toHaveBeenCalledWith(2000, 1000));
        await waitFor(() => expect(mockComplete).not.toHaveBeenCalled());
        jest.advanceTimersByTime(1000);
        await waitFor(() => expect(mockComplete).not.toHaveBeenCalled());
        jest.advanceTimersByTime(1500);
        await waitFor(() => expect(mockComplete).not.toHaveBeenCalled());
        jest.advanceTimersByTime(2000);
        await waitFor(() => expect(mockComplete).toHaveBeenCalled());
    });

    it('should delay for random time, starting from custom minimum', async () => {
        randomDecoratedDelay(1000, 1000, mockDecorator).finally(mockComplete);
        await waitFor(() => expect(mockDecorator).toHaveBeenCalledWith(1500, 1000));
        await waitFor(() => expect(mockComplete).not.toHaveBeenCalled());
        jest.advanceTimersByTime(1000);
        await waitFor(() => expect(mockComplete).not.toHaveBeenCalled());
        jest.advanceTimersByTime(1500);
        await waitFor(() => expect(mockComplete).toHaveBeenCalled());
    });

    it('should delay for different random time, starting from default minimum', async () => {
        (Math.random as jest.Mock).mockReturnValue(0.25);
        randomDecoratedDelay(1000, undefined, mockDecorator).finally(mockComplete);
        await waitFor(() => expect(mockDecorator).toHaveBeenCalledWith(1750, 1000));
        await waitFor(() => expect(mockComplete).not.toHaveBeenCalled());
        jest.advanceTimersByTime(1000);
        await waitFor(() => expect(mockComplete).not.toHaveBeenCalled());
        jest.advanceTimersByTime(1500);
        await waitFor(() => expect(mockComplete).not.toHaveBeenCalled());
        jest.advanceTimersByTime(1750);
        await waitFor(() => expect(mockComplete).toHaveBeenCalled());
    });

    it('call decorator if delay longer than 1 second', async () => {
        randomDecoratedDelay(1000, undefined, mockDecorator).finally(mockComplete);
        await waitFor(() => expect(mockDecorator).toHaveBeenCalledWith(1750, 1000));
        await waitFor(() => expect(mockComplete).not.toHaveBeenCalled());
        jest.advanceTimersByTime(1500);
        await waitFor(() => expect(mockComplete).toHaveBeenCalled());
    });

    it('do not call decorator if delay longer shorted than 2 second', async () => {
        randomDecoratedDelay(1000, undefined, mockDecorator, 2000).finally(mockComplete);
        await waitFor(() => expect(mockComplete).not.toHaveBeenCalled());
        jest.advanceTimersByTime(1500);
        await waitFor(() => expect(mockComplete).not.toHaveBeenCalled());
        await waitFor(() => expect(mockDecorator).not.toHaveBeenCalled());
    });

    it('call decorator if delay longer than 2 second', async () => {
        randomDecoratedDelay(2500, undefined, mockDecorator, 2000).finally(mockComplete);
        await waitFor(() => expect(mockDecorator).toHaveBeenCalledWith(2125, 2000));
        await waitFor(() => expect(mockComplete).not.toHaveBeenCalled());
        jest.advanceTimersByTime(2500);
        await waitFor(() => expect(mockComplete).not.toHaveBeenCalled());
    });
});

describe('decorateDelay', () => {
    it('add decoration element to document', async () => {
        decorateDelay(1000);
        const decorator = document.getElementById('display-delay');
        expect(decorator).toBeInTheDocument();
        expect(decorator?.firstChild).toHaveStyle('animation-duration: 1000ms');
    });
});
