function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

let terms = {
    "AI": "Fumo",
    "scientist": "fumologist",
};

// Add matches for capitalized versions of terms
for ([key, value] of Object.entries(terms)) {
    terms[capitalize(key)] = capitalize(value);
}

const regex = new RegExp(Object.keys(terms).join("|"), "g");

const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

while (walker.nextNode()) {
    const node = walker.currentNode;

    // Don't substitute text in input boxes
    if (!node.parentNode.isContentEditable) {
        node.textContent = node.textContent.replace(regex, (match) => terms[match]);
    }
}
