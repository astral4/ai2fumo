function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.substring(1);
}

const { body } = document;

if (body) {
    let terms = {
        "\bAI\b": "Fumo",
        "artificial intelligence": "Fumo",
        "Artificial Intelligence": "Fumo",
        "an AI": "a Fumo",
        "an artificial intelligence": "a Fumo",
        "an Artificial Intelligence": "a Fumo",
        "\bML\b": "Fumo",
        "machine learning": "Fumo",
        "Machine Learning": "Fumo",
        "an ML": "a Fumo",
        "GPT": "Fumo",
        "stable diffusion": "stable diffumo",
        "Stable Diffusion": "Stable Diffumo",
        "transformer": "transfumo",
        "\bLLM\b": "LLF",
        "language model": "language Fumo",
        "Language Model": "Language Fumo",
        "chatbot": "fumobot",
        "ChatGPT": "ChatFumo",
        "Gemini": "Fumoni",
        "OpenAI": "FumoCorp",
        "Anthropic": "FumoCo",
        "Google": "Fumogle",
        "Microsoft": "Fumosoft",
        "\bAGI\b": "Cirno",
        "artificial general intelligence": "Cirno",
        "Artificial General Intelligence": "Cirno",
    };

    // Add matches for capitalized and pluralized versions of terms
    for (const [term, replacement] of Object.entries(terms)) {
        terms[term + "s"] = replacement + "s";

        const capTerm = capitalize(term);

        if (term !== capTerm) {
            const capReplacement = capitalize(replacement);

            terms[capTerm] = capReplacement;
            terms[capTerm + "s"] = capReplacement + "s";
        }
    }

    const regex = new RegExp(Object.keys(terms).join("|"), "g");

    const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);

    while (walker.nextNode()) {
        const node = walker.currentNode;

        // Don't substitute text in input boxes
        if (!node.parentNode.isContentEditable) {
            node.textContent = node.textContent.replace(regex, (match) => terms[match]);
        }
    }
}
