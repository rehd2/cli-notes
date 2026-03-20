import { readFileSync } from "fs";
import { existsSync, writeFileSync } from "node:fs";
import path, { join } from "node:path";
import { fileURLToPath } from "node:url";
import { type Note } from "./add.js";

const __filename = fileURLToPath(import.meta.url);
const currentFileFolder = path.dirname(__filename);

const notesStorageFolder = join(currentFileFolder, "../../data/");
const notesStorageFile = "notes.json";

/** path to notes storage file */
const notesStorageFullPath = join(notesStorageFolder, notesStorageFile);

/**
 * Reads the notes from the storage file and returns an object containing
 * the length of the notes array and the notes themselves.
 *
 * If the file does not exist, it will be created and initialized as an empty array.
 * If the file contents are invalid or cannot be parsed, an empty array is returned.
 *
 * @returns {{ length: number; notes: Note[] }} An object with the number of notes and the notes array.
 */
function getNotes(): { length: number; notes: Note[] } {
    if (!existsSync(notesStorageFullPath))
        writeFileSync(notesStorageFullPath, "[]");

    try {
        const file: string = readFileSync(notesStorageFullPath, "utf-8");
        const notes: Note[] = JSON.parse(file);

        const notesLength = notes.length;

        return {
            length: notesLength,
            notes: notes,
        };
    } catch (error) {
        return { length: 0, notes: [] };
    }
}

export { getNotes, notesStorageFullPath };
