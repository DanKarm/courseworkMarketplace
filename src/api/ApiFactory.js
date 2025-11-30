function createQueryString(params) {
  if (!params) return "";

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    searchParams.append(key, String(value));
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

export function createApi(baseUrl, defaultHeaders = {}) {
  const baseRequest = async (path, options = {}) => {
    const { method = "GET", body, params, headers = {} } = options;

    const url = baseUrl + path + createQueryString(params);

    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...defaultHeaders,
        ...headers,
      },
    };

    if (body !== undefined) {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        const error = new Error("Ошибка при загрузке данных");

        error.status = response.status;
        error.data = data;

        throw error;
      }

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    async get(path, options = {}) {
      return baseRequest(path, { ...options, method: "GET" });
    },
    async post(path, options = {}) {
      return baseRequest(path, { ...options, method: "POST" });
    },
    async put(path, options = {}) {
      return baseRequest(path, { ...options, method: "PUT" });
    },
    async patch(path, options = {}) {
      return baseRequest(path, { ...options, method: "PATCH" });
    },
    async delete(path, options = {}) {
      return baseRequest(path, { ...options, method: "DELETE" });
    },
  };
}
