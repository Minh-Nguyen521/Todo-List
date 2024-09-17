import config from "../Config/Config";

const fetchDeleteTask = async (id) => {
  // const Token = localStorage.getItem("token");
  const response = await fetch(
    `http://${config.IP}${config.Port}/tasks/delete/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Token}`,
      },
    }
  );

  const data = await response.json();
  return data;
};

export default fetchDeleteTask;
