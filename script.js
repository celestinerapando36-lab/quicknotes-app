const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

let notes = [];

function render() {
  notesList.textContent = "";

  notes.forEach(function (note) {
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

    meta.append(label, date, del);
    li.append(text, meta);
    notesList.appendChild(li);
  });
}

function addNote(event) {
  event.preventDefault();
  const text = noteInput.value.trim();
  if (text === "") return; // proper error message comes in Task 4

  notes.push({
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString()
  });

  noteInput.value = "";
  render();
}

form.addEventListener("submit", addNote);
render();