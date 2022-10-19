import { Translations } from '../lib/lang';

export const Euro = 'Euro';
export const Euro_A = 'A-K';
export const Euro_L = 'L-Z';

export const Europe = 'Europe';

export const Poland = 'Poland';
export const Germany = 'Germany';
export const Lithuania = 'Lithuania';
export const United_Kingdom = 'United Kingdom';

export const Russia = 'Russia';
export const Russian_Empire = 'Russian Empire and USSR';
export const Russian_Federation = 'Russian Federation';

export const Northern_Europe = 'Northern Europe';
export const Eastern_Europe = 'Eastern Europe';
export const Central_Europe = 'Central Europe';
export const Western_Europe = 'Western Europe';
export const Southern_Europe = 'Southern Europe';
export const Southeast_Europe = 'Southeast Europe';
export const Southwest_Europe = 'Southwest Europe';

export const Asia = 'Asia';
export const Northern_Asia = 'Northern Asia';
export const Central_and_Eastern_Asia = 'Central and Eastern Asia';
export const Central_Asia = 'Central Asia';
export const Eastern_Asia = 'Eastern Asia';
export const Southeast_Asia = 'Southeast Asia';
export const Mainland_Southeast_Asia = 'Mainland Southeast Asia';
export const Maritime_Southeast_Asia = 'Maritime Southeast Asia';
export const Southern_Asia = 'Southern Asia';
export const Western_Asia = 'Western Asia';

export const Africa = 'Africa';
export const Northern_and_Western_Africa = 'Northern and Western Africa';
export const Northern_Africa = 'Northern Africa';
export const Eastern_Africa = 'Eastern Africa';
export const East_African_Community = 'East African Community';
export const Horn_of_Africa = 'Horn of Africa';
export const Indian_Ocean_Islands = 'Indian Ocean Islands';
export const Nile_Valley = 'Nile Valley';
export const Central_and_Southern_Africa = 'Central and Southern Africa';
export const Central_Africa = 'Central Africa';
export const Southeast_Africa = 'Southeast Africa';
export const Southern_Africa = 'Southern Africa';
export const Western_Africa = 'Western Africa';

export const America = 'America';
export const Northern_America = 'Northern America';
export const Central_America_and_Caribbean = 'Central America and Caribbean';
export const Caribbean = 'Caribbean';
export const Central_America = 'Central America';
export const Southern_America = 'Southern America';

export const Oceania = 'Australia and Oceania';
export const Australia_and_New_Zealand = 'Australia and New Zealand';
export const Melanesia = 'Melanesia';
export const Micronesia = 'Micronesia';
export const Polynesia = 'Polynesia';

export const Antarctica = 'Antarctica';
export const Worldwide = 'Worldwide';

export const PayPal_Europe = 'PayPal - Europe';
export const PayPal_UK = 'PayPal - UK';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Regions extends Record<string, Regions> {}

export const regionTree: Regions = {
    [Euro]: {
        [Euro_A]: {},
        [Euro_L]: {},
    },
    [Europe]: {
        [Lithuania]: {},
        [Poland]: {},
        [Russian_Empire]: {},
        [Russian_Federation]: {},
        [Germany]: {},
        [Eastern_Europe]: {},
        [Central_Europe]: {},
        [Northern_Europe]: {},
        [Southwest_Europe]: {},
        [Southeast_Europe]: {},
        [Western_Europe]: {},
        [United_Kingdom]: {},
    },
    [Asia]: {
        [Central_and_Eastern_Asia]: {},
        [Southeast_Asia]: {},
        [Southern_Asia]: {},
        [Western_Asia]: {},
        [Northern_Asia]: {},
    },
    [Africa]: {
        [Northern_and_Western_Africa]: {},
        [Eastern_Africa]: {},
        [Central_and_Southern_Africa]: {},
    },
    [America]: {
        [Northern_America]: {},
        [Central_America_and_Caribbean]: {},
        [Southern_America]: {},
    },
    [Oceania]: {},
};

export const regionNames: Translations = {
    [Euro]: { lt: 'Eurai' },
    [Euro_A]: { lt: Euro_A },
    [Euro_L]: { lt: Euro_L },
    [Europe]: { lt: 'Europa' },
    [Poland]: { lt: 'Lenkija' },
    [Germany]: { lt: 'Vokietija' },
    [Lithuania]: { lt: 'Lietuva' },
    [United_Kingdom]: { lt: 'Jungtinė Karalystė' },
    [Russia]: { lt: 'Rusija' },
    [Russian_Empire]: { lt: 'Rusijos Imperija ir TSRS' },
    [Russian_Federation]: { lt: 'Rusijos Federacija' },
    [Northern_Europe]: { lt: 'Šiaurės Europa' },
    [Eastern_Europe]: { lt: 'Rytų Europa' },
    [Central_Europe]: { lt: 'Vidurio Europa' },
    [Western_Europe]: { lt: 'Vakarų Europa' },
    [Southern_Europe]: { lt: 'Pietų Europa' },
    [Southeast_Europe]: { lt: 'Pietryčių Europa' },
    [Southwest_Europe]: { lt: 'Pietvakarių Europa' },
    [Asia]: { lt: 'Azija' },
    [Northern_Asia]: { lt: 'Šiaurės Azija' },
    [Central_and_Eastern_Asia]: { lt: 'Vidurio ir Rytų Azija' },
    [Central_Asia]: { lt: 'Vidurio Azija' },
    [Eastern_Asia]: { lt: 'Rytų Azija' },
    [Southeast_Asia]: { lt: 'Pietryčių Azija' },
    [Mainland_Southeast_Asia]: { lt: 'Žemyninė Pietryčių Azija' },
    [Maritime_Southeast_Asia]: { lt: 'Jūrinė Pietryčių Azija' },
    [Southern_Asia]: { lt: 'Pietų Azija' },
    [Western_Asia]: { lt: 'Vakarų Azija' },
    [Africa]: { lt: 'Afrika' },
    [Northern_and_Western_Africa]: { lt: 'Šiaurės ir Vakarų Afrika' },
    [Northern_Africa]: { lt: 'Šiaurės Afrika' },
    [Eastern_Africa]: { lt: 'Rytų Afrika' },
    [East_African_Community]: { lt: 'Rytų Afrikos Bendrija' },
    [Horn_of_Africa]: { lt: 'Afrikos Kyšulys' },
    [Indian_Ocean_Islands]: { lt: 'Indijos Vandenyno Salos' },
    [Nile_Valley]: { lt: 'Nilo Slėnis' },
    [Central_and_Southern_Africa]: { lt: 'Vidurio ir Pietų Afrika' },
    [Central_Africa]: { lt: 'Vidurio Afrika' },
    [Southeast_Africa]: { lt: 'Pietryčių Afrika' },
    [Southern_Africa]: { lt: 'Pietų Afrika' },
    [Western_Africa]: { lt: 'Vakarų Afrika' },
    [America]: { lt: 'Amerika' },
    [Northern_America]: { lt: 'Šiaurės Amerika' },
    [Central_America_and_Caribbean]: { lt: 'Vidurio Amerika ir Karibai' },
    [Caribbean]: { lt: 'Karibai' },
    [Central_America]: { lt: 'Vidurio Amerika' },
    [Southern_America]: { lt: 'Pietų Amerika' },
    [Oceania]: { lt: 'Australija ir Okeanija' },
    [Australia_and_New_Zealand]: { lt: 'Australija ir Naujoji Zelandija' },
    [Melanesia]: { lt: 'Melanezija' },
    [Micronesia]: { lt: 'Mikronezija' },
    [Polynesia]: { lt: 'Polinezija' },
    [Antarctica]: { lt: 'Antarktida' },
    [Worldwide]: { lt: 'Viso Pasaulio' },
};
