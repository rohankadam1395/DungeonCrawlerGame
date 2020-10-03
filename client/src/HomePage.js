import React from 'react';
import './HomePage.css';
class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            canvasRef: React.createRef(null),
            board: [],
            context: "",
            players:[],
            width:1000,
            height:600,
            cellSize:20,
            iStart:0

        }
        this.setUpCanvas = this.setUpCanvas.bind(this);
        this.fillCanvas = this.fillCanvas.bind(this);
        this.createPlayer = this.createPlayer.bind(this);
        this.control = this.control.bind(this);
        this.movePlayer = this.movePlayer.bind(this);



    }

    control(event) {
        console.log("Heyyyy");
//         console.log(event.keyCode);
//         let tempContext=this.state.context;
//         tempContext.clearRect(0, 0, 500, 300);
//         //  this.state.context.clearRect(0, 0, 1000, 600);
//         // this.fillCanvas();
//         let x = this.state.x;
//         let y = this.state.y;
//         console.log("x "+x+" y "+y);
//         switch (event.keyCode) {
//             case 37:
//                 console.log("In 37");
//                 if(x>0){
//                     x=x-20;

//                 }else if(y>0){
//                     y=y-20;
//                     x=1000-20;
//                 }else{
//                     x=1000-20;
//                     y=0;
 
//                 }
//                 break;
//             case 38:
//                 console.log("In 38");
// if(y>-300){
//     y=y-20;

// }
//                 break;
//             case 39:
//                 console.log("In 39");
// if((x+20)<1000){
//     x=x+20;
// }else if((x+20)==1000 && !y>=0){
//     x=0;
//     y=0;
// }else if((y+20)<300){
//     x=0;
//     y=y+20;
// }
//                 break;
//             case 40:
//                 console.log("In 40");
// if((y+20)<300){
//     y=y+20;

// }
//                 break;
//             default:
//                 console.log("Default Key pressed");
//                 break;
//         }

// // if(y>=300){
// //     y=300;
// // }
// this.setState({
//     x:x,
//     y:y,
//     context:tempContext
// },()=>{
//     console.log("Check here");
//     console.log("x "+this.state.x+"  y "+this.state.y);
//     if(y<0){
//         y=0;
//         console.log(">>>>>>PPPPPPPPPP");

//     }
//     if(x>=500){
//         console.log(">>>>>>KKKKKKKkk");
//         x=480;
//     }   
//     this.createPlayer(x,y, 20, 20);

// })

this.movePlayer("Rohan",event);
        event.stopPropagation();


    }

movePlayer(name,event){
    console.log("In Move Player");
let tempPlayers=this.state.players.slice() ;
let index=0;
let toMove=tempPlayers.find((item,index)=>{
    console.log("/");
    console.log(item);
    console.log(index);
    index=index;
        return item.name===name;
    
});
console.log("To move" );
console.log(toMove);


let x=toMove.x;
let y=toMove.y;

let tempBoard=this.state.board.slice();
let a=x;
let b=y;
// let boardObj=tempBoard[y][x];

switch (event.keyCode) {
                case 37:
                    console.log("In 37");
                    if(x>0){
                        x=x-1;
    
                    }else if(y>0){
y=y-1;
x=(this.state.width/this.state.cellSize)-1;
                    }
                    break;
                case 38:
                    console.log("In 38");
    if(y>0){
        y=y-1;
    
    }
                    break;
                case 39:
                    console.log("In 39");
    if(x<((this.state.width/this.state.cellSize)-1)){
        x=x+1;
    }else if(y<(this.state.height/this.state.cellSize)-1){
        console.log("Here Am i");
        y=y+1;
        x=0;
    }
                    break;
                case 40:
                    console.log("In 40");
    if(y<(this.state.height/this.state.cellSize)-1){
        y=y+1;
    
    }
                    break;
                default:
                    console.log("Default Key pressed");
                    break;
            }

// for(let tempObj of tempPlayers){

// console.log(tempObj);
// }

toMove.x=x;
toMove.y=y;
tempPlayers[index]=toMove;

tempBoard[b][a].identity="Empty";
tempBoard[b][a].name="";
tempBoard[y][x].name=name;
tempBoard[y][x].identity="Player";

this.setState({
    players:tempPlayers,
    board:tempBoard
},()=>{
    this.fillCanvas();
})


}

    createPlayer(x,y,name) {
        console.log("Moving player "+x+"  "+y);

        // this.state.context.fillRect(x, y, width, height);
let tempBoard=this.state.board.slice();
tempBoard[y][x].identity="Player";
tempBoard[y][x].name=name;


let obj={
    name:name,
    x:x,
    y:y
}

let tempPlayers=this.state.players;
tempPlayers.push(obj);

this.setState({
    board:tempBoard,
    players:tempPlayers
},()=>{
    this.fillCanvas();  
})
        // this.fillCanvas();
    }

    fillCanvas() {
        
        let context = this.state.canvasRef.current.getContext("2d");
        context.clearRect(0,0,this.state.width,this.state.height);
        context.fillStyle = "red";
        console.log("Canvas Filling");
        let p=[];
        p=this.state.players.slice();
        console.log(JSON.stringify(p[0])+" ++++");
      
        
let iStart=this.state.iStart;
if(p.length>0){
    console.log("Pooooooo  "+iStart);
    console.log(p[0].x);
    console.log(p[0].y);
    if(p[0].y>14 && p[0].y<(this.state.height/this.state.cellSize)){
        console.log("Heyyyyyyyyy");
        iStart=p[0].y-14;
      
    }else{
        iStart=0;
    }
    this.setState({
        iStart:iStart
    })

}
        for(let i=0;i<this.state.height/2/this.state.cellSize;i++){
            let jStart=0;
            for(let j=0;j<this.state.width/this.state.cellSize;j++){
                // console.log("Istart "+iStart);
             if(this.state.board[iStart][j].identity=="Empty"){
                context.strokeRect(j*this.state.cellSize,i*this.state.cellSize,this.state.cellSize,this.state.cellSize);
                context.fillText(this.state.board[iStart][j].location,j*this.state.cellSize,i*this.state.cellSize+15,15);
             }else{
                context.fillRect(j*this.state.cellSize,i*this.state.cellSize,this.state.cellSize,this.state.cellSize);
             }
                    
             jStart++;   
            }
            iStart++;

        }
    }

    setUpCanvas() {

        this.state.canvasRef.current.width = this.state.width; //1000
        this.state.canvasRef.current.height = this.state.height/2; //600
this.fillCanvas();
        


        document.addEventListener("keydown", (event) => {
            console.log(event);
            
                this.control(event);
        });

    }
    componentDidMount() {
        let tempBoard=[];
        console.log("1");
        for(let i=0;i<this.state.height/this.state.cellSize;i++){
tempBoard[i]=[];
            for(let j=0;j<this.state.width/this.state.cellSize;j++){
tempBoard[i][j]={identity:"Empty",location:i+" "+j};
            }
        }
console.log("2");

        // tempBoard[29][0]=-1;
        console.log("3");

        this.setState({
board:tempBoard
        },()=>{
            this.setUpCanvas();

            this.createPlayer(0,29,"Rohan");


        })
    }

    render() {
        return (
            <div id="home">
                <div id="title">
                <h1>Dungeon</h1>
                </div>
                <div id="playerStats">
<h1>Player Stats</h1>
                </div>
                    <div id="canvasHold">
                        <canvas id="canvas" ref={this.state.canvasRef} ></canvas>
                    </div>
                </div>

        )
    }

}

export default HomePage;