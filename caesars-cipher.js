function isSpecial(character) {
  let regex = /[^A-Za-z0-9]+/gi;
  return regex.test(character);
}

function rot13(str) {
  let encryptedText = str.split("");
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let decodedText = [];
  let alphabetPosition = 0;
  for (let i = 0; i < encryptedText.length; i++) {
    // Check for special characters.
    if (isSpecial(encryptedText[i])) {
      decodedText.push(encryptedText[i]);
    } else {
      if (alphabet.indexOf(encryptedText[i]) >= 13) {
        // subtract by 13 places.
        alphabetPosition = alphabet.indexOf(encryptedText[i]) - 13;
        decodedText.push(alphabet[alphabetPosition])
      } else {
        // add by 13 places.
        alphabetPosition = alphabet.indexOf(encryptedText[i]) + 13;
        decodedText.push(alphabet[alphabetPosition])
      }
    }
  }
  return decodedText.join("");
}


let result = rot13("SERR PBQR PNZC"); // 51744 21434 201215
console.log(result);