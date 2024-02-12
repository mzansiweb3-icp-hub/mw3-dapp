import { Actor, ActorSubclass, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../../declarations/mw3_backend";
import { _SERVICE } from "../../../../declarations/mw3_backend/mw3_backend.did";

const host = "https://icp0.io";
const agent = new HttpAgent({ host: host });

export const verifyHomework1 = async (id: string) => {
  const actor: ActorSubclass<_SERVICE> = Actor.createActor(idlFactory, {
    agent: agent,
    canisterId: "75i2c-tiaaa-aaaab-qacxa-cai",
  });

  const result = await actor.getUsers();
  console.log("Users reslults", result); 
};
