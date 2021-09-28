type FilterDirection = 'left' | 'right';

export enum Filter {
    COUNTRY = 'country',
    YEAR = 'year',
    VALUE = 'value',
    KM = 'km',
}

export type FilterOptions = Map<string, string>;

interface CommonFilterProps {
    // name: string;
    width: number;
    options: FilterOptions;
    direction?: FilterDirection;
}

interface FilterPropsWithValue extends CommonFilterProps {
    value: string;
    placeholder?: string;
}

interface FilterPropsWithoutValue extends CommonFilterProps {
    value?: string;
    placeholder: string;
}

export type FilterProps = FilterPropsWithValue | FilterPropsWithoutValue;

export function renderFilter([name, props]: [Filter, FilterProps]) {
    const disabled = props.options.size <= 1;
    return `<div class='${props.direction || 'left'} filter'>\
            <div data-filter='${name}' data-filter-placeholder='${props.placeholder}'${
        disabled ? ' data-filter-disabled' : ''
    } class='filter-box${disabled ? ' filter-box-disabled' : props.value ? ' filter-box-active' : ''}' style='width: ${
        props.width - 24
    }px;'>\
            <div class='${props.value ? `blue-13 ` : ''}left'>${
        disabled
            ? props.options.get([...props.options.keys()].filter((k) => k !== '').pop())
            : props.value
            ? props.options.get(props.value) || props.value
            : props.placeholder
    }</div>${
        (!disabled &&
            (props.value
                ? `<div class='right close' title='Clear filter' data-filter-clear='${name}'>×</div>`
                : `<div class='right'><span class='arrow ab'></span></div>`)) ||
        ''
    }</div>\
        <div class='drop hide filter-dialog' data-filter-dialog='${name}' style='width: ${props.width}px;'>\
            ${[['', 'All'], ...props.options.entries()]
                .map(
                    ([value, label]) =>
                        `<a class='list-link' data-filter-by='${name}' data-filter-value='${value}'>\
                    <span class='left gray-13 wrap' style='max-width:140px;'>${label}</span></a>`
                )
                .join('')}\
        </div></div>`;
}

export function renderFilters(props: Map<Filter, FilterProps>) {
    return `<div class='left filter-container filters'>${[...props.entries()].map(renderFilter).join('')}</div>`;
}
