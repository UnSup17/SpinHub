const NewAssignationMail = (params: {
  [key: string]: string;
  day: string,
  place: string,
  time: string,
  name: string,
  pal: string,
  color: string,
}) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>${params.title}</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="margin: 0; padding: 0">
    <div
      style="
        width: 100%;
        max-width: 300px;
        margin: auto;
        height: 343px;
        background-image: url(https://i.pinimg.com/736x/8e/04/64/8e0464c0fe7ef6c5ae9f51087829f5fa.jpg);
        background-size: cover;
      "
    >
      <div style="padding-left: 80px; padding-top: 30px; line-height: 27px">
        <p
          id="p"
          style="
            margin: 0;
            text-indent: 40px;
            font-weight: bold;
            font-size: 20px;
          "
        >
          ${params.day}
        </p>
        <p
          style="
            margin: 0;
            text-indent: 60px;
            font-weight: bold;
            font-size: 20px;
          "
        >
          ${params.time}
        </p>
        <p
          style="
            margin: 0;
            text-indent: 70px;
            font-weight: bold;
            font-size: 20px;
          "
        >
          ${params.place}
        </p>
      </div>
      <div
        style="padding-top: 50px; max-width: 200px; width: 100%; margin: auto"
      >
        <div
          style="
            background-color: white;
            border-radius: 10px;
            padding: 0.7rem 3rem;
            line-height: 20px;
          "
        >
          <p style="padding: 0; margin: 0">
            Hola <strong>${params.name}</strong>
          </p>
          <p style="padding: 0; margin: 0">
            Te toco: <strong>${params.pal}</strong>
          </p>
          <div style="display: flex; gap: 1rem; align-items: center">
            <p style="padding: 0; margin: 0">Lleve cuco de color:</p>
            <p
              style="
                display: flex;
                width: 1.5rem;
                height: 2rem;
                border: 1px solid black;
                background-color: ${params.color};
              "
            ></p>
          </div>
        </div>
      </div>
    </div>
    <p>Cuidado con el modo oscuro</p>
    <script>
      (() => {
        document.querySelector("#p").innerHTML = new Date(
          "2023-12-29"
        ).toLocaleDateString(undefined, {
          dateStyle: "medium",
        });
      })();
    </script>
  </body>
</html>

`;

export default NewAssignationMail;
