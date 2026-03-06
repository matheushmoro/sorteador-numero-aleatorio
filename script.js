function generateNumber(){
    const min = Math.ceil(Number(document.querySelector('#min').value));
    const max = Math.floor(Number(document.querySelector('#max').value));
    const resultBox = document.querySelector('#result-box');

    if (!Number.isFinite(min) || !Number.isFinite(max)) {
        alert('Preencha os dois campos com numeros validos.');
        return;
    }

    if (min > max) {
        alert('O valor inicial deve ser menor ou igual ao valor final.');
        return;
    }

    const result = Math.floor(Math.random() * (max - min + 1)) + min;

    resultBox.textContent = result;
    alert(result);
}