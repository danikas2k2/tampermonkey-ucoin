const {location: loc} = document;

type FilterDirection = 'left' | 'right';

export interface FilterOptions {
    [key: string]: string;
}

interface CommonFilterProps {
    id: string;
    name: string;
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

type FilterProps = FilterPropsWithValue | FilterPropsWithoutValue;

function urlWithoutFilter(name: string) {
    const url = new URL(loc.href);
    url.searchParams.delete(name);
    return url.href;
}

function urlWithFilter(name: string, value: string) {
    const url = new URL(loc.href);
    url.searchParams.set(name, value);
    return url.href;
}

export function renderFilter(props: FilterProps) {
    return `<div class="${props?.direction || 'left'} filter-container"><div id="${props?.id}" class="filter-box${props?.value ? ` filter-box-active` : ''}" style="width: ${props?.width-24}px;">\
            <div class="${props?.value ? `blue-13 ` : ''}left">${props?.value || props?.placeholder}</div>${props?.value
        ? `<div class="right close" title="Clear filter" onclick="location.href='${urlWithoutFilter(props?.name)}';">×</div>`
        : `<div class="right"><span class="arrow ab"></span></div>`}</div>\
        <div class="drop hide filter-dialog" id="${props?.id}-dialog" style="width: ${props?.width}px;">\
            ${Object.entries(props?.options).map(([value, label]) => `<a class="list-link" href="${urlWithFilter(props?.name, value)}><span class="left gray-13 wrap" style="max-width:140px;">${label}</span></a>`).join('')}\
        </div></div>`;

    // Toggle:
    // <div class="filter-box" style="width: 120px;" data-href="/table/?country=latvia&amp;period=315&amp;type=1&amp;uid=28609&amp;year=2014&amp;mintset=on">
    //     <div class="gray-13 left wrap" style="max-width:100px;">Mint Set</div>
    //     <div class="lgray-13 right">38</div>
    // </div>
}

export function renderFilters(props: FilterProps[]) {
    const script = ``;
    // const script = `
    //     <script>
    //         $(document).on('click touchstart', function (event) {
    //             if( $(event.target).closest(".filter-dialog").length )
    //                 return;
    //             $(".filter-dialog").fadeOut("fast");
    //             event.stopPropagation();
    //         });
    //         $('.filter-box[data-href!=""]').on('click touchstart', function () {
    //             $(location).attr('href', $(this).attr('data-href'));
    //         });
    //         $('.filter-box').on('click touchstart', function (event) {
    //             if( $(event.target).closest(".close").length ) return;
    //             dialog = "#" + $(this).attr('id') + "-dialog";
    //             if( $(dialog).css("display") == 'block') {
    //                 $(dialog).fadeOut("fast");
    //             } else {
    //                 $(".filter-dialog").fadeOut("fast");
    //                 $(dialog).fadeIn("fast");
    //             }
    //             return false;
    //         });
    //     </script>`;
    return `<div class="filters">${props.map(renderFilter).join('')}${script}</div>`;
}
