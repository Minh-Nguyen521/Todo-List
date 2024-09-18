import config from "../Config/Config";
import getCookie from "../cookie/getCookie";
async function fetchEditTask(task) {
  const Token = getCookie("token");
  const taskID = task.TaskID;
  const response = await fetch(
    `http://${config.IP}${config.Port}/tasks/edit/${taskID}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Token}`,
      },
      body: JSON.stringify(task),
    }
  );

  const data = await response.json();
  return data;
}
export default fetchEditTask;
