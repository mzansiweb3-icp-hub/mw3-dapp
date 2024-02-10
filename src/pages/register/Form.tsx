import { useState } from "react";
import { useAuth } from "../../hooks/Context";
import { set, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "../../declarations/mw3_backend/mw3_backend.did";
import { toast } from "react-toastify";

type FormData = {
  username: string;
  email: string;
  github: string;
};

const Form = () => {
  const { backendActor, identity } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const schema = z.object({
    username: z
      .string()
      .min(1, { message: "Username must be 1 or more characters long" })
      .max(50, { message: "Username must be less than 50 characters long" }),
    email: z.string().email({ message: "Invalid email" }),
    github: z
      .string()
      .min(1, { message: "Github username must be 1 or more characters long" })
      .max(50, {
        message: "Github username must be less than 50 characters long",
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleSave = async (data: FormData) => {
    setLoading(true);
    if (backendActor) {
      try {
        let user: User = {
          username: data.username,
          email: data.email,
          github: data.github,
          principal: identity?.getPrincipal().toString(),
          level: BigInt(0),
        };
        await backendActor.addUser(user);
        toast.success("You've been registered!", {
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
    <div className="flex justify-center items-center h-screen">
      <form className="w-1/3" onSubmit={handleSubmit(handleSave)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            {...register("username")}
            placeholder="Username"
          />
          {errors.username && (
            <span className="text-red-600">{errors.username.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            {...register("email")}
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-600">{errors.email.message}</span>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="github"
          >
            Github Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="github"
            type="text"
            {...register("github")}
            placeholder="Github Username"
          />
          {errors.github && (
            <span className="text-red-600">{errors.github.message}</span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
