import React from 'react';
import './HomePage.css';
import Tile from "./stonetile.jpg";
import Brick from "./brick-wall.png";
import HullUp from "./Hull_Straight.png";
import HullRight from "./Hull_Right.png";
import HullDown from "./Hull_Down.png";
import HullLeft from "./Hull_Left.png";
import imageLoader from "./images.js";
import Bomb from "./bomb_005.png";
import EnemyTank from "./EnemyTank.png";
import EnemyPawns from "./EnemyPawns.png";
import MediPack from "./medicalPack.png";
import {Animated} from "react-animated-css";

let sounds={
    pickItem:new Audio("http://soundbible.com/grab.php?id=1357&type=mp3"),
    bomb:new Audio("http://soundbible.com/grab.php?id=107&type=mp3"),
    mediPack:new Audio("http://soundbible.com/grab.php?id=1343&type=mp3"),
    step:new Audio("http://soundbible.com/grab.php?id=1705&type=mp3")
}

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            canvasRef: React.createRef(null),
            board: [],
            context: "",
            players: [{}],
            width: 1000,
            height: 1000,
            cellSize: 50,
            iStart: 0,
            img: "",
            tank: "",
            enemyTank: "",
            bomb: "",
            brick: "",
            mediPack:"",
            tankSprites: [],
            weapons: [],
            images: [],
            gunsCollected: [],
            playerInfo: "Loading",
            gameOver: false,
            gameWon:false,
            enemyHealth:100,
            message:"Messages Here"

        }
        this.setUpCanvas = this.setUpCanvas.bind(this);
        this.fillCanvas = this.fillCanvas.bind(this);
        this.createPlayer = this.createPlayer.bind(this);
        this.control = this.control.bind(this);
        this.movePlayer = this.movePlayer.bind(this);
        this.changeDirection = this.changeDirection.bind(this);
        this.canvasLoop = this.canvasLoop.bind(this);
        this.reset = this.reset.bind(this);
        this.initialize = this.initialize.bind(this);
        this.keyDown = this.keyDown.bind(this);

        







    }


reset(){
    // document.removeEventListener();

    // document.removeEventListener("keydown", (event) => {
    //     //console.log(event);

    //     this.control(event);
    // });

this.initialize();

}

    changeDirection(direction) {
        let tank;
        // //console.log(tank);

        switch (direction) {
            case "L":
                tank = this.state.tankSprites[1];
                break;
            case "U":
                tank = this.state.tankSprites[0];
                break;
            case "R":
                tank = this.state.tankSprites[2];

                break;
            case "D":
                tank = this.state.tankSprites[3];
                break;
            default:
                break;

        }


        this.setState({
            tank: tank
        }, () => {
            //console.log("Image tank is set");
        })


    }

    control(event) { 
        //console.log("Heyyyy");
        //         //console.log(event.keyCode);
        //         let tempContext=this.state.context;
        //         tempContext.clearRect(0, 0, 500, 300);
        //         //  this.state.context.clearRect(0, 0, 1000, 600);
        //         // this.fillCanvas();
        //         let x = this.state.x;
        //         let y = this.state.y;
        //         //console.log("x "+x+" y "+y);
        //         switch (event.keyCode) {
        //             case 37:
        //                 //console.log("In 37");
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
        //                 //console.log("In 38");
        // if(y>-300){
        //     y=y-20;

        // }
        //                 break;
        //             case 39:
        //                 //console.log("In 39");
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
        //                 //console.log("In 40");
        // if((y+20)<300){
        //     y=y+20;

        // }
        //                 break;
        //             default:
        //                 //console.log("Default Key pressed");
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
        //     //console.log("Check here");
        //     //console.log("x "+this.state.x+"  y "+this.state.y);
        //     if(y<0){
        //         y=0;
        //         //console.log(">>>>>>PPPPPPPPPP");

        //     }
        //     if(x>=500){
        //         //console.log(">>>>>>KKKKKKKkk");
        //         x=480;
        //     }   
        //     this.createPlayer(x,y, 20, 20);

        // })
        if (this.state.players[0].health > 0) {

            this.movePlayer("Rohan", event);
            if(this.state.enemyHealth===0){
                this.setState({
                    gameOver: true,
                    gameWon:true

                })
            }


        } else {




            this.setState({
                gameOver: true
            })
        }
        event.stopPropagation();


    }

    movePlayer(name, event) {
        //console.log("In Move Player");
        let tempPlayers = this.state.players.slice();
        let index = 0;
        let toMove = tempPlayers.find((item, index) => {
            //console.log("/");
            //console.log(item);
            //console.log(index);
            // index=index;
            return item.name === name;

        });
        //console.log("To move");
        //console.log(toMove);
        let gunsCollected = this.state.gunsCollected.slice();

        let x = toMove.x;
        let y = toMove.y;

        let tempBoard = this.state.board.slice();
        let a = x;
        let b = y;


        //  let boardObj=tempBoard[y][x];
        let bombFlag = false;
        let gunFlag = false;
        let enemyBrick = false;
        let mediFlag=false;

        

        sounds["step"].pause();
        sounds["step"].currentTime=0;
        sounds["step"].play();

        switch (event.keyCode) {
            case 37:
                //console.log("In 37");
                if (x > 0) {

                    if (tempBoard[y][x - 1].identity === "Empty") {
                        x = x - 1;

                    } else if (tempBoard[y][x - 1].identity === "Gun") {
                        //console.log("Gun Type");
                        //console.log(tempBoard[y][x - 1].gunType);
                        gunsCollected.push(tempBoard[y][x - 1].gunType);
                        gunFlag = true;
                        x = x - 1;

                    } else if (tempBoard[y][x - 1].identity === "Bomb") {
                        console.log("Bomb");
                        bombFlag = true;
                    } else if (tempBoard[y][x - 1].identity === "Brick" && tempBoard[y][x - 1].type === "Enemy") {
                        console.log("A Enemy Brick");
                        enemyBrick=true;
                    } else if (tempBoard[y][x - 1].identity === "EnemyPawn") {
                        console.log("Pawn");
                        console.log(tempBoard[y][x - 1]);
                        if(toMove.level>tempBoard[y][x - 1].level ||tempBoard[y][x - 1].health===0 ){
                            console.log(toMove.level+"  To move level");
                            console.log(tempBoard[y][x - 1].level+"  TempBoard level");

                            x = x - 1;

                        }else{
                            if(tempBoard[y][x - 1].health-10>0){
                                tempBoard[y][x - 1].health=tempBoard[y][x - 1].health-10;
                            }
                            bombFlag = true; 
                        }

                    }else if (tempBoard[y][x - 1].identity === "medipack") {
                        console.log("Medipack");

                        x = x - 1;
                        mediFlag=true;


                    } 


                } else if (x === 0 && y > 0) {


                    if (tempBoard[y - 1][this.state.width / this.state.cellSize - 1].identity === "Empty") {

                        y = y - 1;
                        x = (this.state.width / this.state.cellSize) - 1;
                    } else if (tempBoard[y - 1][this.state.width / this.state.cellSize - 1].identity === "Gun") {
                        //console.log("Gun Type");
                        //console.log(tempBoard[y - 1][this.state.width / this.state.cellSize - 1].gunType);
                        gunsCollected.push(tempBoard[y - 1][this.state.width / this.state.cellSize - 1].gunType);
                        gunFlag = true;
                        y = y - 1;
                        x = (this.state.width / this.state.cellSize) - 1;
                    } else if (tempBoard[y - 1][this.state.width / this.state.cellSize - 1].identity === "Bomb") {
                        console.log("Bomb");
                        bombFlag = true;
                    } else if (tempBoard[y - 1][this.state.width / this.state.cellSize - 1].identity === "Brick" && tempBoard[y - 1][this.state.width / this.state.cellSize - 1].type === "Enemy") {
                        console.log("A Enemy Brick");
                        enemyBrick=true;

                    } else if (tempBoard[y-1][this.state.width / this.state.cellSize - 1].identity === "EnemyPawn") {
                        console.log("Pawn");
                        // console.log(tempBoard[y][x - 1]);
                        if(toMove.level>tempBoard[y-1][this.state.width / this.state.cellSize - 1].level ||tempBoard[y-1][this.state.width / this.state.cellSize - 1].health===0 ){
                            console.log(toMove.level+"  To move level");
                            // console.log(tempBoard[y][x - 1].level+"  TempBoard level");

                            y = y - 1;
                            x = (this.state.width / this.state.cellSize) - 1;
                        }else{
                            if(tempBoard[y-1][this.state.width / this.state.cellSize - 1].health-10>0){
                                tempBoard[y-1][this.state.width / this.state.cellSize - 1].health=tempBoard[y-1][this.state.width / this.state.cellSize - 1].health-10;
                            }
                            bombFlag = true; 
                        }

                    }else if (tempBoard[y - 1][this.state.width / this.state.cellSize - 1].identity === "medipack") {

                        y = y - 1;
                        x = (this.state.width / this.state.cellSize) - 1;
                        mediFlag=true;
                    }

                }
                this.changeDirection("L");
                break;
            case 38:
                console.log("In 38");
                if (y > 0) {

                    // console.log("y>0");
                    if (tempBoard[y - 1][x].identity === "Empty") {
                        console.log("Empty Type");

                        y = y - 1;

                    } else if (tempBoard[y - 1][x].identity === "Gun") {
                        console.log("Gun Type");
                        //console.log(tempBoard[y-1][x].gunType);
                        gunsCollected.push(tempBoard[y - 1][x].gunType);
                        gunFlag = true;
                        y = y - 1;

                    } else if (tempBoard[y - 1][x].identity === "Bomb") {
                        console.log("Bomb");
                        bombFlag = true;
                    } else if (tempBoard[y - 1][x].identity === "Brick" && tempBoard[y - 1][x].type === "Enemy") {
                        console.log("A Enemy Brick");
                        enemyBrick=true;

                    }else if (tempBoard[y-1][x].identity === "EnemyPawn") {
                        console.log("Pawn");
                        // console.log(tempBoard[y][x - 1]);
                        if(toMove.level>tempBoard[y-1][x].level ||tempBoard[y-1][x].health===0 ){
                            console.log(toMove.level+"  To move level");
                            console.log(tempBoard[y-1][x].level+"  TempBoard level");

                            y = y - 1;

                        }else{
                            if(tempBoard[y-1][x].health-10>0){
                                tempBoard[y-1][x].health=tempBoard[y-1][x].health-10;
                            }
                            bombFlag = true; 
                        }

                    }else if (tempBoard[y - 1][x].identity === "medipack") {
mediFlag=true;
y = y - 1;


                    }




                }
                this.changeDirection("U");

                break;
            case 39:
                //console.log("In 39");
                this.changeDirection("R");


                if (x < ((this.state.width / this.state.cellSize) - 1)) {
                    if (tempBoard[y][x + 1].identity === "Empty") {
                        x = x + 1;

                    } else if (tempBoard[y][x + 1].identity === "Gun") {
                        //console.log("Gun Type");
                        //console.log(tempBoard[y][x + 1].gunType);
                        gunsCollected.push(tempBoard[y][x + 1].gunType);
                        gunFlag = true;
                        x = x + 1;

                    } else if (tempBoard[y][x + 1].identity === "Bomb") {
                        console.log("Bomb");
                        bombFlag = true;
                    } else if (tempBoard[y][x + 1].identity === "Brick" && tempBoard[y][x + 1].type === "Enemy") {
                        console.log("A Enemy Brick");
                        enemyBrick=true;

                    }else if (tempBoard[y][x+1].identity === "EnemyPawn") {
                        console.log("Pawn");
                        // console.log(tempBoard[y][x - 1]);
                        if(toMove.level>tempBoard[y][x+1].level ||tempBoard[y][x+1].health===0 ){
                            console.log(toMove.level+"  To move level");
                            console.log(tempBoard[y][x+1].level+"  TempBoard level");

                            x = x + 1;

                        }else{
                            if(tempBoard[y][x+1].health-10>0){
                                tempBoard[y][x+1].health=tempBoard[y][x+1].health-10;
                            }
                            bombFlag = true; 
                        }

                    }else if (tempBoard[y][x + 1].identity === "medipack") {

                        mediFlag=true;
                        x = x + 1;


                    }

                } else if (x === (this.state.width / this.state.cellSize - 1) && y < (this.state.height / this.state.cellSize) - 1) {

                    if (tempBoard[y + 1][0].identity === "Empty") {
                        //console.log("Here Am i");
                        y = y + 1;
                        x = 0;
                    } else if (tempBoard[y + 1][0].identity === "Gun") {
                        //console.log("Gun Type");
                        //console.log(tempBoard[y+1][0].gunType);
                        gunsCollected.push(tempBoard[y + 1][0].gunType);
                        gunFlag = true;
                        y = y + 1;
                        x = 0;
                    } else if (tempBoard[y + 1][0].identity === "Bomb") {
                        console.log("Bomb");
                        bombFlag = true;
                    } else if (tempBoard[y + 1][0].identity === "Brick" && tempBoard[y + 1][0].type === "Enemy") {
                        console.log("A Enemy Brick");
                        enemyBrick=true;

                    }else if (tempBoard[y + 1][0].identity === "medipack") {

                        mediFlag=true;
                        y = y + 1;
                        x = 0;

                    }else if (tempBoard[y+1][0].identity === "EnemyPawn") {
                        console.log("Pawn");
                        // console.log(tempBoard[y][x - 1]);
                        if(toMove.level>tempBoard[y+1][0].level ||tempBoard[y+1][0].health===0 ){
                            console.log(toMove.level+"  To move level");
                            console.log(tempBoard[y+1][0].level+"  TempBoard level");

                            y = y + 1;
                            x = 0;
                        }else{
                            if(tempBoard[y+1][0].health-10>0){
                                tempBoard[y+1][0].health=tempBoard[y+1][0].health-10;
                            }
                            bombFlag = true; 
                        }

                    }


                }
                break;
            case 40:
                this.changeDirection("D");

                //console.log("In 40");
                if (y < (this.state.height / this.state.cellSize) - 1) {


                    if (tempBoard[y + 1][x].identity === "Empty") {
                        //console.log("Here Am i");
                        y = y + 1;
                    } else if (tempBoard[y + 1][x].identity === "Gun") {
                        //console.log("Gun Type");
                        //console.log(tempBoard[y + 1][x].gunType);
                        gunsCollected.push(tempBoard[y + 1][x].gunType);
                        gunFlag = true;
                        y = y + 1;
                    } else if (tempBoard[y + 1][x].identity === "Bomb") {
                        console.log("Bomb");
                        bombFlag = true;
                    } else if (tempBoard[y + 1][x].identity === "Brick" && tempBoard[y + 1][x].type === "Enemy") {
                        console.log("A Enemy Brick");
                        enemyBrick=true;

                    }else if (tempBoard[y+1][x].identity === "EnemyPawn") {
                        console.log("Pawn");
                        // console.log(tempBoard[y][x - 1]);
                        if(toMove.level>tempBoard[y+1][x].level ||tempBoard[y+1][x].health===0 ){
                            console.log(toMove.level+"  To move level");
                            console.log(tempBoard[y+1][x].level+"  TempBoard level");

                            y = y + 1;

                        }else{
                            if(tempBoard[y+1][x].health-10>0){
                                tempBoard[y+1][x].health=tempBoard[y+1][x].health-10;
                            }
                            bombFlag = true; 
                        }

                    }else if (tempBoard[y + 1][x].identity === "medipack") {
                        y = y + 1;
mediFlag=true;
                    }



                }
                break;
            default:
                //console.log("Default Key pressed");
                break;
        }

        // for(let tempObj of tempPlayers){

        // //console.log(tempObj);
        // }

        toMove.x = x;
        toMove.y = y;
        let msg=this.state.message;
        if (bombFlag) {
            console.log(toMove.health);
            toMove.health = toMove.health - 10;
            sounds["bomb"].pause();
            sounds["bomb"].currentTime=0;
            sounds["bomb"].play();
            msg="You Hit a Bomb";
        }

        if (gunFlag) {
            toMove.level = toMove.level + 12.5;
            sounds["pickItem"].pause();
            sounds["pickItem"].currentTime=0;
            sounds["pickItem"].play();
            msg="You Picked up a Gun";

        }

        
        if (mediFlag) {
            toMove.health = toMove.health +10;
            
            sounds["mediPack"].pause();
            sounds["mediPack"].currentTime=0;
            sounds["mediPack"].play();
            msg="You Picked up a MediPack";
        }

        

let enemyHealth=this.state.enemyHealth;
        if(enemyBrick){
            msg="Hitting the Enemy";

            sounds["bomb"].pause();
            sounds["bomb"].currentTime=0;
            sounds["bomb"].play();
            console.log(toMove.level+" Level");
            if(toMove.level===100){
                enemyHealth=enemyHealth-20;
                toMove.health = toMove.health - 5;

            }else{
                enemyHealth=enemyHealth-5;
                toMove.health = toMove.health - 20;


            }


        }

        tempPlayers[index] = toMove;

        tempBoard[b][a].identity = "Empty";
        tempBoard[b][a].name = "";
        tempBoard[y][x].name = name;
        tempBoard[y][x].identity = "Player";

        this.setState({
            players: tempPlayers,
            board: tempBoard,
            gunsCollected: gunsCollected,
            enemyHealth:enemyHealth,
            message:msg

        }, () => {

            this.fillCanvas();
        })


    }

    createPlayer(x, y, name) {
        //console.log("Creating  player " + x + "  " + y);

        // this.state.context.fillRect(x, y, width, height);
        let tempBoard = this.state.board.slice();
        tempBoard[y][x].identity = "Player";
        tempBoard[y][x].name = name;
        tempBoard[y][x].health = 100;
        tempBoard[y][x].level = 0;



        let obj = {
            name: name,
            x: x,
            y: y,
            health: 100,
            level: 0
        }

        let tempPlayers = this.state.players.slice();
        tempPlayers[0] = obj;

        this.setState({
            board: tempBoard,
            players: tempPlayers
        }, () => {
            //console.log("In create player");
            // //console.log(this.state.board);
            this.fillCanvas();
        })
        // this.fillCanvas();
    }

    fillCanvas() {

        let context = this.state.canvasRef.current.getContext("2d");
        context.clearRect(0, 0, this.state.width, this.state.height);
        // context.fillStyle = "red";
        //console.log("Canvas Filling");
        let p = [];
        p = this.state.players.slice();
        //  //console.log(JSON.stringify(p[0])+" ++++");


        let iStart = this.state.iStart;
        if (p.length > 0) {
            //console.log("Pooooooo  " + iStart);
            // //console.log(p[0].x);
            // //console.log(p[0].y);
            //console.log((this.state.height / this.state.cellSize));
            console.log(":::::::::::::::::::::::");
            console.log(p[0].y);
            console.log((((this.state.height / this.state.cellSize) / 2) - 1));
            if (p[0].y > (((this.state.height / this.state.cellSize) / 2) - 1) && p[0].y < (this.state.height / this.state.cellSize)) {
                //console.log("Heyyyyyyyyy");
                // iStart = p[0].y - (((this.state.height / this.state.cellSize) /2) - 1);
                if (p[0].y % 10 < 5) {
                    console.log("Hellllllo");
                    iStart = p[0].y - 5;
                    console.log("new istart " + iStart);

                } else {
                    iStart = 10;

                }


                console.log("LLLL");

            } else {
                if (p[0].y - 5 >= 0) {
                    iStart = p[0].y - 5;

                }
                console.log("jjjjjj");

            }

            //console.log("new Istart " + iStart);
            this.setState({
                iStart: iStart
            }, () => {
                //console.log("Am I late");

                for (let i = 0; i < this.state.height / 2 / this.state.cellSize; i++) {
                    // let jStart=0;
                    for (let j = 0; j < this.state.width / this.state.cellSize; j++) {
                        // //console.log("Istart "+iStart);
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
                            // //console.log(this.state.img);
                            context.drawImage(this.state.img, j * this.state.cellSize, i * this.state.cellSize, this.state.cellSize, this.state.cellSize);
                        } else if (this.state.board[iStart][j].identity === "Bomb") {

                            context.drawImage(this.state.img, j * this.state.cellSize, i * this.state.cellSize, this.state.cellSize, this.state.cellSize);

                            context.drawImage(this.state.bomb, j * this.state.cellSize, i * this.state.cellSize, this.state.cellSize, this.state.cellSize);

                        }
                        else if (this.state.board[iStart][j].identity === "Brick") {
                            if (this.state.board[iStart][j].type === "Enemy") {
                                context.drawImage(this.state.img, j * this.state.cellSize, i * this.state.cellSize, this.state.cellSize, this.state.cellSize);

                                context.drawImage(this.state.brick, j * this.state.cellSize, i * this.state.cellSize, this.state.cellSize, this.state.cellSize);

                            } else {
                                context.drawImage(this.state.brick, j * this.state.cellSize, i * this.state.cellSize, this.state.cellSize, this.state.cellSize);

                            }

                        } else if (this.state.board[iStart][j].identity === "Gun") {
                            context.drawImage(this.state.img, j * this.state.cellSize, i * this.state.cellSize, this.state.cellSize, this.state.cellSize);

                            //    //console.log("YYYYYYYYYYy");
                            //    //console.log((this.state.images));
                            const images = this.state.images.slice();

                            context.drawImage(images[this.state.board[iStart][j].gunType], j * this.state.cellSize, i * this.state.cellSize, this.state.cellSize, this.state.cellSize);



                        }else if (this.state.board[iStart][j].identity === "EnemyPawn") {
                            context.drawImage(this.state.img, j * this.state.cellSize, i * this.state.cellSize, this.state.cellSize, this.state.cellSize);
                            context.drawImage(this.state.enemyPawn, j * this.state.cellSize, i * this.state.cellSize, this.state.cellSize, this.state.cellSize);


                        }else if (this.state.board[iStart][j].identity === "medipack") {
                            context.drawImage(this.state.img, j * this.state.cellSize, i * this.state.cellSize, this.state.cellSize, this.state.cellSize);
                            context.drawImage(this.state.mediPack, j * this.state.cellSize, i * this.state.cellSize, this.state.cellSize, this.state.cellSize);


                        }


                        
                        else {
                            // context.fillStyle = "green";
                            // context.fillRect(j*this.state.cellSize,i*this.state.cellSize,this.state.cellSize,this.state.cellSize);
                            //console.log("Drawing Tank  " + i + "  " + j);



                            if (this.state.board[iStart][j].type === "Enemy") {
                                context.drawImage(this.state.img, j * this.state.cellSize, i * this.state.cellSize, this.state.cellSize, this.state.cellSize);
                                context.drawImage(this.state.enemyTank, j * this.state.cellSize, i * this.state.cellSize, this.state.cellSize, this.state.cellSize);


                            } else {
                                context.drawImage(this.state.img, j * this.state.cellSize, i * this.state.cellSize, this.state.cellSize, this.state.cellSize);

                                // //console.log(this.state.tank);

                                context.drawImage(this.state.tank, j * this.state.cellSize, i * this.state.cellSize, this.state.cellSize, this.state.cellSize);

                            }

                            // this.state.tank.onload=()=>{
                            //     //console.log("Onload");
                            //     //console.log(this.state.tank);

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

    keyDown(event){
        this.control(event);

    }

    setUpCanvas() {

        // this.state.canvasRef.current.width = this.state.width; //1000
        // this.state.canvasRef.current.height = this.state.height/2; //600
        // this.fillCanvas();


      


        document.addEventListener("keydown", this.keyDown);

        //console.log("Setting up Cabvas");

    }


    canvasLoop(gunCount, tempBoard) {

        for (let i = 0; i < this.state.height / this.state.cellSize; i++) {
            tempBoard[i] = [];
            for (let j = 0; j < this.state.width / this.state.cellSize; j++) {
                if (i < 3) {

                    if (j === 9 && i === 1) {
                        tempBoard[i][j] = { identity: "Player", type: "Enemy", location: i + " " + j, health: "", level: "" };


                    } else if (j === 8 || j === 10 || (j === 9 && i !== 1)) {
                        tempBoard[i][j] = { identity: "Brick", type: "Enemy", location: i + " " + j, health: "", level: "" };

                    } else {
                        tempBoard[i][j] = { identity: "Empty", location: i + " " + j, health: "", level: "" };

                    }

                } else {



                    // //console.log(Math.round(Math.random()*10));
                    let rndm = Math.round(Math.random() *25);
                    if (rndm === 1) {
                        tempBoard[i][j] = { identity: "Brick", location: i + " " + j, health: "", level: "" };

                    } else if (rndm === 2) {
                        tempBoard[i][j] = { identity: "Bomb", location: i + " " + j, health: "", level: "" };

                    }
                    else if (rndm === 3) {
                        if (gunCount < 8) {
                            tempBoard[i][j] = { identity: "Gun", location: i + " " + j, health: "", level: "", gunType: gunCount };
                            gunCount++;
                        } else {
                            tempBoard[i][j] = { identity: "Empty", location: i + " " + j, health: "", level: "" };

                        }

                    }else if(rndm===4){
                        tempBoard[i][j] = {identity: "EnemyPawn",health:100, level:50, location: i + " " + j };

                    }else if(rndm===5){
                        tempBoard[i][j] = {identity: "medipack",health:10, location: i + " " + j };

                    }
                    else {


                        tempBoard[i][j] = { identity: "Empty", location: i + " " + j, health: "", level: "" };





                    }

                }

            }
        }




    }


    componentDidMount() {

        this.initialize();

    }

    initialize(){

        //console.log("In Moutn");


        let images = imageLoader();
        let htmlimages = [];
        htmlimages = images.map((data, index) => {
            let gun = document.createElement("img");
            gun.src = data.src;
            return gun;
        });
        //console.log(images);

        let tempBoard = [];
        let img = document.createElement("img");
        let tankU = document.createElement("img");
        let tankL = document.createElement("img");
        let tankR = document.createElement("img");
        let tankD = document.createElement("img");
        let bomb = document.createElement("img");
        let enemyTank = document.createElement("img");
        let enemyPawn = document.createElement("img");
        let mediPack = document.createElement("img");

//MediPack
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
        bomb.src = Bomb;
        enemyPawn.src=EnemyPawns;
        enemyTank.src = EnemyTank;
        mediPack.src=MediPack;

        console.log(this.state.tank);
        console.log("tankSprites");
        let tankSprites = this.state.tankSprites.slice();

        tankSprites = [tankU, tankL, tankR, tankD];

        brick.src = Brick;
        // tank.alt = "Tank";
        //console.log("1");
        let gunCount = 0;


        this.canvasLoop(gunCount, tempBoard);



        // this.state.images.map((data,index)=>{
        //     //console.log(tempBoard);
        //     //console.log("TempBorad above");
        //     tempBoard[Math.ceil(Math.random()*(this.state.height / this.state.cellSize))][Math.ceil(Math.random()*(this.state.width / this.state.cellSize))]= { identity: "Gun", location: "",gunType:index};
        //     //console.log(data);
        // });

        // else if(rndm===2){
        //     tempBoard[i][j] = { identity: "Gun", location: i + " " + j ,gunType:Math.round(Math.random()*7)};

        // }
        //console.log("2");

        // tempBoard[29][0]=-1;
        //console.log("3");
        tankU.onload = () => {


            this.setState({
                board: tempBoard,
                img: img,
                tank: tankU,
                bomb: bomb,
                tankSprites: tankSprites,
                brick: brick,
                canvasRef: canvasRef,
                images: htmlimages,
                enemyTank: enemyTank,
                gameWon:false,
                gameOver:false,
                gunsCollected:[],
                enemyHealth:100,
                enemyPawn:enemyPawn,
                mediPack:mediPack
            
            }, () => {
                this.setUpCanvas();

                this.createPlayer(0, ((this.state.height / this.state.cellSize) - 1), "Rohan");
                // this.createPlayer(1,9, "Enemy");



            })

        }
    }

    render() {
        //console.log("Rendering");
        return (
            <div id="home">

                <div id="title">

                    <h1>Dungeon Crawler</h1>
                </div>
                <div id="middle">
                    <div id="playerStats">
                        <h1>Player Stats</h1>
                        <div>
                            {<table>
                                <tbody>

                                    <tr><td>Name</td><td>{this.state.players[0].name}</td></tr>
                                    <tr><td>XP</td><td>0 <progress value={this.state.players[0].level} max="100"></progress> 100</td></tr>

                                    <tr><td>Level</td><td>0 <progress value={this.state.players[0].level} max="100"></progress> 100</td></tr>
                                    <tr><td>Health</td><td>0 <progress value={this.state.players[0].health} max="100"></progress> 100</td></tr>
                                </tbody>

                            </table>

                            }


                            <div>{this.state.gameOver && <div><h1>Game Over!!!</h1>  <button onClick={this.reset}>Reset</button></div>}</div>
                        <div>{this.state.gameWon && <h1>You Won!!!!</h1>}</div>
                            

                        </div>
                        <div id="weaponCollection">
                            {this.state.gunsCollected.map((data, index) => {
                                //console.log(this.state.images[data].src);
                                return <div id="wepaonListElement"><img alt={index} className="weapons" src={this.state.images[data].src}></img></div>;
                            })}
                        </div>
                        <h1>Enemy Stats</h1>
                        <div>
                            {<table>
                                <tbody>

                                    <tr><td>Health</td><td>0 <progress value={this.state.enemyHealth} max="100"></progress> 100</td></tr>
                                </tbody>

                            </table>

                            }


                            {/* <div>{this.state.gameOver && <h1>Game Over!!!</h1>}</div> */}


                        </div>
                    </div>
      

                    <div id="canvasHold">
                        <canvas id="canvas" ref={this.state.canvasRef} ></canvas>
                        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                        <div id="infoBg">{this.state.message}</div>
                        </Animated>
                    </div>
                    

                </div>

            </div>

        )
    }

}

export default HomePage;