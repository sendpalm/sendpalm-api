import request from "request";

export const requestWrapper = (url, token, body) => {
    const options = {
        method: "POST",
        url: url,
        headers: {
            "content-type": "application/json",
            authorization: token,
        },
        body: body,
        json: true,
    }
    return new Promise(function (resolve, reject) {
        request(options, (error, response, body) => {
            if (error) {
                reject(new Error(error));
            }
            resolve(body);
        });
    });
};