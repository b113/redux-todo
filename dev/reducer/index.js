const reducer = (notes = [], action) => {
  let notesList = [...notes];
  switch (action.type) {
    case 'ADD': {
      return [
        action.note,
        ...notes,
      ];
    }
    case 'REMOVE': {
      notesList = notes.filter(note => note.id !== action.noteId);
      return notesList;
    }
    case 'CHANGE': {
      return notesList.map((note) => {
        const newObj = JSON.parse(JSON.stringify(note));
        if (note.id === action.objNote.id) {
          newObj.text = action.objNote.text;
        }
        return newObj;
      });
    }
    case 'PARSE': {
      return action.notes;
    }
    default: {
      return notes;
    }
  }
};

export default reducer;
