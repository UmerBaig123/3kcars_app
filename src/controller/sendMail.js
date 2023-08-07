const yourSendEmailFunction = (
  firstName,
  lastName,
  phoneNumber,
  carNumber,
  selectedDate,
  selectedTime,
  isMobile,
  toemail,
  tonumber
) => {
  let base64 = require("base-64");
  const username = "****";
const password = "********";

var details = {
  Body: "Name: "+ firstName+ ' '+ lastName+
  "\n Phone Number: "+ phoneNumber+"\n Car Number: "+carNumber+"\n Service Type: "+isMobile.name+
  "\n Branch Type: "+isMobile.mobileBranch? "Mobile Branch" : "non-mobile Branch"+
  "\n Date of Visit: "+selectedDate+"\n Time Slot: "+selectedTime,
  From: "your_Number",
  To: tonumber,
};

var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");
fetch(
  "https://api.twilio.com/2010-04-01/Accounts/******/Messages.json",
  {
    method: "POST",
    headers: {
      Authorization: "Basic " + base64.encode(username + ":" + password),
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formBody,
  }
);
  fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service_id: "****",
      template_id: "***",
      user_id: "****",
      accessToken: "****",
      template_params: {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        car_number: carNumber,
        selectedDate: selectedDate,
        selectedTime: selectedTime,
        to_email: toemail,
        Service: isMobile.name,
        Branch: isMobile.mobileBranch? "Mobile Branch" : "non-mobile Branch"
      },
    }),
  }).then((response) => console.log(response.status));
};

export default yourSendEmailFunction;
