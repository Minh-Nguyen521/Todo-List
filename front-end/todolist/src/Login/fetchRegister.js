import config from "../Config/Config";

const fetchLogin = async ({ Username, Password }) => {
  const response = await fetch(`http://${config.IP}${config.Port}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Username, Password }),
  });

  if (!response.ok) {
    throw new Error("Failed to Register");
  }

  return response.json();
};

export default fetchLogin;
