class Graph{
    constructor(){
        this.elem = new Map()
        this.vertices = 0
        this.edges = 0 
        this.visited = {}
        this.buffer = []
        this.currentLevel = []
        this.nextLevel = []
        this.levelNo = 0
        this.allizzwell = false
        this.vertexValue = {}
    }
    addVertice(v){
        this.elem.set(v,[])
        this.vertices++
    }
    hasVertice(v){
        return this.elem.has(v)
    }
    getData(v){
        return this.elem.get(v)
    }
    updateData(v,val){
        this.elem.set(v,val)
    }
    addEdge(v1,v2,bidir=false){
        if(!this.hasVertice(v1)){
            this.addVertice(v1)
        }
        if(!this.hasVertice(v2)){
            this.addVertice(v2)
        }
        let val = this.getData(v1)
        val[val.length] = v2
        this.updateData(v1,val)
        if(this.hasEdge(v2,v1)){
            this.edges++
        }
        if(bidir){
            let val = this.getData(v2)
            val[val.length] = v1
            this.updateData(v2,val)
            if(this.hasEdge(v1,v2)){
                this.edges++
            }
        }
    }
    hasEdge(v1,v2){
        // check if v1 is connected to v2
        let val = this.getData(v1)
        if(val.indexOf(v2)){
            return true
        }
        else{
            return false
        }
    }
    noVertices(){
        return this.vertices
    }
    removeEdge(){

    }
    removeVertice(){

    }
    neighbours(v1){
        return this.getData(v1)
    }
    __bfs(){
        let temp = [...this.nextLevel]
        this.currentLevel = temp
        this.nextLevel = []
    }
    bfs(v,level){
        this.visited = {}
        this.currentLevel = [v]
        this.levelNo++
        console.log(v,"- root")
        for(let i=0; i<level; i++){
            this.currentLevel.forEach(a=>{
                let neighbours = this.neighbours(a)
                if(this.visited[a]){
                    return
                }
                this.visited[a] = 1
                neighbours.forEach(child=>{
                    console.log(a,"-",child)
                    this.nextLevel.push(child)
                })
            // console.log(this.nextLevel, this.currentLevel)
        })
        this.__bfs()
        }
    }
    __dfs(v,str='',level,debug=false){
        // console.log(str)
        // if(str.length===10){
        // console.log(str)
        // }
        if(str==='ALLIZZWELL' || str=== 'LLEWZZILLA'){
            // console.log(str,'found')
            this.allizzwell = true
            return
        }
        if(this.allizzwell){
            return
        }
        if(this.visited[v]){
            return
        }
        this.visited[v] = 1
        if(level==null){
            if(level===0){
                return false
            }
            let val = this.getData(v)
            val.forEach(async(a)=>{
                if(debug){
                    console.log(v,"-",a, 'str is',str+a)
                    console.log('str',str+a)
                }
                // console.log(this.vertexValue[a])
                let flag = false
                let str1 = 'ALLIZZWELL'
                let str2 = 'LLEWZZILLA'
                // console.log(str[0]===str1[0]||str[0]===str2[0],
                //             str1[str.length]===this.vertexValue[a] || str2[str.length]===this.vertexValue[a],
                //             str,a)
                if(str[0]===str1[0]){
                    if(str1[str.length]===this.vertexValue[a]){
                        flag = true
                    }
                }
                if(flag)
                    this.__dfs(a,str+this.vertexValue[a])
            })
        }
        else{
            if(level<0){
                return false
            }
            let val = this.getData(v)
            val.forEach(a=>{
                if(debug){
                    console.log(v,"-",a)
                }
                this.__dfs(a,level-1)
            })
        }
    }
    dfs(v,vertex,level,debug=false){
        this.visited = {}
        this.__dfs(v,this.vertexValue[v])
    }
    noEdges(){
        return this.edges
    }
}

module.exports = Graph