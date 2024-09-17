import config from "../Config/Config";
import getCookie from "../cookie/getCookie";

const fetchNewTask = async (task) => {
  const token = getCookie("token");
  console.log(task);
  const response = await fetch(`http://${config.IP}${config.Port}/task/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });

  const data = await response.json();
  return data;
};

export default fetchNewTask;
