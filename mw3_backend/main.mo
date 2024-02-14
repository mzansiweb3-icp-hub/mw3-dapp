import Types "types";
import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Test "test";
import Utils "utils";

actor {

  type Student = Types.Student;
  type VerifyProject = Types.VerifyProject;
  type Homework = Types.Homework;

  var students = TrieMap.TrieMap<Principal, Student>(Principal.equal, Principal.hash);
  private stable var studentsEntries : [(Principal, Student)] = [];

  system func preupgrade() {
    studentsEntries := Iter.toArray(students.entries());

  };

  system func postupgrade() {
    students := TrieMap.fromEntries<Principal, Student>(studentsEntries.vals(), Principal.equal, Principal.hash);
  };

  public shared func addUser(user : Student) : async () {
    students.put(Principal.fromText(user.principal), user);
  };

  public shared query func getUser(id : Principal) : async Result.Result<Student, ()> {
    return switch (students.get(id)) {
      case (null) { #err() };
      case (?user) { #ok(user) };
    };
  };

  public shared query ({ caller }) func getMyProfile() : async Result.Result<Student, ()> {
    return switch (students.get(caller)) {
      case (null) { #err() };
      case (?user) { #ok(user) };
    };
  };

  public shared query func getUsers() : async [Student] {
    return Iter.toArray(students.vals());
  };

  public shared func removeUser(id : Principal) : async () {
    students.delete(id);
  };

  public shared func updateUser(user : Student) : async () {
    students.put(Principal.fromText(user.principal), user);
  };

  public shared ({ caller }) func verifyProject(canisterIdText : Text, homework : Nat) : async VerifyProject {

    let canisterId = Principal.fromText(Utils.trim(canisterIdText));
    // Step 1: Verify that the caller is a registered student
    // if (not (_isStudent(caller))) {
    //   return #err(#NotAStudent("Please login or register"));
    // };
    // Step 2: Verify that the caller hasn't already completed the project
    if (_hasStudentCompletedDay(homework, caller)) {
      return #err(#AlreadyCompleted("You have already completed this project"));
    };
    // // Step 3: Verify that the caller is the controller of the submitted canister.
    // let cliPrincipal = if (not (await Test.verifyOwnership(canisterId, _getCliPrincipal(caller)))) {
    //   return #err(#NotAController("You are not the controller of this canister"));
    // };

    // Step 4: Run the tests (see test.mo)
    switch (homework) {
      case (1) {
        switch (await Test.verifyDay1(canisterId)) {
          case (#ok) {};
          case (#err(e)) { return #err(e) };
        };
      };
      case (2) {
        switch (await Test.verifyDay2(canisterId)) {
          case (#ok) {};
          case (#err(e)) { return #err(e) };
        };
      };
      case (3) {
        switch (await Test.verifyDay3(canisterId)) {
          case (#ok) {};
          case (#err(e)) { return #err(e) };
        };
      };
      case (4) {
        switch (await Test.verifyDay4(canisterId)) {
          case (#ok) {};
          case (#err(e)) { return #err(e) };
        };
      };
      case (5) {
        switch (await Test.verifyDay5(canisterId)) {
          case (#ok) {};
          case (#err(e)) { return #err(e) };
        };
      };
      case (_) {
        return #err(#InvalidDay("Invalid day"));
      };
    };
    // Step 5: Update the necessary variables
    _validated(homework, canisterId, caller);
    return #ok();
  };

  func _validated(homework : Nat, canisterId : Principal, studentId : Principal) : () {
    switch (students.get(studentId)) {
      case (null) { assert (false); return () };
      case (?student) {
        // Step 1: Add the new completed project to the student's completed projects (studentCompletedDaysHashMap)
        let completedHomeworks = student.submissions;
        let username = student.username;
        let projectCompleted : Homework = {
          number = homework;
          canister = Principal.toText(canisterId);
          timestamp = Time.now();
        };
        let newCompletedHomeworks = Array.append<Homework>(completedHomeworks, [projectCompleted]);
        // Step 2: Generate the new student's score
        let score = student.score + 20; // 20 points per completed project
        let newStudent : Student = {
          student with
          submissions = newCompletedHomeworks;
          score = score;
        };
        students.put(studentId, newStudent);
        return;
      };
    };
  };

  func _hasStudentCompletedDay(day : Nat, p : Principal) : Bool {
    switch (students.get(p)) {
      case (null) { return false };
      case (?student) {
        for (d in student.submissions.vals()) {
          if (d.number == day) {
            return true;
          };
        };
        return false;
      };
    };
  };

};
