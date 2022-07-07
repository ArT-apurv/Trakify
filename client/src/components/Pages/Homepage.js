import React from "react";
import { logout } from "../Spotify";
import { GlobalStyle } from "../../Styles";

function Homepage(props) {
  return (
    <>
      <GlobalStyle />
      <button onClick={logout}>Log Out</button>

      {props.profile && (
        <div>
          <h1>{props.profile.display_name}</h1>
          <p>{props.profile.followers.total} Followers</p>
          {props.profile.images.length && props.profile.images[0].url && (
            <img src={props.profile.images[0].url} alt="Avatar" />
          )}
        </div>
      )}
    </>
  );
}

export default Homepage;
