import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/Context";
import { Student } from "../../../declarations/mw3_backend/mw3_backend.did";
import { toast } from "react-toastify";

const Profile = () => {
  const { backendActor, identity } = useAuth();
  const [student, setStudent] = useState<Student | null>(null);
  const [firstName, setFirstname] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [institution, setInstitution] = useState<string>("");
  const [githubLink, setGithubLink] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    if (backendActor && identity) {
      getUser();
    }
  }, [backendActor, identity]);

  const getUser = async () => {
    try {
      const user = await backendActor.getMyProfile();
      if ("ok" in user) {
        setStudent(user.ok);
        setFirstname(user.ok.firstName);
        setLastName(user.ok.lastName);
        setEmail(user.ok.email);
        setInstitution(user.ok.institution);
        setGithubLink(user.ok.github);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    if (backendActor) {
      try {
        let user: Student = {
          ...student,
          firstName: firstName,
          lastName: lastName,
          email: email,
          github: githubLink,
          institution: institution,
        };
        await backendActor.addUser(user);
        toast.success("Profile updated!", {
          autoClose: 5000,
          position: "top-center",
          hideProgressBar: true,
        });
        setLoading(false);
      } catch (error) {
        console.log("An error occurred on registering", error);
        setLoading(false);
      }
    }
  };
  return (
    <div className="">
      <div className="mt-4">
        <div className="flex items-center">
          <h2 className="text-lg font-bold">Profile Information</h2>
        </div>
        <div className="mt-5">
          <h2 className="font-bold text-gray-700">Principal Id</h2>

          <span
            className="text-gray-600"
            style={{ fontSize: "0.8rem", wordBreak: "break-all" }}
          >
            {student?.principal}
          </span>
        </div>
        <div className="mt-5 items-center h-screen">
          <div className=" px-5 md:px-0">
            <div className="mb-4">
              <label
                className="block text-gray-700  font-bold mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
                disabled={!edit}
                placeholder="Username"
              />
              {firstName.length < 1 && (
                <span className="text-red-600">First Name is required</span>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700  font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={!edit}
                placeholder="Last Name"
              />
              {lastName.length < 1 && (
                <span className="text-red-600">Last Name is required</span>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700  font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!edit}
                placeholder="Email"
              />
              {email.length < 1 && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="institution"
              >
                <span>Institution/Organization</span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="institution"
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                disabled={!edit}
                placeholder="Institution"
              />
              {institution.length < 1 && (
                <span className="text-red-600">Institution is required</span>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700  font-bold mb-2"
                htmlFor="github"
              >
                Github Profile Link
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="github"
                type="text"
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
                disabled={!edit}
                placeholder="e.g - https://github.com/username"
              />
              {githubLink.length < 1 && (
                <span className="text-red-600">Github link is required</span>
              )}
            </div>
            <div className="flex items-center  gap-2">
              <button
                onClick={() => setEdit(!edit)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {edit ? "Cancel" : "Edit"}
              </button>
              {edit && (
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
