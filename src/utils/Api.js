const baseUrl = "http://localhost:3001";

function fetchJson(url, options) {
  return fetch(url, options).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  );
}

function getItems() {
  return fetchJson(`${baseUrl}/items`);
}

function addItems({ name, weather, imageUrl }) {
  return fetchJson(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ name, weather, link: imageUrl }),
  });
}

function deleteItems(itemId) {
  return fetchJson(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  });
}

export { getItems, addItems, deleteItems };
