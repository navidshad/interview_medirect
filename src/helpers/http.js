function handleResponse(res) {
  if (res.status > 399) throw res;

  return res.json();
}

function getQueryStrings(query) {
  let str = "?";

  Object.keys(query).forEach((key) => {
    str += encodeURI(key) + "=" + encodeURI(query[key]);
    str += "&";
  });

  return str;
}

export function get(url = "", query = {}) {
  const api_key = import.meta.env.VITE_REQUEST_API_KEY;
  const baser_url = import.meta.env.VITE_BASE_API_URL;

  query["api_key"] = api_key;
  url = baser_url + url + getQueryStrings(query);

  return fetch(url).then(handleResponse);
}
