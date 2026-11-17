const controls = [...document.querySelectorAll("[data-filter]")];
const search = document.querySelector("#search");
const entries = [...document.querySelectorAll(".entry")];
const shown = document.querySelector("#shown");
const noResults = document.querySelector("#no-results");
let filter = "all";

function update() {
  const query = search.value.trim().toLocaleLowerCase();
  let count = 0;
  for (const entry of entries) {
    const matchesFilter = filter === "all"
      || entry.dataset.kind === filter
      || entry.dataset.tags.split("|").includes(filter);
    entry.hidden = !matchesFilter || !entry.textContent.toLocaleLowerCase().includes(query);
    if (!entry.hidden) count += 1;
  }
  shown.textContent = count === 1 ? "1 entry" : count + " entries";
  noResults.hidden = count !== 0;
  for (const control of controls) {
    control.setAttribute("aria-pressed", String(control.dataset.filter === filter));
  }
}

for (const control of controls) {
  control.addEventListener("click", () => {
    filter = control.dataset.filter;
    update();
  });
}
search.addEventListener("input", update);
document.addEventListener("click", (event) => {
  const link = event.target.closest("[data-entry-link]");
  if (!link) return;
  const entry = document.getElementById(link.hash.slice(1));
  if (entry?.hidden) {
    filter = "all";
    search.value = "";
    update();
  }
});
