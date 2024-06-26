import { useState } from "react";
import { useAuth } from "../../hooks/Context";
import { set, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Student } from "../../declarations/mw3_backend/mw3_backend.did";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  institution: string;
  githubLink: string;
};

const Form = ({ setIsRegistered }) => {
  const navigate = useNavigate();
  const { backendActor, identity } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const schema = z.object({
    firstName: z
      .string()
      .min(1, { message: "First name must be 1 or more characters long" })
      .max(50, { message: "First name must be less than 50 characters long" }),
    lastName: z
      .string()
      .min(1, { message: "Last name must be 1 or more characters long" })
      .max(50, { message: "Last name must be less than 50 characters long" }),
    email: z.string().email({ message: "Invalid email" }),
    institution: z
      .string()
      .min(1, { message: "Institution must be 1 or more characters long" })
      .max(100, {
        message: "Institution must be less than 100 characters long",
      }),
    githubLink: z.string().url({ message: "Invalid URL" }),
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
        let user: Student = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          github: data.githubLink,
          score: BigInt(0),
          institution: data.institution,
          principal: identity?.getPrincipal().toString(),
          submissions: [],
          created: BigInt(Date.now()),
        };
        await backendActor.addUser(user);
        toast.success("You've been registered!", {
          autoClose: 5000,
          position: "top-center",
          hideProgressBar: true,
        });
        setIsRegistered(true);
        navigate("/");
        setLoading(false);
      } catch (error) {
        console.log("An error occurred on registering", error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="md:w-1/3 px-5 md:px-0"
        onSubmit={handleSubmit(handleSave)}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstName"
            type="text"
            {...register("firstName")}
            placeholder="firstName"
          />
          {errors.firstName && (
            <span className="text-red-600">{errors.firstName.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastName"
            type="text"
            {...register("lastName")}
            placeholder="lastName"
          />
          {errors.lastName && (
            <span className="text-red-600">{errors.lastName.message}</span>
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
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="institution"
          >
            <span>Institution/Organization</span>
            <span>
              <p className="text-xs text-gray-400">
                (If you're an independent developer, please type "Independent")
              </p>
            </span>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="institution"
            type="text"
            {...register("institution")}
            placeholder="Institution"
          />
          {errors.institution && (
            <span className="text-red-600">{errors.institution.message}</span>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="github"
          >
            Github Profile Link
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="github"
            type="text"
            {...register("githubLink")}
            placeholder="e.g - https://github.com/username"
          />
          {errors.githubLink && (
            <span className="text-red-600">{errors.githubLink.message}</span>
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
