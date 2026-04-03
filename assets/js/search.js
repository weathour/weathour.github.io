document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search-input");
  const items = Array.from(document.querySelectorAll("[data-search-item]"));
  const empty = document.getElementById("search-empty");

  if (!input || items.length === 0) {
    return;
  }

  const update = () => {
    const keyword = input.value.trim().toLowerCase();
    let visibleCount = 0;

    items.forEach((item) => {
      const haystack = [
        item.dataset.title || "",
        item.dataset.summary || "",
        item.dataset.tags || "",
      ].join(" ");

      const matched = !keyword || haystack.includes(keyword);
      item.hidden = !matched;
      if (matched) {
        visibleCount += 1;
      }
    });

    if (empty) {
      empty.hidden = visibleCount !== 0;
    }
  };

  input.addEventListener("input", update);
});
