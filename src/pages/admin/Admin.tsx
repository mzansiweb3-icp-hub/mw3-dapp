import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/Context";
import { Student } from "../../declarations/mw3_backend/mw3_backend.did";
import { formatDate } from "../../utils/time";

const Admin = () => {
  const { backendActor } = useAuth();
  const [students, setStudents] = useState<Student[] | null>(null);

  useEffect(() => {
    getStudents();
  }, [backendActor]);

  const getStudents = async () => {
    try {
      let students = await backendActor.getUsers();
      setStudents(students);
      console.log(students);
    } catch (error) {}
  };

  function truncateText(text: string): string {
    if (text.length > 20) {
      return `${text.substring(0, 10)}...${text.substring(text.length - 10)}`;
    } else {
      return text;
    }
  }
  
  return (
    <section className="container mx-auto px-3  font-mono">
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
                          {student.username}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ms border">
                    {truncateText(student.email)}
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
