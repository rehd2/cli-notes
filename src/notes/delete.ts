// IMPORTS
import { writeFileSync } from "fs";
import { getNotes, notesStorageFullPath } from "./get.js";

import { possibleErrorMessages, type Note } from "./add.js";

//

//

function deleteNote(id: number) {
    const notes: Note[] = getNotes().notes;

    // Get the notes left and Rearrange the notes ids to autoincreament after removing a note
    const notesLeft: Note[] = notes
        .filter((note) => note.id !== id)
        .map((note, index) => ({
            ...note, // Copy | keep everything in a note
            id: index + 1, // overide it's id
        }));

    // this could also work:
    /*
    // Rearrange the notes ids to autoincreament
    for (let i = 0; i < notesLeft.length; i++) {
        const note: Note = notesLeft[i];
        note.id = i + 1;

        console.log("note", i + 1, ":", note.text);
    }
    */

    const noteText = JSON.stringify(notesLeft);

    try {
        writeFileSync(notesStorageFullPath, noteText);
        console.log("note deleted");
    } catch (error: any) {
        const errorMessage =
            possibleErrorMessages[error.code] ||
            "An unexpected error occurred.";
        console.error(`Error adding note: ${errorMessage}`);
    }
}

//

//

export { deleteNote };
