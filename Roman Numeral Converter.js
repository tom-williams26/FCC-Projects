let romanNumerals = {
    1000: 'M',
    900: 'CM',
    500: 'D',
    400: 'CD',
    100: 'C',
    90: 'XC',
    50: 'L',
    40: 'XL',
    10: 'X',
    9: 'IX',
    5: 'V',
    4: 'IV',
    1: 'I'
  };

function convertToRoman(num) {

     // Coverts the object into a 2D array and sorts it from highest to lowest.
    let newRomanNumerals = Object.entries(romanNumerals).sort((a, b) => {
      return b[0] - a[0]
    });
  
    let sum = 0;
    let romanNumeral = "";
      // Iterates through each sub array in the parent array.
    for (let i = 0; i < newRomanNumerals.length; i++) {
      // Iterates through the elements in each sub array.
      while (num >= newRomanNumerals[i][0]) 
      { 
        romanNumeral += newRomanNumerals[i][1];
        num -= newRomanNumerals[i][0];
     
       }

     }
  
     return romanNumeral;
  }
  
  let result = convertToRoman(3);
  console.log(result);
  