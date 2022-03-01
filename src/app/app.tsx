import React from "react";
import { Route, Switch } from "react-router-dom";
import { FormConstructor } from "./features/formConstructor/components/FormConstructor/FormConstructor";

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={FormConstructor} />
      </Switch>
    </div>
  );
}

