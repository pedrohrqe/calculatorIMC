const data = [
    {
        min: 0,
        max: 18.4,
        classification: "Menor que 18,5",
        info: "Magreza",
        obesity: "0",
    },
    {
        min: 18.5,
        max: 24.9,
        classification: "Entre 18,5 e 24,9",
        info: "Normal",
        obesity: "0",
    },
    {
        min: 25,
        max: 29.9,
        classification: "Entre 25,0 e 29,9",
        info: "Sobrepeso",
        obesity: "I",
    },
    {
        min: 30,
        max: 39.9,
        classification: "Entre 30,0 e 39,9",
        info: "Obesidade",
        obesity: "II",
    },
    {
        min: 40,
        max: 99,
        classification: "Maior que 40,0",
        info: "Obesidade grave",
        obesity: "III",
    },
];

const imcCalculator = document.querySelector("#imc-calculator")
const tableResults = document.querySelector("#table-results")

const height = document.querySelector("#input-height")
const weight = document.querySelector("#input-weight")

const btnClear = document.querySelector("#btn-clear")
const btnCalculate = document.querySelector("#btn-calculate")

const popup = document.querySelector("#popup")

const tableData = document.querySelector("#table-data")

const imcResult = document.querySelector("#imc-result span")
const imcIndex = document.querySelector("#imc-index span")

const btnBack = document.querySelector("#table-results button")

const root = document.documentElement;

const btnSwitchColor = document.getElementById("switchColorMode")

let screen = 1

function createTableIndex(data) {
    for (d of data) {
        const div = document.createElement("div")
        div.classList.add("table-data-index")

        const classification = document.createElement("p")
        classification.innerText = d.classification

        const info = document.createElement("p")
        info.innerText = d.info

        const obesity = document.createElement("p")
        obesity.innerText = d.obesity

        div.appendChild(classification)
        div.appendChild(info)
        div.appendChild(obesity)

        tableData.appendChild(div)
    }
}

function showOrHideResults() {
    imcCalculator.classList.toggle("hide")
    tableResults.classList.toggle("hide")

    if (imcCalculator.classList.contains("hide")) screen = 2
    else screen = 1
}

function calcImc(height, weight) {
    const imc = (weight / (height * height)).toFixed(1)
    return imc
}

function imcInfo(imc, data) {
    let info

    for (dat of data) {
        if (imc >= dat.min && imc <= dat.max) {
            info = dat.info
        }
    }

    if (!info) {
        return null
    }

    return info
}

function validDigits(text) {
    let newText = text.replace(/[^0-9,.]/g, "")
    newText = newText.replace(/,/g, ".")
    return newText
}

function imcColorClassification(value) {
    console.log(value)
    switch (true) {
        case (value >= 0 || value < 18.5):
            return "#d73a1d"
        case (value >= 18.5 || value <= 24, 9):
            return "#397b4d"
        case (value >= 25 || value <= 29, 9):
            return "#e38726"
        case (value >= 30 || value <= 39, 9):
            return "#d73a1d"
        case (value >= 40):
            return "#d73a1d"
        default:
            return "#000000"
    }
}

function showAlert() {
    if (popup.classList.contains("ease-out")) {
        popup.classList.remove("ease-out")
        setTimeout(() => {
            popup.classList.add("ease-out")
        }, 1000);
    }
}

createTableIndex(data);

[height, weight].forEach((el) => {
    el.addEventListener("input", (e) => {
        const updatedValue = validDigits(e.target.value);
        e.target.value = updatedValue;
    });
});

btnClear.addEventListener("click", (e) => {
    e.preventDefault()
    height.value = ""
    weight.value = ""
    console.log("Clique")
})

btnCalculate.addEventListener("click", (e) => {
    if (height.value < 0.5 || height.value > 2.5) {
        showAlert()
        return
    }
    if (weight.value < 20 || weight.value > 400) {
        showAlert()
        return
    }

    const imc = calcImc(height.value, weight.value)
    const imcDesc = imcInfo(imc, data)
    imcResult.style.color = imcColorClassification(imc)
    imcIndex.style.color = imcColorClassification(imc)
    imcResult.innerText = imc
    imcIndex.innerText = imcDesc === null ? "Não encontrada classificação!" : imcDesc
    showOrHideResults()
})

btnBack.addEventListener("click", (e) => {
    e.preventDefault()
    showOrHideResults()
})

window.addEventListener("keydown", (e) => {
    console.log(screen)
    if (e.key === "Enter" && screen == 1) {
        btnCalculate.click()
    }
    else if (e.key === "Backspace" && screen == 2) {
        btnBack.click()
    }
})

document.addEventListener("DOMContentLoaded", (e) => {
    height.focus()
})

btnSwitchColor.addEventListener("click", (e) => {
    e.preventDefault()
    root.classList.toggle('light-theme');
    btnSwitchColor.classList.toggle("light-theme")
})

