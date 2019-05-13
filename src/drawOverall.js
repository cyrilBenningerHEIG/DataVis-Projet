Player = require('../data/Player.json')
selectValue="all";
drawGraph()

$("#position").on('change',event => {
	selectValue = d3.select('select').property('value');
  position = selectValue;
  drawGraph();
})

function drawGraph(){
  BestPlayer=Player;
  if(selectValue!="all"){
    BestPlayer=Player.filter(Players => Players.Position == selectValue)
  }  
  console.log(BestPlayer);
  BestPlayer.sort((c1, c2) => c1.Overall > c2.Overall ? -1 : 1)
  BestPlayer = BestPlayer.slice(0,20);
  bb.generate({
    
    data: {
      json: {        
        "Note": BestPlayer.map(({ Overall }) => Overall),
        
      },
      type: 'bar', 
      
    },
    legend:{
      position: "right"
    },
    axis: {
      x: {
        type: "category",
        categories: BestPlayer.map(({ Name }) => Name),
        tick: {
          rotate: 75,
          multiline: false,
        },
        height: 0
      },
      y: {
        label: {
        text: "Note générale",
        position: "outer-center"
        },
        min : BestPlayer[19].Overall
      },
    },
    tooltip:{
      contents: ([{ x,value }],) => `
        <div style="background-color:black;padding:5px;font-family:sans-serif;font-size:0.6em">
          <span style="color:white">
          <img src="${BestPlayer[x].Photo}" class="rounded mx-auto d-block"> <br/>
            Nom : ${BestPlayer[x].Name} <br/>
            Club : ${BestPlayer[x].Club} <br/>
            Nationalité : ${BestPlayer[x].Nationality} <br/>
            Notes générale: ${value}</b><br/>
            </b>
        </span>
        <div>
      ` 
    },
  
    
    bindto: chart
  })
}