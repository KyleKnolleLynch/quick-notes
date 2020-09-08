const addBtn = document.querySelector('.add-btn');
const section = document.querySelector('section');

addBtn.addEventListener('click', () => {
  addNewNote();
  document.querySelector('textArea').focus();
});

const notes = JSON.parse(localStorage.getItem('notes'));

const addNewNote = (noteText = '') => {
  const note = document.createElement('div');
  note.classList.add('note');
  note.innerHTML = `
  <div class="toolbar">
    <i class="edit las la-edit la-3x"></i>
    <i class="delete las la-recycle la-3x"></i>
  </div>
  <div class="pad ${!noteText && 'hidden'}"></div>
  <textarea contenteditable ${noteText && 'hidden'}></textarea>
  `;

  section.insertBefore(note, section.firstElementChild);

  const editBtn = note.querySelector('.edit');
  const deleteBtn = note.querySelector('.delete');
  const pad = note.querySelector('.pad');
  const textArea = note.querySelector('textarea');

  textArea.value = noteText;
  pad.innerHTML = noteText;

  editBtn.addEventListener('click', () => {
    pad.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
  });

  deleteBtn.addEventListener('click', () => {
    note.remove();
    updateLocalStorage();
  });

  textArea.addEventListener('input', (e) => {
    const { value } = e.target;
    pad.innerHTML = marked(value);

    updateLocalStorage();
  });
};

if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}

const updateLocalStorage = () => {
  const notesText = document.querySelectorAll('textarea');

  const notes = [];

  notesText.forEach((note) => {
    notes.push(note.value);
  });

  localStorage.setItem('notes', JSON.stringify(notes));
};
