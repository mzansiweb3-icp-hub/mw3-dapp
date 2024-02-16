import Test "test";
import Result "mo:base/Result";

module {

    public type Student = {
        principal : Text;
        username : Text;
        email : Text;
        institution : Text;
        github : Text;
        score : Nat;
        submissions : [Homework];
        created : Int;
    };

    public type Homework = {
        number : Int;
        canister : Text;
        timestamp : Int;
    };

    public type TestResult = Test.TestResult;
    public type VerifyProject = TestResult or Result.Result<(), { #NotAController : Text; #NotAStudent : Text; #InvalidDay : Text; #AlreadyCompleted : Text }>;

    public type Role = {
        #owner;
        #admin;
        #unauthorized;
    };

    public type Permission = {
        #assign_role;
        #lowest;
    };

};
