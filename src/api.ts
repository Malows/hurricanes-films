export const apiRequest = (KEY: string) =>
  (URI: string) =>
    (params: object) => {
      const url = new URL(`https://api.themoviedb.org/3/${URI}`);

      url.searchParams.append("language", "es-ES");
      url.searchParams.append("api_key", KEY);

      Object.entries(params)
        .forEach(([key, value]) => {
          url.searchParams.append(key, value);
        });

      return fetch(url.toString())
        .then((res) => res.json());
  };
