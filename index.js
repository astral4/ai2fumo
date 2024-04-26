function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.substring(1);
}

// Add matches for capitalized and pluralized versions of terms
function augmentTerms(terms) {
    for (const [term, replacement] of Object.entries(terms)) {
        const capTerm = capitalize(term);
        const capReplacement = capitalize(replacement);

        terms[term + "s"] = replacement + "s";

        if (term !== capTerm) {
            terms[capTerm] = capReplacement;
            terms[capTerm + "s"] = capReplacement + "s";
        }
    }
}

let terms = {
    "AI": "Fumo",
    " AI": " fumo",
    "[\.] AI": "",
    "an AI": "a fumo",
    "artificial intelligence": "fumo",
    "Artificial Intelligence": "Fumo",
    "ML": "Fumo",
    " ML": " fumo",
    "[\.] ML": "",
    "an ML": "a fumo",
    "machine learning": "fumo",
    "Machine Learning": "Fumo",
    "transformer": "transfumo",
    "LLM": "LLF",
    "language model": "language fumo",
    "Language Model": "Language Fumo",
    "chatbot": "fumobot",
    "ChatGPT": "ChatFumo",
    "OpenAI": "FumoCorp",
    "Anthropic": "FumoCorp",
    "AGI": "Cirno",
    "artificial general intelligence": "Cirno",
};

// Characters like `.` need to be escaped because they have special meaning in regexes.
// However, doing this for a regex makes its text representation different from the text it matches,
// so its entry in `terms` cannot be used for lookups during text replacement.
// To handle this, we use another map where the keys are the actual matched text of these regexes.
let backupMatches = {
    ". AI": ". Fumo",
    ". ML": ". Fumo",
};

augmentTerms(terms);
augmentTerms(backupMatches);

const regex = new RegExp(Object.keys(terms).join("|"), "g");

const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

while (walker.nextNode()) {
    const node = walker.currentNode;

    // Don't substitute text in input boxes
    if (!node.parentNode.isContentEditable) {
        node.textContent = node.textContent.replace(regex, (match) => terms[match] ?? backupMatches[match]);
    }
}
