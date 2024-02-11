const factElement = document.getElementById('fact');
    const reloadBtn = document.getElementById('reload-btn');

    async function getCatFact() {
        try {
            const response = await fetch('https://catfact.ninja/fact');
            const data = await response.json();
            return data.fact;
        } catch (error) {
            console.error('Error fetching cat fact:', error);
            return 'Failed to fetch cat fact';
        }
    }

    async function displayCatFact() {
        const fact = await getCatFact();
        factElement.textContent = fact;
    }

    reloadBtn.addEventListener('click', displayCatFact);

    // Initial display
    displayCatFact();