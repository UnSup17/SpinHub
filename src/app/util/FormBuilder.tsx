import { FormElement } from "@/app/models/FormElement";
import { Fragment, ReactNode } from "react";
import { hasUnfilledValues } from "./CompareObjects";
import dayjs from "dayjs";

type FormBuilderProps = {
  toSubmit: object;
  elements: FormElement[];
  onChange: (propsPath: string[], value: any) => void;
  handleAddItem: (propsPath: string[], newItem: object) => void;
  handleRemoveItem: (pathProps: string[]) => void;
  handleSubmit: () => void;
};

function FormBuilder({
  toSubmit,
  elements,
  onChange,
  handleAddItem,
  handleRemoveItem,
  handleSubmit,
}: FormBuilderProps) {
  const renderFormElement = (element: FormElement): ReactNode => {
    const { type, name, label, value, placeholder, className } = element;

    switch (type) {
      case "label":
        return <p className="text-[#444400] p-[0.5rem]">{label}</p>;
      case "text":
      case "email":
        const { typeText } = element;
        return (
          <>
            <input
              type={typeText || "text"}
              className={className}
              value={value as string}
              placeholder={placeholder}
              onChange={({ target: { value } }) =>
                onChange(name?.split(".") as string[], value)
              }
              name={name}
            />
          </>
        );

      case "textarea":
        return (
          <>
            <label>{label}</label>

            <textarea
              value={value as string}
              onChange={({ target: { value } }) =>
                onChange(name?.split(".") as string[], value)
              }
              placeholder={placeholder || ""}
              className={className}
            />
          </>
        );

      case "select":
        const { options, multipleSelect, styles } = element;
        if (options?.length && options.length > 0) {
          return (
            <>
              <label className={" bg-white pr-2"}>{label}</label>
              <select
                multiple={multipleSelect}
                value={value as string}
                onChange={({ target: { value } }) => {
                  onChange(name?.split(".") as string[], value);
                }}
                placeholder={placeholder}
              >
                {options.map((item, indexRow) => (
                  <option key={indexRow} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </>
          );
        }
        return null;

      case "datePicker":
        return (
          <>
            {label && <label htmlFor="">{label}</label>}
            <input
              type="date"
              pattern="dd-MM-yyyy"
              className={className}
              value={value as string}
              onChange={(value) =>
                onChange(name?.split(".") as string[], value.target.value)
              }
            />
          </>
        );

      case "color":
        return (
          <>
            <input
              type="color"
              className={className}
              value={value as string}
              name={name}
              onInput={(event: any) => {
                onChange(name?.split(".") as string[], event.target.value);
              }}
            />
          </>
        );

      case "time":
        return (
          <>
            <input
              type="time"
              className={className}
              value={value as string}
              name={name}
              onInput={(event: any) => {
                onChange(name?.split(".") as string[], event.target.value);
              }}
            />
          </>
        );

      case "dynamicList":
        const { object, min } = element;
        return (
          <Fragment>
            <div
              className={`flex flex-col gap-2 ${className ? className : ""}`}
            >
              {label && <p className="text-[#444400] p-[0.5rem]">{label}</p>}
              {element.subForm?.map((row, indexRow: number) => (
                <div
                  key={indexRow}
                  className="flex flex-wrap gap-2 first-of-type:mt-0 relative items-center"
                >
                  <button
                    key={"button" + indexRow}
                    color="error"
                    disabled={element.subForm.length <= min}
                    onClick={() => handleRemoveItem(row[0].name?.split("."))}
                    className="border bg-red-600 text-white rounded-md py-1"
                  >
                    <span className="self-center px-2">X</span>
                  </button>

                  {row?.map((col, indexCol) => (
                    <Fragment key={"col" + indexCol}>
                      {renderFormElement(col)}
                    </Fragment>
                  ))}
                </div>
              ))}
              {!hasUnfilledValues(value as object) && (
                <div style={{ textAlign: "right", marginBottom: 10 }}>
                  <button
                    color="primary"
                    onClick={() => handleAddItem(name.split("."), object)}
                    className="bg-green-600 text-white rounded-md shadow"
                  >
                    <span className="px-2 py-2 text-2xl">+</span>
                  </button>
                </div>
              )}
              <hr className="my-1" />
            </div>
          </Fragment>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {elements.map((element, index) => (
        <Fragment key={index}>{renderFormElement(element)}</Fragment>
      ))}
      <button disabled={hasUnfilledValues(toSubmit)} onClick={handleSubmit}>
        ENVIAR
      </button>
    </div>
  );
}

export default FormBuilder;
