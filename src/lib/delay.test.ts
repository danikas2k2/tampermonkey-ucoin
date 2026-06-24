import { decoratedDelay, decorateDelay, randomDecoratedDelay } from './delay';

describe('delay', () => {
    const mockComplete = vi.fn();
    const mockDecorator = vi.fn();

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.useRealTimers();
    });

    it('should delay for given time', async () => {
        decoratedDelay(1000, mockDecorator).finally(mockComplete);
        await vi.advanceTimersByTimeAsync(500);
        expect(mockComplete).not.toHaveBeenCalled();
        await vi.advanceTimersByTimeAsync(1000);
        expect(mockComplete).toHaveBeenCalled();
        expect(mockDecorator).not.toHaveBeenCalled();
    });

    it('call decorator if delay longer than 1 second', async () => {
        decoratedDelay(1500, mockDecorator).finally(mockComplete);
        await vi.advanceTimersByTimeAsync(0);
        expect(mockDecorator).toHaveBeenCalledWith(1500, 1000);
        expect(mockComplete).not.toHaveBeenCalled();
        await vi.advanceTimersByTimeAsync(1500);
        expect(mockComplete).toHaveBeenCalled();
    });

    it('do not call decorator if delay shorter than 2 second', async () => {
        decoratedDelay(1500, mockDecorator, 2000).finally(mockComplete);
        await vi.advanceTimersByTimeAsync(1500);
        expect(mockComplete).toHaveBeenCalled();
        expect(mockDecorator).not.toHaveBeenCalled();
    });

    it('call decorator if delay longer than 2 second', async () => {
        decoratedDelay(2500, mockDecorator, 2000).finally(mockComplete);
        await vi.advanceTimersByTimeAsync(0);
        expect(mockDecorator).toHaveBeenCalledWith(2500, 2000);
        expect(mockComplete).not.toHaveBeenCalled();
        await vi.advanceTimersByTimeAsync(2500);
        expect(mockComplete).toHaveBeenCalled();
    });
});

vi.spyOn(Math, 'random').mockReturnValue(0.5);

describe('randomDelay', () => {
    const mockComplete = vi.fn();
    const mockDecorator = vi.fn();

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.useRealTimers();
    });

    it('should delay for random time, starting from default minimum', async () => {
        randomDecoratedDelay(1000, undefined, mockDecorator).finally(mockComplete);
        await vi.advanceTimersByTimeAsync(0);
        expect(mockDecorator).toHaveBeenCalledWith(2000, 1000);
        expect(mockComplete).not.toHaveBeenCalled();
        await vi.advanceTimersByTimeAsync(2000);
        expect(mockComplete).toHaveBeenCalled();
    });

    it('should delay for random time, starting from custom minimum', async () => {
        randomDecoratedDelay(1000, 1000, mockDecorator).finally(mockComplete);
        await vi.advanceTimersByTimeAsync(0);
        expect(mockDecorator).toHaveBeenCalledWith(1500, 1000);
        expect(mockComplete).not.toHaveBeenCalled();
        await vi.advanceTimersByTimeAsync(1500);
        expect(mockComplete).toHaveBeenCalled();
    });

    it('should delay for different random time, starting from default minimum', async () => {
        vi.spyOn(Math, 'random').mockReturnValueOnce(0.25);
        randomDecoratedDelay(1000, undefined, mockDecorator).finally(mockComplete);
        await vi.advanceTimersByTimeAsync(0);
        expect(mockDecorator).toHaveBeenCalledWith(1750, 1000);
        expect(mockComplete).not.toHaveBeenCalled();
        await vi.advanceTimersByTimeAsync(1750);
        expect(mockComplete).toHaveBeenCalled();
    });

    it('call decorator if delay longer than 1 second', async () => {
        randomDecoratedDelay(1000, undefined, mockDecorator).finally(mockComplete);
        await vi.advanceTimersByTimeAsync(0);
        expect(mockDecorator).toHaveBeenCalledWith(2000, 1000);
        expect(mockComplete).not.toHaveBeenCalled();
        await vi.advanceTimersByTimeAsync(2000);
        expect(mockComplete).toHaveBeenCalled();
    });

    it('do not call decorator if delay shorter than 2 second', async () => {
        randomDecoratedDelay(1000, undefined, mockDecorator, 2000).finally(mockComplete);
        await vi.advanceTimersByTimeAsync(2000);
        expect(mockComplete).toHaveBeenCalled();
        expect(mockDecorator).not.toHaveBeenCalled();
    });

    it('call decorator if delay longer than 2 second', async () => {
        randomDecoratedDelay(2500, undefined, mockDecorator, 2000).finally(mockComplete);
        await vi.advanceTimersByTimeAsync(0);
        // minDelay=1500 (default), getDelay(1500, 2500) = round(1500 + 0.5*2500) = 2750
        expect(mockDecorator).toHaveBeenCalledWith(2750, 2000);
        expect(mockComplete).not.toHaveBeenCalled();
        await vi.advanceTimersByTimeAsync(2750);
        expect(mockComplete).toHaveBeenCalled();
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
