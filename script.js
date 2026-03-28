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
                const total = max - min + 1;
                if (resultsHistory.length >= total) {
                    alert('Todos os números possíveis já foram sorteados!');
                    return;
                }
                let attempts = 0;
                do {
                    result = Math.floor(Math.random() * (max - min + 1)) + min;
                    attempts++;
                    if (attempts > 1000) {
                        alert('Não foi possível encontrar um número não repetido rapidamente. Tente limpar o histórico.');
                        return;
                    }
                } while (resultsHistory.includes(result));
            } else {
                result = Math.floor(Math.random() * (max - min + 1)) + min;
            }
        resultBox.textContent = result;
        
        const digitCount = String(result).length;
        if (digitCount > 8) {
            // Calcula largura mínima baseada na quantidade de dígitos (aprox. 1ch por dígito + padding)
            resultBox.style.width = `calc(${digitCount}ch + 2.5rem)`;
        } else {
            resultBox.style.width = '';
        }
        addResultToHistory(result);
        alert(`O Número sorteado foi: ${result}`);
        console.log();
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