const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const randomColor = require('randomcolor');
const chalk = require('chalk');

const inputSize = process.argv[4] ? process.argv[2] : "31x9"
const inputColor = process.argv[4] ? process.argv[3] : process.argv[2]
const inputLuminocity = process.argv[4] ? process.argv[4] :process.argv[3]


let finalColor = "";
let squareW= inputSize.split("x")[0]
let squareH= inputSize.split("x")[1]

let countIndex = 0;
function hexIndex(){
  const myCount = countIndex;
  countIndex ++;
  return myCount
}


function createPattern(color){

  const W = squareW;
  const H = squareH;
  let r = "";
  let line = 1;
  let place = 0;
  let isMiddle = false;
  const middleLimit = Math.round(H/2);

  //Go about 10x10=100 counts
  for (let i = 1; i <= W*H; i++){

      if (i % W === 0)  { 
        if((line === middleLimit || line === middleLimit-2 || line === middleLimit-1) && i % W === 0) {
          isMiddle= true;}
        else {
          isMiddle= false;};
        //Insert line break every 10 counts
         r += "\n";
         line += 1;
         place = 0;
        }
      else if(isMiddle){ 
        place += 1;


        if(place < 6 || place > W-6){r += "#";}
        else{

          if (place <= Math.round(W/2)+3 && place >= Math.round(W/2)-3 && line===middleLimit){r += color.charAt(hexIndex());}
          else{r += " ";}
        
        }  
      
        }else{
          r += "#";
        }    
  }

  return r;

}




if (inputColor === "ask") {
  rl.question("What is your color ? ", function(myColor) {
  rl.question("What is your luminocity ? ", function(myLuminocity) {
    finalColor = randomColor({hue:myColor, luminosity: myLuminocity});
    const pattern = createPattern(finalColor);
    console.log(chalk.hex(finalColor).bold(pattern));
      rl.close();
  });
});


}else{
finalColor = inputColor 
? randomColor({hue:inputColor, luminosity: inputLuminocity ? inputLuminocity : "light"  }) 
: randomColor();
const pattern = createPattern(finalColor);
console.log(chalk.hex(finalColor).bold(pattern));

rl.close();
};


 



