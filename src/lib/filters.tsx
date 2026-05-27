import classNames from 'classnames';
import React, { ReactElement } from 'react';

export type FilterDirection = 'left' | 'right';

export const enum FilterName {
    RESERVED = 'reserved',
    MARKED = 'marked',
    COUNTRY = 'country',
    YEAR = 'year',
    VALUE = 'value',
    KM = 'km',
}

export interface FilterOption {
    name: string;
    count: number;
}

export type FilterOptions = Map<string, FilterOption>;

interface CommonFilterProps {
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

type FilterComponentProps = FilterProps & {
    name: FilterName;
};

export function Filter({
    name,
    direction,
    value,
    placeholder,
    width,
    options,
}: FilterComponentProps): ReactElement | null {
    const disabled = options.size <= 1;
    if (disabled && !value) {
        return null;
    }

    let display = placeholder || '';
    let option: FilterOption | undefined;
    if (value) {
        option = options.get(value);
    }
    if (option?.name) {
        display = option.name;
    } else if (value) {
        display = value;
    }

    const icon = value && (name === 'marked' || name === 'reserved');

    return (
        <div className={classNames('filter', direction || 'left')}>
            <div
                data-filter={name}
                data-filter-placeholder={placeholder}
                data-filter-disabled={disabled}
                className={classNames('filter-box', {
                    'filter-box-disabled': disabled,
                    'filter-box-active': !disabled && value,
                })}
                style={{ width: width - 24 }}
            >
                <div
                    className={classNames('left', { 'blue-13': value }, 'filter-label', {
                        'filter-icon': icon,
                    })}
                    dangerouslySetInnerHTML={{ __html: display }}
                />
                {(!disabled &&
                    (value ? (
                        <div className="right close" title="Clear filter" data-filter-clear={name}>
                            ×
                        </div>
                    ) : (
                        <div className="right">
                            <span className="arrow ab" />
                        </div>
                    ))) ||
                    ''}
            </div>
            <div className="drop hide filter-dialog" data-filter-dialog={name} style={{ width }}>
                {[['', 'All'], ...options.entries()].map(([value, option]) => (
                    <>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a className="list-link" data-filter-by={name} data-filter-value={value}>
                            <span
                                className={classNames('left', 'gray-13', 'wrap', 'filter-label', {
                                    'filter-icon': icon,
                                })}
                                dangerouslySetInnerHTML={{
                                    __html: typeof option === 'string' ? option : `${option.name}`,
                                }}
                            />
                            {typeof option !== 'string' && (
                                <span className="right lgray-11">({option.count})</span>
                            )}
                        </a>
                    </>
                ))}
            </div>
        </div>
    );
}

export function Filters({ filters }: { filters: Map<FilterName, FilterProps> }): ReactElement {
    return (
        <div className="filter-container filters">
            {[...filters.entries()].map(([name, props]) => (
                <Filter key={name} {...props} name={name} />
            ))}
        </div>
    );
}
