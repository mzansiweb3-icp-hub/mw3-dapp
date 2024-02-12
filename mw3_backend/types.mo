import Test "test";
import Result "mo:base/Result";

module {

    public type Student = {
        principal : Text;
        username : Text;
        email : Text;
        github : Text;
        score : Nat;
        submissions : [Homework];
    };

    public type Homework = {
        number : Int;
        canister : Text;
        timestamp : Int;
    };

    public type TestResult = Test.TestResult;
    public type VerifyProject = TestResult or Result.Result<(), { #NotAController : Text; #NotAStudent : Text; #InvalidDay : Text; #AlreadyCompleted : Text }>;
};
