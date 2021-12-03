import { LAST_CHARACTER_ID, LAST_QUOTES_ID} from "../constants";
import { randomNumbers } from "./utilites";

const askedQuestions = [];

const generateQuestion = async (type) => {
  if(type === "People")
    return await generatePeopleQuestion();
  if(type === "Quote")
    return await generateQuoteQuestion();
}

const generateQuoteQuestion = async () => {
  const firstIndex = 1;
  const numberOfAnswers = 4;
  const [correctAnswerId] = randomNumbers(firstIndex, LAST_QUOTES_ID, 1);
}

const generatePeopleQuestion = async () => {
  const firstIndex = 1;
  const numberOfAnswers = 4;
  let randomIds;
  let correctAnswerId;
  do {
    randomIds = randomNumbers(firstIndex, LAST_CHARACTER_ID, numberOfAnswers);
    correctAnswerId = randomId(randomIds);
  }
  while(askedQuestions.includes(correctAnswerId));
  askedQuestions.push(correctAnswerId);
  const allCharactersData = await getCharactersData();
  const questionCharactesData = allCharactersData.filter(({char_id}) => randomIds.includes(char_id));

  const question = {
    rightAnswer: '',
    answers: [],
    images: '',
  };

  questionCharactesData.forEach((character) => {
    if(character.char_id === correctAnswerId) {
      question.rightAnswer = character.name;
      question.images = character.img;
    }
    question.answers.push(character.name);
  });
  return question;
}

const randomId = (idArray) => {
  const correctIdIndex = Math.floor(Math.random() * idArray.length);
  return idArray[correctIdIndex];
}

const getCharactersData = async () => {
  let response = await fetch(`https://breakingbadapi.com/api/characters`);
  let data = await response.json();
  return data;
}

export default generateQuestion;
