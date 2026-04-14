const BASE_URL = "http://localhost:4000";

export const fetchData = async () => {
  const res = await fetch(`${BASE_URL}/data`);
  return res.json();
};

export const insertData = async (data) => {
  const res = await fetch(`${BASE_URL}/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return res.json();
};