const tabs = document.querySelectorAll(".image-tab");
const panels = document.querySelectorAll(".content-panel");
const imageTrack = document.querySelector("#imageTrack");
const activeLine = document.querySelector(".active-line");

let currentIndex = 0;
let isAnimating = false;

function activateTab(index) {
    if (index === currentIndex || isAnimating) {
        return;
    }

    isAnimating = true;

    const currentTab = tabs[currentIndex];
    const nextTab = tabs[index];

    // Atualiza o estado das tabs.
    tabs.forEach((tab) => {
        tab.classList.remove("active");
        tab.setAttribute("aria-selected", "false");
    });

    nextTab.classList.add("active");
    nextTab.setAttribute("aria-selected", "true");

    // Move as imagens verticalmente.
    const imageHeight = document.querySelector(".image-tab").offsetHeight;
    imageTrack.style.transform = `translateY(-${index * imageHeight}px)`;

    // Move a pequena barra verde.
    const lineHeight = activeLine.offsetHeight;
    const targetTop = index * imageHeight;
    activeLine.style.top = `${targetTop + Math.min(lineHeight, imageHeight / 2)}px`;

    // Esconde o painel atual.
    panels.forEach((panel) => {
        panel.hidden = true;
        panel.classList.remove("active");
    });

    // Mostra o novo painel.
    const targetPanel = document.getElementById(nextTab.getAttribute("aria-controls"));

    setTimeout(() => {
        targetPanel.hidden = false;
        targetPanel.classList.add("active");

        currentIndex = index;
        isAnimating = false;
    }, 220);
}

function updateInitialLine() {
    activeLine.style.top = "0px";
}

tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        activateTab(index);
    });

    // Navegação pelo teclado.
    tab.addEventListener("keydown", (event) => {
        let newIndex = currentIndex;

        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            newIndex = (currentIndex + 1) % tabs.length;
        }

        if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        }

        if (event.key === "Home") {
            newIndex = 0;
        }

        if (event.key === "End") {
            newIndex = tabs.length - 1;
        }

        if (newIndex !== currentIndex) {
            event.preventDefault();
            tabs[newIndex].focus();
            activateTab(newIndex);
        }
    });
});

window.addEventListener("resize", () => {
    const imageHeight = document.querySelector(".image-tab").offsetHeight;
    imageTrack.style.transition = "none";
    imageTrack.style.transform = `translateY(-${currentIndex * imageHeight}px)`;

    requestAnimationFrame(() => {
        imageTrack.style.transition = "";
    });
});

updateInitialLine();
