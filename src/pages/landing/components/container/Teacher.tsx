import React from "react";
import { accordions, confidence, enoch } from "../../../../Data";
import Accordion from "./Accordion";
const Teacher = () => {
  return (
    <div className="section" id="teacher">
      <div className="grid sm:grid-cols-2 place-items-center gap-8">
        <div className="pl-5">
          <div className="font-bold sm:text-[1.875rem] text-[1.5rem] mb-5">
            Meet <span className="text-Teal">Enoch</span> <br /> Our Instructor
          </div>
          <p className="text-sm leading-7 text-gray mb-5">
            Meet Enoch, our lead blockchain instructor. With over a decade of experience in developing blockchain solutions, Confidence has a passion for teaching and a knack for simplifying complex concepts. From smart contracts to decentralized applications, he brings real-world expertise and a hands-on approach to learning. Enoch is dedicated to empowering students with the skills to excel in the blockchain space
          </p>
          <button className="py-3 px-4 bg-Teal text-white rounded-lg text-sm font-bold ">
            Connect
          </button>
        </div>
        <div className="p-4 md:w-3/4 sm:row-start-1">
          <img src={enoch} alt="enoch chirima" />
        </div>
        <div className="pl-5">
          <div className="font-bold sm:text-[1.875rem] text-[1.5rem] mb-5">
            Meet <span className="text-Teal">Confidence</span> <br /> Our Dev Rel
          </div>
          <p className="text-sm leading-7 text-gray mb-5">
            Meet Confidence, our lead dev rel. With over a decade of experience in developing blockchain solutions, Confidence has a passion for teaching and a knack for simplifying complex concepts. From smart contracts to decentralized applications, he brings real-world expertise and a hands-on approach to learning. Confidence is dedicated to empowering students with the skills to excel in the blockchain space
          </p>
          <button className="py-3 px-4 bg-Teal text-white rounded-lg text-sm font-bold ">
            Connect
          </button>
        </div>
        <div className="p-4 md:w-3/4">
          <img src={confidence} alt="confidence nyirenda" />
        </div>
      </div>
      <div className="text-center my-8 font-bold sm:text-[1.875rem] text-[1.5rem]">
        Frequently <span className="text-Teal">Asked Questions</span>
      </div>
      <div className="mt-12 max-w-[700px] mx-auto">
        {accordions.map((accordion) => {
          return <Accordion key={accordion.id} {...accordion} />;
        })}
      </div>
    </div>
  );
};

export default Teacher;
