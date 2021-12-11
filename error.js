import chalk from "chalk";
const showError=(message,type)=>{
    if(type==="error") console.log(chalk.redBright(message));
    else if(type==="success") console.log(chalk.green(message));
}

export default showError;