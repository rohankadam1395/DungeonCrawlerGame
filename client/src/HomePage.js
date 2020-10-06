import React from 'react';
import './HomePage.css';
import Tile from "./stonetile.jpg";
import Tank from "./tank.jpg";
import Brick from "./brick-wall.png";
import HullUp from "./Hull_Straight.png";
import HullRight from "./Hull_Right.png";
import HullDown from "./Hull_Down.png";
import HullLeft from "./Hull_Left.png";
import imageLoader from "./images.js";
class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            canvasRef: React.createRef(null),
            board: [],
            context: "",
            players: [],
            width: 1000,
            height: 1000,
            cellSize: 50,
            iStart: 0,
            img: "",
            tank: "",
            brick: "",
            tankSprites:[],
            weapons:[],
            images:[]

        }
        this.setUpCanvas = this.setUpCanvas.bind(this);
        this.fillCanvas = this.fillCanvas.bind(this);
        this.createPlayer = this.createPlayer.bind(this);
        this.control = this.control.bind(this);
        this.movePlayer = this.movePlayer.bind(this);
        this.changeDirection = this.changeDirection.bind(this);

        



    }


    changeDirection(direction){
        let tank;
        // console.log(tank);
        
switch(direction){
case "L":
tank=this.state.tankSprites[1];
    break;
    case "U":
        tank=this.state.tankSprites[0];
        break;
        case "R":
            tank=this.state.tankSprites[2];

    break;
    case "D":
        tank=this.state.tankSprites[3];
        break;

}


    this.setState({
        tank:tank
    },()=>{
        console.log("Image tank is set");
    })


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
        // }else if((x+20)===1000 && !y>=0){
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

        this.movePlayer("Rohan", event);
        event.stopPropagation();


    }

    movePlayer(name, event) {
        console.log("In Move Player");
        let tempPlayers = this.state.players.slice();
        let index = 0;
        let toMove = tempPlayers.find((item, index) => {
            console.log("/");
            console.log(item);
            console.log(index);
            // index=index;
            return item.name === name;

        });
        console.log("To move");
        console.log(toMove);


        let x = toMove.x;
        let y = toMove.y;

        let tempBoard = this.state.board.slice();
        let a = x;
        let b = y;


        //  let boardObj=tempBoard[y][x];

        switch (event.keyCode) {
            case 37:
                console.log("In 37");
                if (x > 0 && tempBoard[y][x - 1].identity === "Empty") {
                    x = x - 1;

                } else if (x === 0 && y > 0 && tempBoard[y - 1][this.state.width / this.state.cellSize - 1].identity === "Empty") {
                    y = y - 1;
                    x = (this.state.width / this.state.cellSize) - 1;
                }
                this.changeDirection("L");
                break;
            case 38:
                console.log("In 38");
                if (y > 0 && tempBoard[y - 1][x].identity === "Empty") {
                    y = y - 1;

                }
                this.changeDirection("U");

                break;
            case 39:
                console.log("In 39");
                this.changeDirection("R");


                if (x < ((this.state.width / this.state.cellSize) - 1) && tempBoard[y][x + 1].identity === "Empty") {
                    x = x + 1;
                } else if (x === (this.state.width / this.state.cellSize - 1) && y < (this.state.height / this.state.cellSize) - 1 && tempBoard[y + 1][0].identity === "Empty") {
                    console.log("Here Am i");
                    y = y + 1;
                    x = 0;
                }
                break;
            case 40:
                this.changeDirection("D");

                console.log("In 40");
                if (y < (this.state.height / this.state.cellSize) - 1 && tempBoard[y + 1][x].identity === "Empty") {
                    y = y + 1;

                }
                break;
            default:
                console.log("Default Key pressed");
                break;
        }

        // for(let tempObj of tempPlayers){

        // console.log(tempObj);
        // }

        toMove.x = x;
        toMove.y = y;
        tempPlayers[index] = toMove;

        tempBoard[b][a].identity = "Empty";
        tempBoard[b][a].name = "";
        tempBoard[y][x].name = name;
        tempBoard[y][x].identity = "Player";

        this.setState({
            players: tempPlayers,
            board: tempBoard
        }, () => {

            this.fillCanvas();
        })


    }

    createPlayer(x, y, name) {
        console.log("Creating  player " + x + "  " + y);

        // this.state.context.fillRect(x, y, width, height);
        let tempBoard = this.state.board.slice();
        tempBoard[y][x].identity = "Player";
        tempBoard[y][x].name = name;


        let obj = {
            name: name,
            x: x,
            y: y
        }

        let tempPlayers = this.state.players.slice();
        tempPlayers.push(obj);

        this.setState({
            board: tempBoard,
            players: tempPlayers
        }, () => {
            console.log("In create player");
            // console.log(this.state.board);
            this.fillCanvas();
        })
        // this.fillCanvas();
    }

    fillCanvas() {

        let context = this.state.canvasRef.current.getContext("2d");
        context.clearRect(0, 0, this.state.width, this.state.height);
        // context.fillStyle = "red";
        console.log("Canvas Filling");
        let p = [];
        p = this.state.players.slice();
        //  console.log(JSON.stringify(p[0])+" ++++");


        let iStart = this.state.iStart;
        if (p.length > 0) {
            console.log("Pooooooo  " + iStart);
            // console.log(p[0].x);
            // console.log(p[0].y);
            console.log((this.state.height / this.state.cellSize));
            if (p[0].y > (((this.state.height / this.state.cellSize) / 2) - 1) && p[0].y < (this.state.height / this.state.cellSize)) {
                console.log("Heyyyyyyyyy");
                iStart = p[0].y - (((this.state.height / this.state.cellSize) / 2) - 1);

            } else {
                iStart = 0;
            }

            console.log("new Istart " + iStart);
            this.setState({
                iStart: iStart
            }, () => {
                console.log("Am I late");

                for (let i = 0; i < this.state.height / 2 / this.state.cellSize; i++) {
                    // let jStart=0;
                    for (let j = 0; j < this.state.width / this.state.cellSize; j++) {
                        // console.log("Istart "+iStart);
                        if (this.state.board[iStart][j].identity === "Empty") {

                            // context.strokeRect(j * this.state.cellSize, i * this.state.cellSize, this.state.cellSize, this.state.cellSize);
                            // var path=new Path2D(Square);
                            // context.stroke(path,j * this.state.cellSize, i * this.state.cellSize, this.state.cellSize, this.state.cellSize);

                            // context.fillText(this.state.board[iStart][j].location,j*this.state.cellSize,i*this.state.cellSize+15,15);
                            // var img=document.getElementsByTagName("img")[0];
                            // var img =document.createElement("img");

                            // img.src=Tile;
                            // img.style.height="20px";
                            // img.style.width="20px";
                            // img.height=20;
                            // img.width=20;
                            // console.log(this.state.img);
                            context.drawImage(this.state.img, j * this.state.cellSize, i * this.state.cellSize, this.state.cellSize, this.state.cellSize);
                        }
                        else if (this.state.board[iStart][j].identity === "Brick") {
                            context.drawImage(this.state.brick, j * this.state.cellSize, i * this.state.cellSize, this.state.cellSize, this.state.cellSize);

                        }else if(this.state.board[iStart][j].identity === "Gun"){
                            context.drawImage(this.state.img, j * this.state.cellSize, i * this.state.cellSize, this.state.cellSize, this.state.cellSize);
                           
                        //    console.log("YYYYYYYYYYy");
                        //    console.log((this.state.images));
                           const images=this.state.images.slice();

                        context.drawImage(images[(j%8)], j * this.state.cellSize, i * this.state.cellSize, this.state.cellSize, this.state.cellSize);

                           

                        }
                        else {
                            // context.fillStyle = "green";
                            // context.fillRect(j*this.state.cellSize,i*this.state.cellSize,this.state.cellSize,this.state.cellSize);
                            console.log("Drawing Tank  " + i + "  " + j);
                            context.drawImage(this.state.img, j * this.state.cellSize, i * this.state.cellSize, this.state.cellSize, this.state.cellSize);

                                // console.log(this.state.tank);

                            context.drawImage(this.state.tank, j * this.state.cellSize, i * this.state.cellSize, this.state.cellSize, this.state.cellSize);

                                // this.state.tank.onload=()=>{
                                //     console.log("Onload");
                                //     console.log(this.state.tank);

                                //     context.drawImage(this.state.tank, j * this.state.cellSize, i * this.state.cellSize, this.state.cellSize, this.state.cellSize);

                                // }
                            
                            

                            

                            


                        }

                        //  jStart++;   
                    }
                    iStart++;

                }


            })

        }

    }

    setUpCanvas() {

        // this.state.canvasRef.current.width = this.state.width; //1000
        // this.state.canvasRef.current.height = this.state.height/2; //600
        // this.fillCanvas();



        document.addEventListener("keydown", (event) => {
            console.log(event);

            this.control(event);
        });

        console.log("Setting up Cabvas");

    }
    componentDidMount() {



        let  images=imageLoader();
let htmlimages=[];
htmlimages  =images.map((data,index)=>{
    let gun=document.createElement("img");
    gun.src=data.src;
    return gun;
});
        console.log(images);

        let tempBoard = [];
        let img = document.createElement("img");
        let tankU = document.createElement("img");
        let tankL = document.createElement("img");
        let tankR = document.createElement("img");
        let tankD = document.createElement("img");


        // let tank = new Image(20,20);

        let brick = document.createElement("img");

        let canvasRef = this.state.canvasRef;
        canvasRef.current.width = this.state.width;
        canvasRef.current.height = this.state.height / 2;

        img.src = Tile;

        tankU.src = HullUp;
        tankL.src = HullLeft;
        tankR.src = HullRight;
        tankD.src = HullDown;

       let tankSprites=this.state.tank.slice();
       tankSprites=[tankU,tankL,tankR,tankD];

        brick.src = Brick;
        // tank.alt = "Tank";
        console.log("1");

        for (let i = 0; i < this.state.height / this.state.cellSize; i++) {
            tempBoard[i] = [];
            for (let j = 0; j < this.state.width / this.state.cellSize; j++) {


                // console.log(Math.round(Math.random()*10));
                let rndm = Math.round(Math.random() * 10);
                if (rndm === 1) {
                    tempBoard[i][j] = { identity: "Brick", location: i + " " + j };

                }else if(rndm===2){
                    tempBoard[i][j] = { identity: "Gun", location: i + " " + j };

                } else {
                    tempBoard[i][j] = { identity: "Empty", location: i + " " + j };

                }


            }
        }
        console.log("2");

        // tempBoard[29][0]=-1;
        console.log("3");
tankU.onload=()=>{


    this.setState({
        board: tempBoard,
        img: img,
        tank: tankU,
        tankSprites:tankSprites,
        brick: brick,
        canvasRef: canvasRef,
        images:htmlimages
    }, () => {
        this.setUpCanvas();

        this.createPlayer(0, ((this.state.height / this.state.cellSize) - 1), "Rohan");


    })

}
      
    }

    render() {
        return (
            <div id="home">
           
                <div id="title">

                    <h1>Dungeon</h1>
                </div>
               <div id="middle">
                <div id="playerStats">
                    <h1>Player Stats</h1>
                </div>
                <div id="canvasHold">
                    <canvas id="canvas" ref={this.state.canvasRef} ></canvas>
                </div>
                </div>
                              </div>

        )
    }

}

export default HomePage;