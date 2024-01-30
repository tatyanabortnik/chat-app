const API = `https://dummyjson.com/comments`;

const chatForm = $("#chatForm");
const chatFormBtn = $("#chatFormBtn");
const textMessage = $("#chatForm :input");
const chatMain = $("#chatMain");
const partnerTyping = $("#partnerTyping");
let comments = [];

const scrollToBottom = (el) => el.scrollTop(el[0].scrollHeight); //stackoverflow solution + jq syntax

const getRandomId = (min, max) => Math.floor(Math.random() * (max - min) + min); //mdn

const getTime = () => {
   return new Date().toLocaleString([], {
      year: "2-digit",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
   });
};

const createMessage = (time, sender, text) => {
   return `<div class="message ${sender || ``}">
      <div class="message-block message-block--${sender || ``}">
         <p class="message-block__text" id="messageText">
            ${
               sender
                  ? text
                  : comments[`${getRandomId(1, comments.length)}`].body
            }
         </p>
         <span class="message-block__time"
            >${time}</span
         >
      </div>
   </div>`;
};

const generateAnswer = () => {
   partnerTyping.text("Typing...");

   setTimeout(() => {
      const time = getTime();
      partnerTyping.text("");
      chatMain.append(createMessage(time));
      scrollToBottom(chatMain);
   }, 2000);
};

const sendUserMessage = (e) => {
   e.preventDefault();
   if (textMessage.val()) {
      const sender = `user`;
      const text = textMessage.val();
      const time = getTime();

      chatMain.append(createMessage(time, sender, text));
      chatForm[0].reset();
      scrollToBottom(chatMain);

      generateAnswer();
   }
};

chatFormBtn.on("click", sendUserMessage);

$(document).ready(() => {
   scrollToBottom(chatMain);
});

//get comments
(async () => {
   let phrases = await fetch(API).then((data) => data.json());
   // console.log(phrases.comments);

   comments = phrases.comments;
})();
