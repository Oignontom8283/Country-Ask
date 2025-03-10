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



export enum AnswerType {
    CountryContinent = "CountryContinent",
    CountryPeople = "CountryPeople",
    CountryCapital = "CountryCapital",
}

export const allQuestionType = Object.values(AnswerType);



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

export type ExecuteReturn = {
    successful: boolean;
    good_answer: string;
    score: number;
    message?: string;
}

export interface AnswersMapper {
    type: AnswerType;
    execute: (context:{continent:Continent[], inputType:InputType[], countrys:z.infer<typeof CountrysDataSchema>}) => Promise<ExecuteReturn> | ExecuteReturn;
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


/**
 * Selects a random element from an array.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The array from which to select a random element.
 * @returns {T} - A randomly selected element from the array.
 */
export const randomSelect = <T>(array:T[]):T => array[Math.floor(Math.random() * array.length)];