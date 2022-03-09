export type FormStyle = { [key: string]: string };
export type FormStyles = {
  [key: string]: { order: number, value: FormStyle };
};

export const FormStyles: FormStyles = {
  ".form-1f0ad824-cbcf83aba5ac-field": {
    order: 0,
    value: {
      "margin-bottom": "5px"
    }
  },
  ".form-1f0ad824-cbcf83aba5ac-form-items-container": {
    order: 1,
    value: {
      display: "flex",
      "flex-direction": "column"
    }
  },
  ".form-1f0ad824-cbcf83aba5ac-fields": {
    order: 2,
    value: {
      display: "flex",
      "flex-direction": "column"
    }
  },
  ".form-1f0ad824-cbcf83aba5ac-fields select, .form-1f0ad824-cbcf83aba5ac-fields input": {
    order: 3,
    value: {
      width: "100%",
      "box-sizing": "border-box"
    }
  },
  ".form-1f0ad824-cbcf83aba5ac-buttons": {
    order: 3,
    value: {
      display: "flex"
    }
  }
};

