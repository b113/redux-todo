export const addNote = note => ({ type: 'ADD', note });
export const removeNote = noteId => ({ type: 'REMOVE', noteId });
export const changeNote = objNote => ({ type: 'CHANGE', objNote });
export const parseNotes = notes => ({ type: 'PARSE', notes });
