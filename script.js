function generateNumber(){
    const minInput = document.querySelector('#min').value.trim();
    const maxInput = document.querySelector('#max').value.trim();

    if (!minInput || !maxInput) {
        alert('Digite os valores mínimo e máximo do sorteio.');
        return;
    }

    const min = Math.ceil(Number(minInput));
    const max = Math.floor(Number(maxInput));
    const resultBox = document.querySelector('#result-box');

    if (max > min) {
        const noRepeat = document.getElementById('no-repeat').checked;
        let result;
        if (noRepeat) {
            // Gera lista de possíveis números não sorteados ainda
            const possibleNumbers = [];
            for (let i = min; i <= max; i++) {
                if (!resultsHistory.includes(i)) {
                    possibleNumbers.push(i);
                }
            }
            if (possibleNumbers.length === 0) {
                alert('Todos os números possíveis já foram sorteados!');
                return;
            }
            // Sorteia entre os não sorteados
            const idx = Math.floor(Math.random() * possibleNumbers.length);
            result = possibleNumbers[idx];
        } else {
            result = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        resultBox.textContent = result;
        addResultToHistory(result);
        alert(result);
    } else {
        alert('O valor mínimo deve ser menor que o valor máximo!');
    }
}

// Lista para armazenar os resultados sorteados
let resultsHistory = [];

function addResultToHistory(result) {
    resultsHistory.push(result);
    updateResultsHistoryOutput();
}

function updateResultsHistoryOutput() {
    const historyOutput = document.getElementById('results-history');
    if (resultsHistory.length === 0) {
        historyOutput.textContent = '-';
    } else {
        historyOutput.textContent = resultsHistory.join(', ');
    }
}

function clearResultsHistory() {
    resultsHistory = [];
    updateResultsHistoryOutput();
}

// Adiciona o event listener ao botão de limpar após o carregamento do DOM
window.addEventListener('DOMContentLoaded', function() {
    const clearBtn = document.getElementById('clear-history');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearResultsHistory);
    }
    updateResultsHistoryOutput();
});