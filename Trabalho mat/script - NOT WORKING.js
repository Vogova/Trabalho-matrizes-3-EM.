function calculate() {
    const matrixA = parseMatrix(document.getElementById("matrix-a").value);
    const matrixB = parseMatrix(document.getElementById("matrix-b").value);
    const matrixC = parseMatrix(document.getElementById("matrix-c").value);
    const signA = document.getElementById("sign-a").value === "positive" ? 1 : -1;
    const operation =
      document.getElementById("operation").value === "addition" ? 1 : -1;
    const resultSign =
      document.getElementById("result-sign").value === "positive" ? 1 : -1;
  
    const matrixAB =
      operation === 1 ? addMatrices(matrixA, matrixB) : subtractMatrices(matrixA, matrixB);
    const matrixABC = multiplyMatrices(matrixAB, matrixC);
    const determinantABC = calculateDeterminant(matrixABC) * resultSign;
  
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
      <p>Matriz A + Matriz B = ${printMatrix(matrixAB)}</p>
      <p>Matriz A+B + Matriz C = ${printMatrix(matrixABC)}</p>
      <p>Determinante de A+B+C = ${determinantABC}</p>
      <p>Valor de AB = ${multiplyMatricesABC(matrixA, matrixB)}</p>`
  }
  
  function parseMatrix(matrixStr) {
    const rows = matrixStr.trim().split("\n");
    const matrix = rows.map((row) =>
    row.trim().split(/\s+/).map((value) => parseFloat(value))
    );
    return matrix;
  }
  
  function printMatrix(matrix) {
    return matrix.map
    (function (row) {
    return row.join("\t");
    }).join("\n");
  }
  
  function addMatrices(matrixA, matrixB) {
    const numRows = matrixA.length;
    const numCols = matrixA[0].length;
    const result = new Array(numRows);
    for (let i = 0; i < numRows; i++) {
    result[i] = new Array(numCols);
    for (let j = 0; j < numCols; j++) {
    result[i][j] = matrixA[i][j] + matrixB[i][j];
    }
    }
    return result;
  }
  
  function multiplyMatricesABC(matrixA, matrixB) {
    const numRowsA = matrixA.length;
    const numColsA = matrixA[0].length;
    const numRowsB = matrixB.length;
    const numColsB = matrixB[0].length;
    const result = new Array(numRowsA);
    for (let i = 0; i < numRowsA; i++) {
    result[i] = new Array(numColsB).fill(0);
    for (let j = 0; j < numColsB; j++) {
    for (let k = 0; k < numColsA; k++) {
    result[i][j] += matrixA[i][k] * matrixB[k][j];
    }
    }
    return result;
    }
}

  function subtractMatrices(matrixA, matrixB) {
    const numRows = matrixA.length;
    const numCols = matrixA[0].length;
    const result = new Array(numRows);
    for (let i = 0; i < numRows; i++) {
    result[i] = new Array(numCols);
    for (let j = 0; j < numCols; j++) {
    result[i][j] = matrixA[i][j] - matrixB[i][j];
    }
    }
    return result;
    }
  
  function multiplyMatrices(matrixA, matrixB) {
    const numRowsA = matrixA.length;
    const numColsA = matrixA[0].length;
    const numRowsB = matrixB.length;
    const numColsB = matrixB[0].length;
    if(document.getElementById("result-sign").value === "positive") {
    const result = new Array(numRowsA);
    for (let i = 0; i < numRowsA; i++) {
    result[i] = new Array(numColsB).fill(0);
    for (let j = 0; j < numColsB; j++) {
    for (let k = 0; k < numColsA; k++) {
    result[i][j] += matrixA[i][k] + matrixB[k][j];
    }
  }
  }
  return result;
  }
  if(document.getElementById("result-sign").value === "negative") {
    const result = new Array(numRowsA);
    for (let i = 0; i < numRowsA; i++) {
    result[i] = new Array(numColsB).fill(0);
    for (let j = 0; j < numColsB; j++) {
    for (let k = 0; k < numColsA; k++) {
    result[i][j] += matrixA[i][k] - matrixB[k][j];
    }
    }
    }
    return result;
    }
  }
  
  function calculateDeterminant(matrix) {
  const numRows = matrix.length;
  const numCols = matrix[0].length;
  if (numRows !== numCols) {
  throw new Error("Matrix must be square to calculate determinant");
  }
  if (numRows === 1) {
  return matrix[0][0];
  }
  if (numRows === 2) {
  return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }
  let determinant = 0;
  for (let i = 0; i < numRows; i++) {
  const submatrix = new Array(numRows - 1);
  for (let j = 0; j < numRows - 1; j++) {
  submatrix[j] = new Array(numRows - 1);
  for (let k = 0; k < numRows - 1; k++) {
  submatrix[j][k] = matrix[j + 1][k < i ? k : k + 1];
  }
  }
  const sign = i % 2 === 0 ? 1 : -1;
  determinant += sign * matrix[0][i] * calculateDeterminant(submatrix);
  }
  return determinant;
  }