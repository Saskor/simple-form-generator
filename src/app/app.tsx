import React from "react";
import { Route, Switch } from "react-router-dom";
import { FormConstructor } from "./features/formConstructor/components/FormConstructor";
import { Input } from "./features/formConstructor/views/input/Input";
// import { FormConstructorService } from "./features/formConstructor/services";

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={FormConstructor} />
        <Route path="/1" >
          <Input
            name="input2"
            label="input2"
            type="text"
            placeholder="input123"
          />
        </Route>
      </Switch>
    </div>
  );
}

