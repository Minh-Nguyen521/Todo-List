import React from "react";
import ShowTasks from "./ShowTasks";

function MainContent() {
  return (
    <main className="flex-grow p-8">
      <div className="bg-white rounded-lg shadow p-8 text-center">
        {/* Task List */}
        <ShowTasks />
      </div>
    </main>
  );
}

export default MainContent;
