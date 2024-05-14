async function loadSettings() {
    const settings = await browser.storage.sync.get();

    document.querySelector("#more-fumo").value = settings.more_fumo;
}

function updateSettings(e) {
    e.preventDefault();
    const more_fumo = document.querySelector("#more-fumo").value;
    try {
        JSON.parse(more_fumo);
    } catch (err) {
        alert("More Fumo: JSON Parse Error: " + err);
        return;
    }

    browser.storage.sync.set({ more_fumo });
}

document.addEventListener("DOMContentLoaded", loadSettings);
document.querySelector("form").addEventListener("submit", updateSettings);