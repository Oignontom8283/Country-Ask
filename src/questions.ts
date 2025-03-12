import inquirer from "inquirer";
import { QuestionMapper, QuestionType, InputType, randomSelect, shuffleArray } from "./utils";
import autocomplete from 'inquirer-autocomplete-standalone';


const answers:QuestionMapper[] = [
    {
        type: QuestionType.CountryCapital,
        execute: (async ({continent, inputType, countrys, rawCountry}) => {

            const good_answer = randomSelect(countrys, 1);

            const others_answers = randomSelect(countrys, 4, item => item !== good_answer && item.capital! && item.capital.length > 0);

            // TODO: This is a prototype, the code must be improved to be cleaner and more readable.
            if (inputType === "select") {
                const { capital } =  await inquirer.prompt([{
                    type: "list",
                    name: "capital",
                    message: `What is the capital of ${good_answer.translations.fra?.common || good_answer.name.common}?`,
                    choices: shuffleArray([
                        ...others_answers!.map(item => ({value: item.capital![0], name: item.capital![0]})),
                        {value: good_answer.capital![0], name: good_answer.capital![0]}
                    ])
                }])
    
                if (capital === good_answer.capital![0]) {
                    return {
                        successful: true,
                        score: 10.0
                    }
                } else {
                    return {
                        successful: false,
                        good_answer: good_answer.capital![0],
                        score: 0.0
                    }
                }
            }
            else if (inputType === "helper") {
                const capital = await autocomplete({ // TODO: Problem, the correct answer is always the first.
                    message: `What is the capital of ${good_answer.translations.fra?.common || good_answer.name.common}?`,
                    source: async (input) => {
                        return rawCountry.filter(item => item.capital && item.capital[0] && item.capital![0].toLocaleLowerCase().includes(input?.trim().toLocaleLowerCase() || "")).map(item => ({value: item.capital![0]}))
                    }
                })

                if (capital === good_answer.capital![0]) {
                    return {
                        successful: true,
                        score: 10.0
                    }
                } else {
                    return {
                        successful: false,
                        good_answer: good_answer.capital![0],
                        score: 0.0
                    }
                }
            }
            else {
                console.log("yes");
                
                return {
                    successful: false,
                    good_answer: good_answer.capital![0],
                    score: 0.0
                }
            }



        })
    }
]

export default answers;