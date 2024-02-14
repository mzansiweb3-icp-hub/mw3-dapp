import { VerifyProject } from "../../../../declarations/mw3_backend/mw3_backend.did";

export const processError = (error: VerifyProject) => {
  if ("err" in error) {
    if ("AlreadyCompleted" in error.err) {
      return error.err.AlreadyCompleted;
    } else if ("NotAController" in error.err) {
      return "Not a controller!" + error.err.NotAController;
    } else if ("NotAStudent" in error.err) {
      return "Not a student! " + error.err.NotAStudent;
    } else if ("UnexpectedValue" in error.err) {
      return "Unexpected value! " + error.err;
    } else if ("InvalidDay" in error.err) {
      return "Invalid day!" + error.err.InvalidDay;
    } else if ("UnexpectedError" in error.err) {
      return "Unexpected error!" + error.err.UnexpectedError;
    }
  }
};
