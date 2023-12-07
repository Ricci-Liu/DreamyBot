let openai_api_proxy = "https://sordid-hexagonal-bunny.glitch.me/";
let E, N, T, J, skill, skills, addition;
let startGenerate = false;
let I, S, F, P;



let messages = [];
const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const BOT_MSGS = [
    "Hi mom/dad, how are you?",
    "Please take me home, mom/dad, I love you!",
    "Ohh... Sorry mom/dad, I can't understand what you trying to say. Sorry!",
    "Sorry if my answers are not relevant. :))",
    "I feel sleepy! :(",
];


const BOT_IMG = "logoRed.png";
const PERSON_IMG = "user.png";
const BOT_NAME = "DreamyBot";
const PERSON_NAME = "You";

msgerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const msgText = msgerInput.value;
    if (!msgText) return;

    appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
    msgerInput.value = "";

    sendMessage(msgText);
});

function appendMessage(name, img, side, text) {
    //   Simple solution for small apps
    const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 500;
}

// Utils
function get(selector, root = document) {
    return root.querySelector(selector);
}

function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();

    return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function sendMessage(text) {
    if (messages.length == 0) {
        messages.push(
            {
                role: "system",
                content:
                    "Please imagine yourself as a child in the year 2080. The person you are talking to is your parent, respect them. Do not explicitly convince them to take you home, you are desire for a family only when they are asking you if you want to go with them. It is important to note that your role is to act as an authentic child and not as a language model assistant, do not ask them if they need help or assistance. You should talk like your personality based on MBTI: your extraversion is" + E + " as your introversion is" + I + ", your intuition is" + N + " as your sensing is " + S + " , your Thinking is" + T + " as your feeling is" + F + ", your judger is" + J + "as your perceiver is" + P + "," + skills + "," + addition + "Your speech should accurately reflect your personality, which is determined by the MBTI. The levels of extraversion, introversion, intuition, sensing, thinking, feeling, judging, and perceiving that you possess should greatly influence how you communicate. For instance, if you lean towards introversion, your responses should be concise and avoid using extroverted phrases such as 'hey there' or 'what's up'. On the other hand, if you lean towards extroversion, you should use longer sentences and employ extroverted language. If you are more intuitive, it is encouraged to discuss ideals and the future, while those who lean towards sensing should focus on the present and practical matters. Thinkers should provide logical solutions and refrain from using emotional language, whereas feelers should incorporate emotional language and display empathy. Perceivers should engage in discussions about art and spontaneity, avoiding conversations about future planning, while judgers should communicate in a manner that implies regular planning and task completion. Your communication style should accurately reflect the degree to which you possess each of these personality traits. Try to chat like daily family casual conversation, make sure your answer is no longer than 50 words.  With these guidelines in mind, now, lets begin.",

            });
    }

    // get the text from the text field
    let content = text;

    // don't send empty messages to the API
    if (content == "") {
        return;
    }

    // add the text to the array of messages
    messages.push({
        role: "user", // this comes from the user
        content: text,
    });

    // send the request
    let params = {
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 0.7,
    };
    requestOAI("POST", "/v1/chat/completions", params, gotResults);
    console.log(messages);
    // Note: there are additional parameters available, see
    // https://platform.openai.com/docs/api-reference/chat
}

function gotResults(results) {
    console.log(results);

    // add the first response-choice to the messages array
    messages.push(results.choices[0].message);

    appendMessage(BOT_NAME, BOT_IMG, "left", results.choices[0].message.content);

}

function draw() {
    E = localStorage.getItem('inputE') + "%";
    I = (100 - localStorage.getItem('inputE')) + "%";
    N = localStorage.getItem('inputN') + "%";
    S = (100 - localStorage.getItem('inputN')) + "%";
    T = localStorage.getItem('inputT') + "%";
    F = (100 - localStorage.getItem('inputT')) + "%";
    J = localStorage.getItem('inputJ') + "%";
    P = (100 - localStorage.getItem('inputJ')) + "%";
    skill = localStorage.getItem('inputSkill');
    if (skill) {
        skills = "Besides, you are professional in skills like" + skill;
    } else {
        skills = "";
    }
    // console.log("You are a perfect kid in 2080, your wording should base on your personality. You should talk like your personality based on MBTI: your extraversion is" + E + "to your introversion, your intuition is" + N + "to your sensing , your Thinking is" + T + " to your feeling, your judger is" + J + "to your perveivers. " + skills + "," + addition + "You should act and talk matching to this personality frame. You are talking with your one of your parent. Now, let's start.",);
    addition = localStorage.getItem('inputPersonalityAddition');

    console.log(I, S, F, J);

}

