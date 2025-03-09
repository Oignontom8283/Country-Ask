import { AnswersMapper, AnswerType, InputType } from "./utils";

const answers:AnswersMapper[] = [
    {
        type: AnswerType.CountryCapital,
        execute: (({continent, inputType}) => {

            return {
                successful: false,
                good_answer: "Paris",
                score: 1
            }
        })
    }
]

export default answers;