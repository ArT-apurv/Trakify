import * as React from "react";

function HomeIcon(props) {
  return (
    <svg
      width={30}
      height={30}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 0C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15zm0 6.912l7.324 5.693v10.483h-5.039V16.76h-4.57v6.328h-5.04V12.605L15 6.912z"
        fill="#fff"
      />
    </svg>
  );
}

export default HomeIcon;
