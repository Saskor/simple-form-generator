import React from "react";
import { Route, Switch } from "react-router-dom";
import { FormConstructor } from "./features/formConstructor/components/FormConstructor/FormConstructor";
import { Input } from "./features/formConstructor/views/input/Input";
// import { FormConstructorService } from "./features/formConstructor/services";

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={FormConstructor} />
      </Switch>
    </div>
  );
}

