const { writeFile, readFile, existsSync } = require("fs");
const { join } = require("path");
const { createServer } = require("http");

const path = join(__dirname, "/source/contacts.json");

createServer((request, response) => {
  const { url, method } = request;

  if (url === "/new_contact" && method === "POST") {
    const chunks = [];
    request
      .on("data", (chunk) => {
        chunks.push(chunk);
      })
      .on("end", () => {
        const contact = JSON.parse(Buffer.concat(chunks).toString());

        if (existsSync(path)) {
          readFile(path, (error, data) => {
            if (error) {
              console.log(error);
              return;
            }
            const newContacts = JSON.parse(data);
            newContacts.push(contact);

            writeFile(path, JSON.stringify(newContacts), (error) => {
              if (error) {
                console.log(error);
                return;
              }
              console.log("File updated!");
            });
          });
        } else {
          const newContacts = [];
          newContacts.push(contact);
          writeFile(path, JSON.stringify([]), (error) => {
            if (error) {
              console.log(error);
              return;
            }
            console.log("File updated!");
          });
        }
      });
  }
  response.setHeader("Content-Type", "application/json");
  response.write(
    JSON.stringify({ msg: "Successfully added contact to list!" })
  );
  response.end();
}).listen(3000, () => console.log("Server listening on port 3000..."));
