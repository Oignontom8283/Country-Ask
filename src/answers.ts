import inquirer from "inquirer";
import { AnswersMapper, AnswerType, InputType, randomSelect } from "./utils";

const answers:AnswersMapper[] = [
    {
        type: AnswerType.CountryCapital,
        execute: (({continent, inputType, countrys}) => {

            

            return {
                successful: false,
                good_answer: "Paris",
                score: 1
            }
        })
    }
]

export default answers;