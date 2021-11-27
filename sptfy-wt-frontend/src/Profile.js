import React from "react";

function Profile({ user }) {
  console.log(user);
  return (
    <div>
      <h1>Profile</h1>
      <h2>User: {user.displayName}</h2>
    </div>
  );
}

export default Profile;
