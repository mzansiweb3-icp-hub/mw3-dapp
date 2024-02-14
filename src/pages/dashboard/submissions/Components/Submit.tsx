import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/Context";
import { processError } from "../utils/process";

const Submit = () => {
  const navigate = useNavigate();
  const { backendActor, setSubmitted } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [canisterId, setCanisterId] = useState<string>("");
  const [homework, setHomework] = useState<string>("1");
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (backendActor) {
      try {
        setLoading(true);
        let result = await backendActor.verifyProject(
          canisterId,
          BigInt(homework)
        );
        if ("ok" in result) {
          setSubmitted(true);
          toast.success(`Homework ${homework} verification successfull`, {
            autoClose: 5000,
            position: "top-center",
            hideProgressBar: true,
          });
        } else if ("err" in result) {
          setError(processError(result));
        }
        setLoading(false);
        console.log("Submit result", result);
      } catch (error) {
        console.log("Error", error);
        setLoading(false);
      }
    }
  };

  console.log("Error", error);

  return (
    <div className="flex justify-center items-center">
      <div className="w-full px-10">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="canisterId"
          >
            Canister id
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="canisterId"
            type="text"
            value={canisterId}
            onChange={(e) => setCanisterId(e.target.value)}
            placeholder="Canister id"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="github"
          >
            Homework
          </label>
          <select
            className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="homework"
            value={homework}
            onChange={(e) => setHomework(e.target.value)}
          >
            <option value="1">Homework 1</option>
            <option value="2">Homework 2</option>
            <option value="3">Homework 3</option>
            <option value="4">Homework 4</option>
            <option value="5">Homework 5</option>
            <option value="6">Homework 6</option>
            <option value="7">Homework 7</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSave}
          >
            {loading ? "Verifiying..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Submit;
