const canvas = document.getElementById('network-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let nodes = [];
for(let i=0;i<60;i++){
  nodes.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    vx: (Math.random()-0.5)*0.5,
    vy: (Math.random()-0.5)*0.5
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  
  // Draw lines
  for(let i=0;i<nodes.length;i++){
    for(let j=i+1;j<nodes.length;j++){
      let dx = nodes[i].x - nodes[j].x;
      let dy = nodes[i].y - nodes[j].y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      if(dist<200){
        ctx.strokeStyle = `rgba(123,92,255,${1 - dist/200})`;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }
  
  // Move nodes
  for(let node of nodes){
    node.x += node.vx; node.y += node.vy;
    if(node.x<0||node.x>canvas.width) node.vx*=-1;
    if(node.y<0||node.y>canvas.height) node.vy*=-1;
    ctx.fillStyle = '#7B5CFF';
    ctx.beginPath();
    ctx.arc(node.x,node.y,3,0,Math.PI*2);
    ctx.fill();
  }
  
  requestAnimationFrame(animate);
}
animate();
