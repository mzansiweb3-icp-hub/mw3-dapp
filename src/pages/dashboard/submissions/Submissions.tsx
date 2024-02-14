import React from "react";
import Submit from "./Components/Submit";
import Progress from "./Components/Progress";

const Submissions = () => {
  return (
    <div className="flex w-full">
      <div className="w-2/3 border-r border-gray">
        <Submit />
      </div>

      <div className="w-1/3 ">
        <Progress />
      </div>
    </div>
  );
};

export default Submissions;
