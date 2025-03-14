import inquirer from "inquirer";
import { allQuestionType, Continent, QuestionType, sleep, cursor, CountryDataSchema, CountrysDataSchema, InputType, QuestionMapper, alignText, shuffleArray, randomSelect, Answer } from "./utils";
import axios from "axios";
import questionsMapper from "./questions";


(async () => {
    const { typeSelected } = await inquirer.prompt([
        {
            type: "checkbox",
            name: "typeSelected",
            message: "Type de question?",
            choices: [
                {name: "Nombre d'habitants", value: QuestionType.CountryPeople},
                {name: "Capitale",           value: QuestionType.CountryCapital},
                {name: "Continent",          value: QuestionType.CountryContinent},
            ],
            default: allQuestionType,
            validate: (input) => input.length > 0 ? true : "Vous devez choisir au moins un type de question."
        }
        
    ])

    console.log("");

    const { continentSelected } = await inquirer.prompt([
        {
            type: "checkbox",
            name: "continentSelected",
            message: "Pays de quel continent?",
            choices: [
                {name: "Antarctique", value: Continent.Antarctic},
                {name: "Amériques",   value: Continent.Americas},
                {name: "Europe",      value: Continent.Europe},
                {name: "Afrique",     value: Continent.Africa},
                {name: "Asie",        value: Continent.Asia},
                {name: "Océanie",     value: Continent.Oceania},
            ],
            default: Object.values(Continent),
            validate: (input) => input.length > 0 ? true : "Vous devez choisir au moins un continent."
        }
    ])

    console.log("");

    const { inputType } = await inquirer.prompt([
        {
            type: "list",
            name: "inputType",
            message: "Difficulty?",
            choices: [
                {name: "Easy (selector)", value: InputType.Select},
                {name: "Normal (Auto-completion)", value: InputType.Helper},
                {name: "Hard (aucune aide)", value: InputType.Input}
            ]
        }
    ])

    console.log("");

    const { numberOfQuestions } = await inquirer.prompt([
        {
            type: "number",
            name: "numberOfQuestions",
            message: "Nombre de questions?",
            default: 10,
            max: 1000,
            min: 1
        }
    ])

    console.log("")

    
    const loadingFormater = (text:string, end?:string) => {
        return `\rLoading ${'['.white.bld}${text}${']'.white.bld} ${end ? end : ""}`
    }
    
    // Start loading display
    const startTime = new Date().getTime()
    cursor.off()

    let sequane = 3
    let intervalID = setInterval(() => {
        // process.stdout.write(`\rLoading ${'['.white.bld}${'.'.repeat(sequane).blue.bld}${' '.repeat(3 - sequane).white.bld}]`)
        process.stdout.write(loadingFormater('.'.repeat(sequane).blue.bld + ' '.repeat(3 - sequane)))
        sequane = sequane === 3 ? 1 : sequane + 1
    }, 500)

    
    /**
     * Function to stop the loading display
     */
    const stopLoading = (statu:"success" | "error") => {
        
        const text:{head:string, end?:string} = statu === "success" 
        ? {head:`OK`.green.bld, end:`in ${(new Date().getTime() - startTime).toLocaleString("en-US")} ms`.gray + '\n\n'}
        : {head:`ERROR`.red.bld, end:"\n\n"}
        
        // Stop loading display
        clearInterval(intervalID)

        // Display the result
        process.stdout.write(loadingFormater(text.head, text.end));

        cursor.on()
    }

    /**
     * Function to display the error message
     */
    const loadErrorMessage = (error:any) => `Une erreur l'ors du chargement des données est survenue.`.red + `\n ${error}`.gray

    /**
     * Function to display the stade of the loading
     */
    const displayStade = (stade:string | number, total:string | number) => `${'['.white.bld}${stade.toString().yellow}${'/'.gray}${total.toString().blue}${']'.white.bld}`
    
    
    const fetchedCountries = await axios.get("https://restcountries.com/v3.1/all")
        .then((response) => {

            const parse = CountrysDataSchema.safeParse(response.data)

            if (!parse.success) {
                stopLoading("error")
                console.error(loadErrorMessage(parse.error))
                process.exit(1)
            }

            stopLoading("success")

            return parse.data
        }).catch((error:any) => {
            stopLoading("error")

            console.error(loadErrorMessage(error.message))
            process.exit(1)
        });

    const rawCountrys = fetchedCountries
    const countrys = fetchedCountries.filter(item => continentSelected.includes(item.region))

    
    const questionsHandlers = questionsMapper.filter(question => typeSelected.includes(question.type))

    let answers:Answer[] = []
    for (let i = 1; i <= numberOfQuestions; i++) {

        const question = randomSelect(questionsHandlers, 1)!;

        const answer = await question.execute({continent: continentSelected, inputType: inputType, countrys: countrys, rawCountrys:rawCountrys})

        console.log("");
        answers.push(answer)

        if (answer.successful) {
            console.log(
                alignText(`Question n°${i} réussie !`.colorRGB([0, 255, 0]).bld, displayStade(i, numberOfQuestions)),
                "Points gagnés :".white, answer.score.toString().blue.bld,
                "\n\n",
            )
        } else {
            console.log(
                alignText(`Question n°${i} échouée !`.colorRGB([255, 0, 0]).bld, displayStade(i, numberOfQuestions)),
                "Bonne réponse :".white, answer.good_answer.blue.bld,
                "\n\n",
            )
        }
    }

    const suAnswers = answers.filter(item => item.successful).length
    const suAnswersString = answers.filter(item => item.successful).length.toString()

    console.log(
        `${'_'.repeat(process.stdout.columns || 80)}`.gray.underline,
        "\n",
        "\n   ", "Fin du jeu !".green.underline.bld,
        "\n",
        `\nTotal des points   :`.white, answers.reduce((acc, item) => acc + item.score, 0).toString().yellow,
        "\nRéponses correctes :".white, (suAnswers > numberOfQuestions / 2 ? suAnswersString.green.bld : suAnswersString.red.bld) + '/'.gray + numberOfQuestions.toString().blue,
    );
    
})()
