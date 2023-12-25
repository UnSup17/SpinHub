type BaseFormElement = {
  name: string;
  label: string;
  value: string | object;
  placeholder?: string;
  className?: string;
};

type ColorElement = BaseFormElement & {
  type: "color";
}

type TimeElement = BaseFormElement & {
  type: "time";
}

type TextElement = BaseFormElement & {
  type: "label" | "text" | "email" | "password" | "textarea";
  typeText: string;
};

type SelectElement = BaseFormElement & {
  type: "select";
  options: { value: string; label: string }[];
  multipleSelect: boolean;
  styles: object;
};

type DatePickerElement = BaseFormElement & {
  type: "datePicker";
};

type ButtonElement = BaseFormElement & {
  type: "button";
};

type DynamicListElement = BaseFormElement & {
  type: "dynamicList";
  min: number;
  subForm: FormElement[][];
  object: object;
};

export type FormElement =
  | TimeElement
  | ColorElement
  | TextElement
  | SelectElement
  | DatePickerElement
  | ButtonElement
  | DynamicListElement;
