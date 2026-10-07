const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const charCount = document.querySelector("#char-count");
const clearAllButton = document.querySelector("#clear-all");

const STORAGE_KEY = "quicknotes";
const MAX_LENGTH = 200;

let notes = loadNotes();

function loadNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (e) {
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = "You have " + notes.length + " notes.";
  }
}

function render() {
  notesList.textContent = "";
  updateCount();
    const term = searchInput.value.trim().toLowerCase();
    const visible = notes.filter(function (note) {
    return note.text.toLowerCase().includes(term);
    });

    if (notes.length > 0 && visible.length === 0) {
    const li = document.createElement("li");
    li.className = "empty-message";
    li.textContent = "No notes match your search.";
    notesList.appendChild(li);
    return;
    }

  visible.forEach(function (note) {
    const li = document.createElement("li");
    li.className = "note-card category-" + note.category.toLowerCase();

    const text = document.createElement("p");
    text.className = "note-text";
    text.textContent = note.text;

    const meta = document.createElement("div");
    meta.className = "note-meta";

    const label = document.createElement("span");
    label.className = "category-label";
    label.textContent = note.category;

    const date = document.createElement("span");
    date.textContent = note.createdAt;

    const del = document.createElement("button");
    del.type = "button";
    del.className = "delete-btn";
    del.textContent = "Delete";
    del.addEventListener("click", function () {
      deleteNote(note.id);
    });

    meta.append(label, date, del);
    li.append(text, meta);
    notesList.appendChild(li);
  });
}

function updateCharCount() {
  const length = noteInput.value.length;
  charCount.textContent = length + " / " + MAX_LENGTH;
  charCount.classList.toggle("warning", length >= 170 && length <= MAX_LENGTH);
  charCount.classList.toggle("over", length > MAX_LENGTH);
}

function addNote(event) {
  event.preventDefault();
  const text = noteInput.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }
  if (text.length > MAX_LENGTH) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";
  notes.push({
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString()
  });
 
  saveNotes();
  noteInput.value = "";
  updateCharCount();
  render();
}

function deleteNote(id) {
  notes = notes.filter(function (note) {
    return note.id !== id;
  });
  saveNotes();
  render();
}
function clearAll() {
  if (notes.length === 0) return;
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
}

form.addEventListener("submit", addNote);
searchInput.addEventListener("input", render);
noteInput.addEventListener("input", updateCharCount);
clearAllButton.addEventListener("click", clearAll);
render();