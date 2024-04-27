function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.substring(1);
}

let terms = {
    "AI": "Fumo",
    "an AI": "a Fumo",
    "artificial intelligence": "Fumo",
    "Artificial Intelligence": "Fumo",
    "ML": "Fumo",
    "an ML": "a Fumo",
    "machine learning": "Fumo",
    "Machine Learning": "Fumo",
    "transformer": "transfumo",
    "LLM": "LLF",
    "language model": "language Fumo",
    "Language Model": "Language Fumo",
    "chatbot": "fumobot",
    "ChatGPT": "ChatFumo",
    "OpenAI": "FumoCorp",
    "Anthropic": "FumoCo",
    "AGI": "Cirno",
    "artificial general intelligence": "Cirno",
};

// Add matches for capitalized and pluralized versions of terms
for (const [term, replacement] of Object.entries(terms)) {
    const capTerm = capitalize(term);
    const capReplacement = capitalize(replacement);

    terms[term + "s"] = replacement + "s";

    if (term !== capTerm) {
        terms[capTerm] = capReplacement;
        terms[capTerm + "s"] = capReplacement + "s";
    }
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
