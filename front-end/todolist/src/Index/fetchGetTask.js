import config from "../Config/Config";
import getCookie from "../cookie/getCookie";

const fetchGetTask = async () => {
  const UserID = getCookie("userid");
  const Token = getCookie("token");
  const response = await fetch(
    `http://${config.IP}${config.Port}/tasks/get/${UserID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    }
  );

  const data = await response.json();
  return data.data.task;
};

export default fetchGetTask;
