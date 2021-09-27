import { logError, logInfo } from '../EventUtils';

export const handleResponse = (url: string, response: any): Promise<any> => {
  return response.json().then((json: any) => {
    if (!response.ok) {
      logError(
        'handleResponse:success',
        'WebClientUtils',
        { url },
        {
          status: response.status,
          statusText: response.statusText,
        }
      );
      throw {
        data: json,
        status: response.status,
        statusText: response.statusText,
      };
    }
    logInfo('handleResponse:success', 'WebClientUtils', { url });
    return json;
  });
};

export const makeGetRequest = async (url: string): Promise<any> => {
  logInfo('makeGetRequest:pending', 'WebClientUtils', { url });
  return fetch(url, {}).then((response) => handleResponse(url, response));
};

export const makePostRequest = async (url: string, form: any): Promise<any> => {
  logInfo('makePostRequest:pending', 'WebClientUtils', { url });
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  }).then((response) => handleResponse(url, response));
};
