document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll(".input");
    const generateBtn = document.querySelector(".btn-enter");
    const resultBox = document.querySelector(".result-box");
    const usernameDisplay = document.getElementById("generated-username");
    const copyBtn = document.querySelector(".btn-copy");

    generateBtn.addEventListener("click", async function () {
        const name = inputs[0].value.trim();
        const overrated = inputs[1].value.trim();
        const fav = inputs[2].value.trim();

        if (!name || !overrated || !fav) {
            alert("Please fill in all fields! 😊");
            return;
        }

        // Show loading state
        generateBtn.innerHTML = `<span class="loading"></span> Generating...`;
        generateBtn.disabled = true;
        resultBox.classList.add("hidden");

        try {
            // Method 1: Try OpenAI proxy (Pawan.Krd)
            let username = await tryPawanKrdProxy(name, overrated, fav);

            // Method 2: Try DeepSeek API
            if (!username) {
                username = await tryDeepSeekAPI(name, overrated, fav);
            }

            // Method 3: Local fallback
            if (!username) {
                username = generateLocalUsername(name, overrated, fav);
            }

            // Show result
            usernameDisplay.textContent = username;
            resultBox.classList.remove("hidden");
        } catch (error) {
            console.error("Generation failed:", error);
            alert("Something went wrong. Using fallback method.");
            const username = generateLocalUsername(name, overrated, fav);
            usernameDisplay.textContent = username;
            resultBox.classList.remove("hidden");
        } finally {
            generateBtn.innerHTML = "Generate Username";
            generateBtn.disabled = false;
        }
    });

    // Copy button logic
    copyBtn.addEventListener("click", function () {
        const username = usernameDisplay.textContent;
        navigator.clipboard.writeText(username)
            .then(() => {
                copyBtn.textContent = "Copied!";
                setTimeout(() => {
                    copyBtn.textContent = "Copy";
                }, 2000);
            })
            .catch(() => {
                alert("Failed to copy. Try manually!");
            });
    });

    // Method 1: OpenAI proxy (Pawan)
    async function tryPawanKrdProxy(name, overrated, fav) {
        try {
            const response = await fetch("https://api.pawan.krd/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer pk-this-is-a-free-key"
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "user",
                            content: `Generate a cool GitHub username based on: real name "${name}", overrated name "${overrated}", and favorite number/characters "${fav}". Make it short, unique, and creative. Only respond with the username.`
                        }
                    ],
                    temperature: 0.8,
                    max_tokens: 15
                })
            });

            if (!response.ok) throw new Error("Pawan.Krd API failed");

            const data = await response.json();
            return data.choices[0].message.content.trim();
        } catch (error) {
            console.log("Pawan.Krd proxy failed, trying DeepSeek...");
            return null;
        }
    }

    // Method 2: DeepSeek AI
    async function tryDeepSeekAPI(name, overrated, fav) {
        try {
            const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer sk-397a6a7a7a794f9a9a7a7a7a7a7a7a7a" // Replace if needed
                },
                body: JSON.stringify({
                    model: "deepseek-chat",
                    messages: [
                        {
                            role: "user",
                            content: `Create a GitHub username combining: ${name}, ${overrated}, and ${fav}. Make it unique and techy. Respond only with the username.`
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 15
                })
            });

            if (!response.ok) throw new Error("DeepSeek API failed");

            const data = await response.json();
            return data.choices[0].message.content.trim();
        } catch (error) {
            console.log("DeepSeek failed. Using fallback generator.");
            return null;
        }
    }

    // Method 3: Local creative fallback
    function generateLocalUsername(name, overrated, fav) {
        const randomNum = Math.floor(Math.random() * 1000);
        const prefixes = ["Dev", "Neo", "X", "The", "Code"];
        const suffixes = ["007", "Xyz", "Dev", "AI", "Stack"];

        const pre = prefixes[Math.floor(Math.random() * prefixes.length)];
        const suf = suffixes[Math.floor(Math.random() * suffixes.length)];

        const options = [
            `${pre}${name}${fav}${randomNum}`,
            `${overrated}${suf}${fav}`,
            `${name.slice(0, 2)}${overrated.slice(0, 2)}${fav}${randomNum}`,
            `${fav}${name.slice(0, 3)}${suf}`,
            `The${name}${randomNum}`
        ];

        return options[Math.floor(Math.random() * options.length)];
    }
});
