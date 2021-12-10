import request from "request";

export default class Email {
  constructor(token = "") {
    this.token = token;
  }
  verify(address) {
    const options = {
      method: "POST",
      url: "https://api.sendpalm.com/api/check_email",
      headers: {
        "content-type": "application/json",
        authorization: this.token,
      },
      body: {
        toEmail: address,
      },
      json: true,
    };
    // console.log("options: ", options);
    return new Promise(function (resolve, reject) {
      request(options, (error, response, body) => {
        // if (error) throw new Error(error)
        // console.log(body)
        if (error) {
          reject(new Error(error));
        }
        resolve(body);
      });
    });
  }
  send(fromEmail, toEmail, subject, content, templateParams) {
    const options = {
      method: "POST",
      url: "https://api.sendpalm.com/api/send_email",
      headers: {
        "content-type": "application/json",
        authorization: this.token,
      },
      body: {
        fromEmail: fromEmail,
        toEmail: toEmail,
        subject: subject,
        content: content,
        templateParams: templateParams,
      },
      json: true,
    };
    // console.log("options: ", options);
    return new Promise(function (resolve, reject) {
      request(options, (error, response, body) => {
        // if (error) throw new Error(error)
        // console.log(body)
        if (error) {
          reject(new Error(error));
        }
        resolve(body);
      });
    });
  }
  sendCampaign(fromEmail, toEmail, subject, campaignId, templateParams) {
    const options = {
      method: "POST",
      url: "https://api.sendpalm.com/api/send_campaign",
      headers: {
        "content-type": "application/json",
        authorization: this.token,
      },
      body: {
        fromEmail: fromEmail,
        toEmail: toEmail,
        subject: subject,
        campaignId: campaignId,
        templateParams: templateParams,
      },
      json: true,
    };
    // console.log("options: ", options);
    return new Promise(function (resolve, reject) {
      request(options, (error, response, body) => {
        // if (error) throw new Error(error)
        // console.log(body)
        if (error) {
          reject(new Error(error));
        }
        resolve(body);
      });
    });
  }
}
