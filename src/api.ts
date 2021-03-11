export async function post<T = any>(endpoint: string, params: any): Promise<T> {
  const options: RequestInit = {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(endpoint, options).then(async (res) => res.json());
}

export async function get<T = any>(endpoint: string): Promise<T> {
  const options: RequestInit = {
    method: "GET",
  };
  return fetch(endpoint, options).then((res) => {
    return res.json();
  });
}
