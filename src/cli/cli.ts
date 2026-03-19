#!/usr/bin/env node
import { Command } from "commander";
import { greet } from "../utils/logger.js";
import { addNote } from "../notes/add.js";
import { deleteNote } from "../notes/delete.js";

const program = new Command();

program
    .name("cli-notes")
    .description(
        `A fast Command-line notes application that allows you to create and manage their notes directly from the terminal.\nWith a simple and intuitive interface, you can easily \n \n - add new notes \n - view existing ones \n - and keep your thoughts organized without leaving the command line. \n\n\n`,
    )
    .version("0.2.1");

program
    .command("help", { isDefault: true })
    .description("Show help")
    .action(() => {
        greet();
        program.outputHelp();
        console.log("\n\n");
    });

// default if no command is given
program.action(() => {
    greet();
    program.outputHelp();
    console.log("\n\n");
});

//

//

// Add notes command
program
    .command("add <text>")
    .description("Adds a new note with the provided text")
    .action((text: string, options) => {
        text = text.trim();

        if (!text) {
            console.log("note cannot be empty");
            process.exit(1);
        }

        addNote(text);
    });

// delete notes command
program
    .command("delete <number>")
    .description("Delete a note using it's id | number")
    .action((id: number, options) => {
        id = id;

        if (!id) {
            console.log("id should be a number");
            process.exit(1);
        }

        deleteNote(id);
    });

program.parse(process.argv);
