import config from "../Config/Config";

const fetchEditTask = async (task) => {
  // const Token = localStorage.getItem("token");
  //   const taskID = task._id
  const response = await fetch(
    `http://${config.IP}${config.Port}/tasks/edit/${taskID}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        //   authorization: `Bearer ${Token}`,
      },
      body: JSON.stringify(task),
    }
  );

  const data = await response.json();
  return data;
};
