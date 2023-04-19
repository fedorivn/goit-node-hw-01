const yargs = require("yargs");
const contacts = require("./contacts");



const argv = yargs
  .command("list", "Список контактів")
  .command("get", "Знайти контакт", {
    name: {
      describe: "Ім'я контакту",
      demandOption: true,
      type: "string",
    },
  })
  .command("add", "Додати новий контакт", {
    name: {
      describe: "Ім'я контакту",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "Email контакту",
      demandOption: true,
      type: "string",
    },
    phone: {
      describe: "Телефон контакту",
      demandOption: true,
      type: "string",
    },
  })
  .command("remove", "Видалити контакт", {
    name: {
      describe: "Ім'я контакту",
      demandOption: true,
      type: "string",
    },
  })
  .help()
  .alias("help", "h").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await contacts.listContacts();
      console.table(list);
      break;

    case "get":
      const get = await contacts.getContactById(id);
      console.table(get);
      break;

    case "add":
      const add = await contacts.addContact(name, email, phone);
      console.table(add);
      break;

    case "remove":
      const remove = await contacts.removeContact(id);
      console.table(remove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(argv);
