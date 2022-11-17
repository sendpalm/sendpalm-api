import { requestWrapper } from "./request-wrapper";

const base_url = "https://api.sendpalm.com/api/";

export default class Email {
  constructor(token = "") {
    this.token = token;
  }
  verify(address) {
    return requestWrapper(base_url + "check_email", this.token, {
      toEmail: address,
    });
  }
  verifyWithParams(params) {
    return requestWrapper(base_url + "check_email", this.token, params);
  }
  verifyWithWebhook(params) {
    return requestWrapper(base_url + "check_email_with_webhook", this.token, params);
  }
  send(fromEmail, toEmail, subject, content, templateParams) {
    return requestWrapper(base_url + "send_email", this.token, {
      fromEmail: fromEmail,
      toEmail: toEmail,
      subject: subject,
      content: content,
      templateParams: templateParams,
    });
  }
  sendWithParams(params) {
    return requestWrapper(base_url + "send_email", this.token, params);
  }
  sendCampaign(fromEmail, toEmail, subject, campaignId, templateParams) {
    return requestWrapper(base_url + "send_campaign", this.token, {
      fromEmail: fromEmail,
      toEmail: toEmail,
      subject: subject,
      campaignId: campaignId,
      templateParams: templateParams,
    });
  }
  sendCampaignWithParams(params) {
    return requestWrapper(base_url + "send_campaign", this.token, params);
  }
  newAudienceWithParams(params) {
    return requestWrapper(base_url + "newAudience", this.token, params);
  }
  findWithDomain(params) {
    return requestWrapper(base_url + "find_mail_with_domain", this.token, params);
  }
  findWithName(params) {
    return requestWrapper(base_url + "find_mail_with_name", this.token, params);
  }
}
