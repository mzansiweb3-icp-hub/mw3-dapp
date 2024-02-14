import { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/Context";
import { Student } from "../../../../declarations/mw3_backend/mw3_backend.did";
import { IoMdCheckmark } from "react-icons/io";
import { IoMdSquareOutline } from "react-icons/io";
import { set } from "zod";

const homeworks = [1, 2, 3, 4, 5, 6];

const Progress = () => {
  const { backendActor, submitted, setSubmitted } = useAuth();
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    if (backendActor) {
      getInfo();
    }
    if (submitted) {
      getInfo();
    }
  }, [backendActor, submitted]);

  const getInfo = async () => {
    try {
      const user = await backendActor.getMyProfile();
      console.log(user, "user");
      if ("ok" in user) {
        setStudent(user.ok);
        setSubmitted(false);
      }
    } catch (error) {
      console.log("Error", error);
      setSubmitted(false);
    }
  };

  const isSubmitted = (homeworkNumber: number) => {
    return student?.submissions.some(
      (submission) => Number(submission.number) === homeworkNumber
    );
  };

  return (
    <div className="px-10">
      <h1 className="text-xl  font-semibold">Progress</h1>
      {homeworks.map((homework) => {
        const submitted = isSubmitted(homework);

        return (
          <div
            className={`${
              submitted ? "text-gray-800" : "text-gray-400"
            } flex items-center py-3 justify-between`}
            key={homework}
          >
            <div className="flex items-center">
              {submitted ? (
                <IoMdCheckmark className="text-2xl" />
              ) : (
                <IoMdSquareOutline className="text-2xl" />
              )}
              <p className="ml-2">Homework {homework}</p>
            </div>
            <p>{submitted ? "Completed" : "pending"}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Progress;
