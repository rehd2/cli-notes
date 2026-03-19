// IMPORTS
import { writeFileSync } from "fs";
import { getNotes, notesStorageFullPath } from "./get.js";

const possibleErrorMessages: { [key: string]: string } = {
    ENOENT: "The specified file or directory does not exist.",
    EACCES: "Permission denied",
    EISDIR: "Path is a directory, not a file.",
};

/**
 * @property {number} id - unique identifier for the notes
 * @property {string} text - Note content
 * @property {"pending" | "working" | "completed"} status - The status of the note
 * @property {number} createdAt - Timestamp when the note was created
 */
type Note = {
    id: number;
    text: string;
    status: "pending" | "working" | "completed";
    createdAt: number;
};

/**
 *  Adds a new note to the notes storage file.
 * The note is created with a unique id, the provided text, a default status of "pending", and a timestamp of when it was created.
 * New note is then added to the existing notes array and saved back to the storage file.
 *
 * @param text - The content of the note to be added
 *
 * @throws {Error} If there is an error writing to the file, an error will be thrown.
 */
function addNote(text: string): void {
    const id = getNotes().length + 1;
    const status = "pending";
    const createdAt = Date.now();

    const newNote: Note = { id, text, status, createdAt }; // create a note object with the provided text and generated properties

    const notes: Note[] = [...getNotes().notes, newNote]; // unpack previous notes, add new one and return array constainong all

    // or push:
    // notes.push(newNote);

    const textNote = JSON.stringify(notes);

    try {
        writeFileSync(notesStorageFullPath, textNote);
        console.log("note added successfully");
    } catch (error: any) {
        const errorMessage =
            possibleErrorMessages[error.code] ||
            "An unexpected error occurred.";
        console.error(`Error adding note: ${errorMessage}`);
    }

    console.log("full notes: ", getNotes().notes);

    return;
}

export { addNote, type Note, possibleErrorMessages };
