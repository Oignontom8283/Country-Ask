import inquirer from "inquirer";
import { QuestionMapper, QuestionType, randomSelect, shuffleArray, stringToNumber } from "./utils";
import autocomplete from 'inquirer-autocomplete-standalone';


const answers:QuestionMapper[] = [
    {
        type: QuestionType.CountryCapital,
        execute: (async ({continent, inputType, countrys, rawCountrys: rawCountry}) => {

            // Define the good answer
            const good_answer = randomSelect(countrys.filter(item => item.capital && item.capital![0]), 1);

            // We ask the user to enter the answer
            const capital:string = await (async () => {
                // If the inputType is select, we will display a list of possible answers
                if (inputType === "select") {
                    const others_answers = randomSelect(countrys, 4, item => item !== good_answer && item.capital! && item.capital.length > 0);

                    return (await inquirer.prompt([{
                        type: "list",
                        name: "capital",
                        message: `What is the capital of ${good_answer.translations.fra?.common || good_answer.name.common}?`,
                        choices: shuffleArray([
                            ...others_answers!.map(item => ({value: item.capital![0], name: item.capital![0]})),
                            {value: good_answer.capital![0], name: good_answer.capital![0]}
                        ])
                    }])).capital
                }
                // If the inputType is helper, we will display a list of all possible answers
                else if (inputType === "helper") {

                    const capitals = rawCountry
                        .filter(item => item.capital && item.capital[0])
                        .map(item => ({value: item.capital![0]}))
                        .sort((a, b) => a.value.localeCompare(b.value))

                    return await autocomplete({
                        message: `What is the capital of ${good_answer.translations.fra?.common || good_answer.name.common}?`,
                        source: async (input) => {
                            return capitals.filter(item => item.value.toLocaleLowerCase().includes(input?.toLowerCase().trim() || ""))
                        }
                    })
                }
                // If the inputType is input, we will ask the user to enter the answer
                else {
                    return (await inquirer.prompt([{
                        type: "input",
                        name: "capital",
                        message: `What is the capital of ${good_answer.translations.fra?.common || good_answer.name.common}?`
                    }])).capital
                }
            })()
            
            // We compare the answer with the good answer
            const isGoodAnswer = capital.toLowerCase().trim() === good_answer.capital![0].toLocaleLowerCase().trim();

            // Return the result
            return isGoodAnswer ? {
                successful: true,
                score: 100,
            } : {
                successful: false,
                good_answer: good_answer.capital![0],
                score: 0
            }

        })
    },
    {
        type: QuestionType.CountryPeople,
        execute: async ({continent, inputType, countrys, rawCountrys: rawCountry}) => {
            // Define the good answer
            const good_answer = randomSelect(countrys, 1);

            const userInput:number = await (async () => {
                // If the inputType is select, we will display a list of possible answers
                if (inputType === "select") {
                    const others_answers = randomSelect(countrys, 4);

                    return (await inquirer.prompt([{
                        type: "list",
                        name: "userInput",
                        message: `Combien y a t'il de personne en ${good_answer.translations.fra?.common || good_answer.name.common}?`,
                        choices: shuffleArray([
                            ...others_answers!.map(item => ({value: item.population, name: item.population.toLocaleString("fr-FR")})),
                            {value: good_answer.population, name: good_answer.population.toString()}
                        ])
                    }])).userInput
                }
                // If the inputType is helper, we will display a list of all possible answers
                else if (inputType === "helper") {

                    const countries = rawCountry
                        .map(item => ({value: item.population, name:item.population.toLocaleString("fr-FR")}))
                        .sort((a, b) => b.value - a.value)

                    return await autocomplete({
                        message: `Combien y a t'il de personne en ${good_answer.translations.fra?.common || good_answer.name.common}?`,
                        source: async (input) => {
                            const entrie = input?.trim() || ''
                            return countries.filter(item => item.value.toString().includes(entrie) || item.name.includes(entrie))
                        }
                    })
                }
                // If the inputType is input, we will ask the user to enter the answer
                else {
                    return stringToNumber((await inquirer.prompt([{
                        type: "input",
                        name: "userInput",
                        message: `Combien y a t'il de personne en ${good_answer.translations.fra?.common || good_answer.name.common}?`,
                        validate: (input) => stringToNumber(input) ? true : "Veuillez entrer un nombre valide.",
                    }])).userInput)
                }
            })()

            // We compare the answer with the good answer
            const isGoodAnswer = Math.abs(userInput - good_answer.population) <= Math.abs(userInput * 0.1)

            // Return the result
            return isGoodAnswer ? {
                successful: true,
                score: 100,
            } : {
                successful: false,
                good_answer: good_answer.population.toLocaleString("fr-FR"),
                score: 0
            }
        }
    }
]

export default answers;