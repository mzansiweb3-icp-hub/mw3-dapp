import Types "types";
import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Result "mo:base/Result";

actor {

  type User = Types.User;

  var users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);
  private stable var usersEntries : [(Principal, User)] = [];

  system func preupgrade() {
    usersEntries := Iter.toArray(users.entries());

  };

  system func postupgrade() {
    users := TrieMap.fromEntries<Principal, User>(usersEntries.vals(), Principal.equal, Principal.hash);
  };

  public shared func addUser(user : User) : async () {
    users.put(Principal.fromText(user.principal), user);
  };

  public shared query func getUser(id : Principal) : async Result.Result<User, ()> {
    return switch (users.get(id)) {
      case (null) { #err() };
      case (?user) { #ok(user) };
    };
  };

  public shared query func getUsers() : async [User] {
    return Iter.toArray(users.vals());
  };

  public shared func removeUser(id : Principal) : async () {
    users.delete(id);
  };

  public shared func updateUser(user : User) : async () {
    users.put(Principal.fromText(user.principal), user);
  };

};
