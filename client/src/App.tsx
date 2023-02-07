import { useQuery } from "@apollo/client";
import { useState } from "react";
import { getEvents } from "./Apollo/Query/queries";
import React from "react";
import Router from "./Router/Router";
function App() {
  return (
    <>
      <Router />
    </>
  );
}

export default App;
