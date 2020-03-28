var testCase = `5
3 6
AWE.QX
LLL.EO
IZZWLL

1 10
ALLIZZWELL

2 9
A.L.Z.E..
.L.I.W.L.

3 3
AEL
LWZ
LIZ

1 10
LLEWZZILLA`

var Graph = require('./Graph.js')

function runProgram(input){
    input = input.split('\n')
    let t = Number(input[0])
    let pos = 1;
    for(let i=0; i<t; i++){
        let [m,n] = input[pos++].split(' ').map(Number)
        let arr = []
        let graph = new Graph()
        for(let j=0; j<m; j++){
            arr[j] = input[pos++].split('')
        }
        // create graph
        // console.log(arr)
        arr.forEach((rows,row) => {
            // console.log(rows)
            rows.forEach((elem, col)=>{
                 graph.vertexValue[row*n+col] = elem
                 // right
                if(col+1<n){
                    graph.addEdge(row*n+col,row*n+col+1)
                }
                // bottom
                if(row+1<m){
                    graph.addEdge(row*n+col,(row+1)*n+col)
                }
                // bottom-right
                if(row+1<m && col+1<n){
                    graph.addEdge(row*n+col,row+1*n+col+1)
                }
                // top
                if(row-1>=0 ){
                    graph.addEdge(row*n+col,(row-1)*n+col)
                }
                // left
                if(col-1>=0){
                    graph.addEdge(row*n+col,row*n+col-1)
                }
                // left-bottom
                if(row+1<m && col-1>=0){
                    graph.addEdge(row*n+col,(row+1)*n+col-1)
                }
                // top-right
                if(row-1>=0 && col+1<n){
                    graph.addEdge(row*n+col,(row-1)*n+col+1)
                }
                // top-left
                if(row-1>=0 && col-1>=0){
                    graph.addEdge(row*n+col,(row-1)*n+col-1)
                }

            });
        })
        // console.log(graph.bfs(0))
        let flag = false
        for(let j=0; j<m*n; j++){
            if(flag){
                break
            }
            graph.dfs(j,undefined,true)
            if(graph.allizzwell){
                console.log("YES")
                flag = true
            }
        }
        if(!flag){
            console.log("NO")

        }
    }
}

(function(){
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    remainder = "";
    process.stdin.on("data", function (input) {
        remainder += input;
    });

    process.stdin.on("end", function () {
    runProgram(remainder);
    });

    // runProgram(testCase);
})()
    