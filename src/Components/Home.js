import React from "react";
import Notes from "./Notes";

function Home(props) {
  const {renderAlert} = props;
  return (
    <div>
      <Notes renderAlert={renderAlert}/>
    </div>
  );
}

export default Home;
