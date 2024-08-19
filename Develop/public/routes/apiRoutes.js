document.addEventListener('DOMContentLoaded', () => {
    const notesList = document.getElementById('notes-list');
    const noteTitle = document.getElementById('note-title');
    const noteText = document.getElementById('note-text');
    const saveNoteBtn = document.getElementById('save-note');
    const clearFormBtn = document.getElementById('clear-form');
    const newNoteBtn = document.getElementById('new-note');

    function loadNotes() {
        fetch('/api/notes')
            .then(response => response.json())
            .then(notes => {
                notesList.innerHTML = '';
                notes.forEach(note => {
                    const noteItem = document.createElement('div');
                    noteItem.textContent = note.title;
                    noteItem.dataset.id = note.id;
                    noteItem.addEventListener('click', () => {
                        noteTitle.value = note.title;
                        noteText.value = note.text;
                        newNoteBtn.style.display = 'block';
                        saveNoteBtn.style.display = 'none';
                    });
                    notesList.appendChild(noteItem);
                });
            });
    }

    saveNoteBtn.addEventListener('click', () => {
        const title = noteTitle.value;
        const text = noteText.value;

        fetch('/api/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, text })
        })
        .then(response => response.json())
        .then(() => {
            loadNotes();
            noteTitle.value = '';
            noteText.value = '';
        });
    });

    clearFormBtn.addEventListener('click', () => {
        noteTitle.value = '';
        noteText.value = '';
    });

    newNoteBtn.addEventListener('click', () => {
        noteTitle.value = '';
        noteText.value = '';
        saveNoteBtn.style.display = 'block';
        newNoteBtn.style.display = 'none';
    });

    loadNotes();
});
