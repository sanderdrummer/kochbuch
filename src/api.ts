export const API_URL_KEY = "recipe-api-url";
const getApiUrl = (): string => {
  return localStorage.getItem(API_URL_KEY) || "";
};
export async function post<T = any>(endpoint: string, params: any): Promise<T> {
  const options: RequestInit = {
    mode: "cors",
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(`${getApiUrl()}${endpoint}`, options).then(async (res) =>
    res.json()
  );
}

export async function get<T = any>(endpoint: string): Promise<T> {
  const options: RequestInit = {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(`${getApiUrl()}${endpoint}`, options).then(async (res) => {
    return res.json();
  });
}
