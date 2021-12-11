import chalk from "chalk";
const showMessage=(message,type)=>{
    if(type==="error") console.log(chalk.redBright(message));
    else if(type==="success") console.log(chalk.green(message));
    else console.log(message);
}

export default showMessage;