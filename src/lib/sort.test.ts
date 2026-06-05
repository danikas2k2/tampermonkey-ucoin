import {
    cmp,
    num,
    cmpNum,
    cmpStr,
    cmpYear,
    cmpKm,
    cmpFace,
    cmpSubject,
    cmpCond,
    cmpValue,
    sortBy,
    sortSections,
    getActiveSortOption,
    x,
    a,
    d,
    o,
    s,
    c,
    dropdown,
    sortField,
} from './sort';

describe('num', () => {
    it('return 0 for undefined', () => {
        expect(num(undefined)).toBe(0);
    });

    it('parse plain number string', () => {
        expect(num('42')).toBe(42);
    });

    it('strip non-numeric characters', () => {
        expect(num('€ 3.50')).toBeCloseTo(3.5);
    });

    it('return 0 for empty string', () => {
        expect(num('')).toBe(0);
    });
});

describe('cmp', () => {
    it('return 0 for equal values', () => {
        expect(cmp(1, 1)).toBe(0);
        expect(cmp('a', 'a')).toBe(0);
    });

    it('return negative when first < second', () => {
        expect(cmp(1, 2)).toBeLessThan(0);
        expect(cmp('a', 'b')).toBeLessThan(0);
    });

    it('return positive when first > second', () => {
        expect(cmp(2, 1)).toBeGreaterThan(0);
        expect(cmp('b', 'a')).toBeGreaterThan(0);
    });
});

describe('sortField', () => {
    it('prefix field name with sort and capitalise first letter', () => {
        expect(sortField('year')).toBe('sortYear');
        expect(sortField('km')).toBe('sortKm');
    });
});

describe('cmpNum', () => {
    it('compare numeric dataset fields', () => {
        const a = { sortYear: '2010' };
        const b = { sortYear: '2020' };
        expect(cmpNum(a, b, 'year')).toBeLessThan(0);
        expect(cmpNum(b, a, 'year')).toBeGreaterThan(0);
        expect(cmpNum(a, a, 'year')).toBe(0);
    });
});

describe('cmpStr', () => {
    it('compare string dataset fields', () => {
        const a = { sortKmc: 'A' };
        const b = { sortKmc: 'B' };
        expect(cmpStr(a, b, 'kmc')).toBeLessThan(0);
        expect(cmpStr(b, a, 'kmc')).toBeGreaterThan(0);
        expect(cmpStr(a, a, 'kmc')).toBe(0);
    });
});

describe('cmpYear', () => {
    it('sort by year ascending', () => {
        const a = { sortYear: '1990', sortMm: '' };
        const b = { sortYear: '2000', sortMm: '' };
        expect(cmpYear(a, b, 1)).toBeLessThan(0);
        expect(cmpYear(b, a, 1)).toBeGreaterThan(0);
    });

    it('equal years with different mm', () => {
        const a = { sortYear: '2000', sortMm: 'A' };
        const b = { sortYear: '2000', sortMm: 'B' };
        expect(cmpYear(a, b, 1)).toBeLessThan(0);
    });
});

describe('cmpKm', () => {
    it('sort by km category first', () => {
        const a = { sortKmc: 'A', sortKm: '1', sortKma: '', sortYear: '2000', sortMm: '' };
        const b = { sortKmc: 'B', sortKm: '1', sortKma: '', sortYear: '2000', sortMm: '' };
        expect(cmpKm(a, b, 1)).toBeLessThan(0);
    });

    it('fall through to km number when categories equal', () => {
        const a = { sortKmc: 'A', sortKm: '1', sortKma: '', sortYear: '2000', sortMm: '' };
        const b = { sortKmc: 'A', sortKm: '2', sortKma: '', sortYear: '2000', sortMm: '' };
        expect(cmpKm(a, b, 1)).toBeLessThan(0);
    });
});

describe('cmpFace', () => {
    it('sort by face value first', () => {
        const a = {
            sortFace: '1',
            sortKmc: '',
            sortKm: '0',
            sortKma: '',
            sortYear: '2000',
            sortMm: '',
        };
        const b = {
            sortFace: '2',
            sortKmc: '',
            sortKm: '0',
            sortKma: '',
            sortYear: '2000',
            sortMm: '',
        };
        expect(cmpFace(a, b, 1)).toBeLessThan(0);
    });
});

describe('cmpSubject', () => {
    it('sort by subject first', () => {
        const a = {
            sortSubject: 'Apple',
            sortFace: '1',
            sortKmc: '',
            sortKm: '0',
            sortKma: '',
            sortYear: '2000',
            sortMm: '',
        };
        const b = {
            sortSubject: 'Banana',
            sortFace: '1',
            sortKmc: '',
            sortKm: '0',
            sortKma: '',
            sortYear: '2000',
            sortMm: '',
        };
        expect(cmpSubject(a, b, 1)).toBeLessThan(0);
    });
});

describe('cmpCond', () => {
    it('sort by condition first', () => {
        const a = {
            sortCond: '1',
            sortFace: '1',
            sortKmc: '',
            sortKm: '0',
            sortKma: '',
            sortYear: '2000',
            sortMm: '',
        };
        const b = {
            sortCond: '2',
            sortFace: '1',
            sortKmc: '',
            sortKm: '0',
            sortKma: '',
            sortYear: '2000',
            sortMm: '',
        };
        expect(cmpCond(a, b, 1)).toBeLessThan(0);
    });
});

describe('cmpValue', () => {
    it('sort by value first', () => {
        const a = {
            sortValue: '10',
            sortCond: '1',
            sortFace: '1',
            sortKmc: '',
            sortKm: '0',
            sortKma: '',
            sortYear: '2000',
            sortMm: '',
        };
        const b = {
            sortValue: '20',
            sortCond: '1',
            sortFace: '1',
            sortKmc: '',
            sortKm: '0',
            sortKma: '',
            sortYear: '2000',
            sortMm: '',
        };
        expect(cmpValue(a, b, 1)).toBeLessThan(0);
    });
});

describe('sortBy', () => {
    function makeSection(years: string[]): HTMLTableSectionElement {
        const tbody = document.createElement('tbody');
        for (const year of years) {
            const tr = document.createElement('tr');
            tr.dataset.sortYear = year;
            tr.dataset.sortMm = '';
            tbody.appendChild(tr);
        }
        return tbody;
    }

    it('sort rows in a section by year ascending', () => {
        const section = makeSection(['2005', '1990', '2020']);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        sortBy([section] as any, cmpYear, 'a');
        const rows = section.querySelectorAll('tr');
        expect(rows[0].dataset.sortYear).toBe('1990');
        expect(rows[1].dataset.sortYear).toBe('2005');
        expect(rows[2].dataset.sortYear).toBe('2020');
    });

    it('sort rows descending', () => {
        const section = makeSection(['2005', '1990', '2020']);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        sortBy([section] as any, cmpYear, 'd');
        const rows = section.querySelectorAll('tr');
        expect(rows[0].dataset.sortYear).toBe('2020');
        expect(rows[1].dataset.sortYear).toBe('2005');
        expect(rows[2].dataset.sortYear).toBe('1990');
    });

    it('skip sections with a single row', () => {
        const section = makeSection(['2005']);
        const originalHTML = section.innerHTML;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        sortBy([section] as any, cmpYear, 'a');
        expect(section.innerHTML).toBe(originalHTML);
    });
});

describe('sortSections', () => {
    function makeContainer(keys: string[]): HTMLDivElement {
        const container = document.createElement('div');
        for (const key of keys) {
            const h2 = document.createElement('h2');
            h2.textContent = key;
            const table = document.createElement('table');
            container.appendChild(h2);
            container.appendChild(table);
        }
        return container;
    }

    it('sort sections alphabetically by heading text', () => {
        const container = makeContainer(['Banana', 'Apple', 'Cherry']);
        sortSections(container, (h) => h.textContent ?? '');
        const headings = container.querySelectorAll('h2');
        expect(headings[0].textContent).toBe('Apple');
        expect(headings[1].textContent).toBe('Banana');
        expect(headings[2].textContent).toBe('Cherry');
    });

    it('do nothing when fewer than 2 headings', () => {
        const container = makeContainer(['Only']);
        const originalHTML = container.innerHTML;
        sortSections(container, (h) => h.textContent ?? '');
        expect(container.innerHTML).toBe(originalHTML);
    });

    it('call decorate on each heading', () => {
        const container = makeContainer(['B', 'A']);
        const decorate = jest.fn();
        sortSections(container, (h) => h.textContent ?? '', decorate);
        expect(decorate).toHaveBeenCalledTimes(2);
    });
});

describe('getActiveSortOption', () => {
    beforeEach(() => {
        location.hash = '';
    });

    it('return default field "year" and order "d" when no hash param', () => {
        expect(getActiveSortOption()).toEqual(['year', 'd']);
    });

    it('return field and order from hash param', () => {
        location.hash = '#o=km_a';
        expect(getActiveSortOption()).toEqual(['km', 'a']);
    });
});

describe('HTML helpers', () => {
    it('x renders a close button with the filter name', () => {
        expect(x('myFilter')).toContain("data-filter-clear='myFilter'");
        expect(x('myFilter')).toContain('×');
    });

    it('a renders ascending arrow by default', () => {
        expect(a()).toContain("class='arrow at'");
    });

    it('a renders descending arrow for "d"', () => {
        expect(a('d')).toContain("class='arrow ab'");
    });

    it('d renders same as a("d")', () => {
        expect(d()).toEqual(a('d'));
    });

    it('o wraps option text in left gray div', () => {
        expect(o('hello')).toContain('hello');
        expect(o('hello')).toContain('gray-13');
    });

    it('s combines o and a', () => {
        expect(s('label', 'a')).toContain('label');
        expect(s('label', 'a')).toContain('arrow');
    });

    it('c returns empty string for falsy input', () => {
        expect(c(undefined)).toBe('');
        expect(c('')).toBe('');
    });

    it('c adds wrap class to left div', () => {
        const result = c("<div class='left gray-13'>opt</div>");
        expect(result).toContain('wrap');
    });

    it('dropdown contains id and options', () => {
        const result = dropdown('my-id', s('Year', 'a'), [s('KM', 'a'), s('Value', 'd')]);
        expect(result).toContain("id='my-id'");
        expect(result).toContain('KM');
        expect(result).toContain('Value');
    });
});
