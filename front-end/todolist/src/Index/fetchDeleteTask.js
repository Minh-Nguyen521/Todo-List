import config from "../Config/Config";
import getCookie from "../cookie/getCookie";

const fetchDeleteTask = async (id) => {
  const Token = getCookie("token");
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
