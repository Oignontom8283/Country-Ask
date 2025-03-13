import chalk from "chalk";
import { off } from "process";
import { z } from "zod";


export enum DifficultyLevel {
    Easy = "easy",
    Normal = "normal",
    Harde = "harde",
    God = "god",
};

export const allDifficulty = Object.values(DifficultyLevel);



export enum QuestionType {
    CountryContinent = "CountryContinent",
    CountryPeople = "CountryPeople",
    CountryCapital = "CountryCapital",
}

export const allQuestionType = Object.values(QuestionType);



// [ 'Antarctic', 'Americas', 'Europe', 'Africa', 'Asia', 'Oceania' ]
export enum Continent {
    Antarctic = "Antarctic",
    Americas = "Americas",
    Europe = "Europe",
    Africa = "Africa",
    Asia = "Asia",
    Oceania = "Oceania",
}

export const allConitnent = Object.values(Continent);


export enum InputType {
    /**
     * Multiple choice
     */
    Select = "select",

    /**
     * Enter the exact answer. **No helper !**
     */
    Input = "input",

    /**
     * Enter the exact answer. **With helper !**
     */
    Helper = "helper",
}

export type InputTypeType = `${InputType}`;

export type Answer =
    | {
        successful: true;
        good_answer?: string;
        score: number;
        message?: string;
    }
    | {
        successful: false;
        good_answer: string; // Obligatoire si successful est false
        score: number;
        message?: string;
    };

export interface QuestionMapper {
    type: QuestionType;
    execute: (context:{continent:Continent[], inputType:InputTypeType, countrys:z.infer<typeof CountrysDataSchema>, rawCountrys:z.infer<typeof CountrysDataSchema>}) => Promise<Answer> | Answer;
}

export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  

export const cursor = {
    off: () => process.stdout.write("\x1B[?25l"),
    on: () => process.stdout.write("\x1B[?25h\n")
}


declare global {
    interface String {
        black: string;
        red: string;
        green: string;
        yellow: string;
        blue: string;
        magenta: string;
        cyan: string;
        white: string;
        gray: string;
        grey: string;

        bBlack: string;
        bRed: string;
        bGreen: string;
        bYellow: string;
        bBlue: string;
        bMagenta: string;
        bCyan: string;
        bWhite: string;

        bld: string;
        underline: string;
        italic: string;
        strikethrough: string;
        
        colorHex: (color: `#${string}`) => string;
        colorRGB: (color: [number, number, number]) => string;
    }
}

Object.defineProperties(String.prototype, {
    // 🌈 Couleurs classiques (ANSI 16)
    black: { get() { return chalk.black(this); } },
    red: { get() { return chalk.red(this); } },
    green: { get() { return chalk.green(this); } },
    yellow: { get() { return chalk.yellow(this); } },
    blue: { get() { return chalk.blue(this); } },
    magenta: { get() { return chalk.magenta(this); } },
    cyan: { get() { return chalk.cyan(this); } },
    white: { get() { return chalk.white(this); } },
    gray: { get() { return chalk.gray(this); } }, // US spelling
    grey: { get() { return chalk.grey(this); } }, // UK spelling

    // 🖼️ Couleurs de fond (background)
    bBlack: { get() { return chalk.bgBlack(this); } },
    bRed: { get() { return chalk.bgRed(this); } },
    bGreen: { get() { return chalk.bgGreen(this); } },
    bYellow: { get() { return chalk.bgYellow(this); } },
    bBlue: { get() { return chalk.bgBlue(this); } },
    bMagenta: { get() { return chalk.bgMagenta(this); } },
    bCyan: { get() { return chalk.bgCyan(this); } },
    bWhite: { get() { return chalk.bgWhite(this); } },

    // 🔠 Styles de texte
    bld: { get() { return chalk.bold(this); } },
    underline: { get() { return chalk.underline(this); } },
    italic: { get() { return chalk.italic(this); } },
    strikethrough: { get() { return chalk.strikethrough(this); } },

    // 🎨 Couleurs personnalisées
    colorHex: {
        value(color: `#${string}`) {
            return chalk.hex(color)(this);
        },
    },
    colorRGB: {
        value(color: [number, number, number]) {
            return chalk.rgb(color[0], color[1], color[2])(this);
        },
    },
});


export const CountryDataSchema = z.object({

    /**
     * The name of the country.
     */
    name: z.object({
        /**
         * The common name of the country.
         */
        common: z.string(),

        /**
         * The official name of the country.
         */
        official: z.string(),
    }),

    /**
     * Thje array of the country's capital.
     */
    capital: z.array(z.string()).optional(),

    /**
     * The primary continent of the country.
     */
    region: z.string(),

    /**
     * The population of the country.
     */
    population: z.number(),

    /**
     * The area of the country in square kilometers.
     */
    area: z.number(),

    /**
     * The alpha-3 code is a three-letter country code defined in ISO 3166-1 (e.g. FRA for France, USA for United States, etc.).
     */
    fifa: z.string().optional(),

    /**
     * Translations of the country's name in different languages.
     */
    translations: z.object({
        ara: z.object({common:z.string(), official:z.string()}).optional(),
        bre: z.object({common:z.string(), official:z.string()}).optional(),
        ces: z.object({common:z.string(), official:z.string()}).optional(),
        cym: z.object({common:z.string(), official:z.string()}).optional(),
        deu: z.object({common:z.string(), official:z.string()}).optional(),
        est: z.object({common:z.string(), official:z.string()}).optional(),
        fin: z.object({common:z.string(), official:z.string()}).optional(),
        fra: z.object({common:z.string(), official:z.string()}).optional(),
        hrv: z.object({common:z.string(), official:z.string()}).optional(),
        hun: z.object({common:z.string(), official:z.string()}).optional(),
        ita: z.object({common:z.string(), official:z.string()}).optional(),
        jpn: z.object({common:z.string(), official:z.string()}).optional(),
        kor: z.object({common:z.string(), official:z.string()}).optional(),
        nld: z.object({common:z.string(), official:z.string()}).optional(),
        per: z.object({common:z.string(), official:z.string()}).optional(),
        pol: z.object({common:z.string(), official:z.string()}).optional(),
        por: z.object({common:z.string(), official:z.string()}).optional(),
        rus: z.object({common:z.string(), official:z.string()}).optional(),
        slk: z.object({common:z.string(), official:z.string()}).optional(),
        spa: z.object({common:z.string(), official:z.string()}).optional(),
        srp: z.object({common:z.string(), official:z.string()}).optional(),
        swe: z.object({common:z.string(), official:z.string()}).optional(),
        tur: z.object({common:z.string(), official:z.string()}).optional(),
        urd: z.object({common:z.string(), official:z.string()}).optional(),
        zho: z.object({common:z.string(), official:z.string()}).optional(),
    })
})

export const CountrysDataSchema = z.array(CountryDataSchema);




export const randomSelect = <T, N extends number>(
    array: T[],
    count: N,
    filterFn?: (item: T) => boolean
): N extends 1 ? T : T[] | undefined => {
    const filteredArray = filterFn ? array.filter(filterFn) : array;
    
    if (filteredArray.length === 0) return undefined as any;

    if (count >= filteredArray.length) 
        return (count === 1 ? filteredArray[0] : [...filteredArray]) as any;

    const shuffled = filteredArray.sort(() => Math.random() - 0.5).slice(0, count);
    
    return (count === 1 ? shuffled[0] : shuffled) as any;
};


export function shuffleArray<T>(array: T[]): T[] {
    // Créer une copie de l'array d'origine pour éviter de modifier l'entrée
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        // Générer un index aléatoire
        const randomIndex = Math.floor(Math.random() * (i + 1));

        // Échanger les éléments
        [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
    }

    return shuffledArray;
}

function cleanTextForPrint(text: string): string {
    // Expression régulière pour capturer les codes de couleurs ANSI
    const ansiRegex = /\x1b\[[0-9;]*m/g;
    // Supprimer les codes de couleurs ANSI
    return text.replace(ansiRegex, '');
}

export function alignText(left: string, right: string): string {
    // Nettoyer les textes pour retirer les caractères de couleur
    const cleanedLeft = cleanTextForPrint(left);
    const cleanedRight = cleanTextForPrint(right);

    // Calculer la largeur des deux textes
    const leftLength = cleanedLeft.length;
    const rightLength = cleanedRight.length;

    // Espaces à ajouter entre les deux textes pour les aligner
    const spacesToAdd = Math.max(0, (process.stdout.columns || 80) - (leftLength + rightLength));

    // Créer la ligne finale
    return `${left}${' '.repeat(spacesToAdd)}${right}\n`;
}