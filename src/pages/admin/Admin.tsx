import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/Context";
import { Student } from "../../declarations/mw3_backend/mw3_backend.did";
import { formatDate } from "../../utils/time";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tippy from "@tippyjs/react";

const Admin = () => {
  const { backendActor } = useAuth();
  const [students, setStudents] = useState<Student[] | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getStudents();
  }, [backendActor]);

  const getStudents = async () => {
    try {
      let students = await backendActor.getUsers();
      setStudents(students);
    } catch (error) {}
  };

  function truncateText(text: string): string {
    if (text.length > 20) {
      return `${text.substring(0, 10)}...${text.substring(text.length - 10)}`;
    } else {
      return text;
    }
  }

  const handleBackupUsers = async () => {
    const users = await backendActor.getUsers();

    const usersWithBigIntAsString = users.map((user: Student) => {
      const _homeworks = user.submissions.map((homework) => {
        return {
          ...homework,
          number: homework.number.toString(),
          timestamp: homework.timestamp.toString(),
        };
      });
      return {
        ...user,
        created: user.created.toString(),
        score: user.score.toString(),
        submissions: _homeworks,
      };
    });

    console.log(usersWithBigIntAsString)

    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(usersWithBigIntAsString));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "users.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <section className="container mx-auto px-3  font-mono">
      <div className="">
        <button
          onClick={handleBackupUsers}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Download JSON
        </button>
      </div>
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Institution</th>
                <th className="px-4 py-3">Github</th>
                <th className="px-4 py-3">Subs</th>
                <th className="px-4 py-3">Date Registered</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {students?.map((student, index) => (
                <tr className="text-gray-700">
                  <td className="px-4 py-3 border">
                    <div className=" items-center text-sm">
                      <div>
                        <p className="font-semibold text-black">
                          {student.firstName} {student.lastName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ms border">
                    {/* <Tippy
                        hideOnClick={false}
                        content={
                          copied ? <span>copied</span> : <span>copy</span>
                        }
                      >
                    <CopyToClipboard
                      text={student.email}
                      onCopy={() => setCopied(true)}
                    >
                    <span> {truncateText(student.email)}</span> 
                    </CopyToClipboard>
                    </Tippy> */}
                  </td>
                  <td className="px-4 py-3 text-xs border">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                      {truncateText(student.institution)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm border">
                    <a
                      href={student.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500"
                    >
                      {truncateText(student.github)}
                    </a>
                  </td>
                  <td className="px-4 py-3 font-semibold text-sm border">
                    {student.submissions.length}
                  </td>
                  <td className="px-4 py-3 text-sm border">
                    {formatDate(Number(student.created))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Admin;
