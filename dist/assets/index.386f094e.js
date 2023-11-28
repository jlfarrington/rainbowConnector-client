import{C as e,F as t,I as n,B as a,a as s,L as o,b as l,H as i,l as r,M as m,c,j as h,T as d,d as p,e as u,D as g,S as E,f as b,g as w,h as k,i as f,R as C,k as y,m as T}from"./vendor.9bbecfb0.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(n){const a=new URL(e,location),s=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((n,o)=>{const l=new URL(e,a);if(self[t].moduleMap[l])return n(self[t].moduleMap[l]);const i=new Blob([`import * as m from '${l}';`,`${t}.moduleMap['${l}']=m;`],{type:"text/javascript"}),r=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(i),onerror(){o(new Error(`Failed to import: ${e}`)),s(r)},onload(){n(self[t].moduleMap[l]),s(r)}});document.head.appendChild(r)})),self[t].moduleMap={}}}("/assets/");let S="https://rainbowconnector-api.onrender.com";switch(window.location.hostname){case"localhost":case"127.0.0.1":S="http://localhost:3000";break;case"https://rainbowconnector-ui.onrender.com/auth":case"https://rainbowconnector-ui.onrender.com/":S="https://rainbowconnector-api.onrender.com";break;case"http://rainbowconnector-ui.onrender.com/":case"http://rainbowconnector-ui.onrender.com/auth":S="http://rainbowconnector-api.onrender.com"}var N=S;class v extends e.Component{constructor(e){super(e),this.state={email:"",password:"",firstName:"",lastName:""}}handleSubmit(e){fetch(`${N}/user/register`,{method:"POST",body:JSON.stringify({user:{firstName:this.state.firstName,lastName:this.state.lastName,email:this.state.email,password:this.state.password,isAdmin:!1}}),headers:new Headers({"Content-Type":"application/json"})}).then((e=>e.json())).then((e=>{console.log(e),this.props.updateToken(e.token,e.user.isAdmin)}))}render(){return e.createElement("div",{className:"Register"},e.createElement("h1",null,"Register"),e.createElement(t,{name:"normal_long",className:"register-form",onFinish:e=>this.handleSubmit(e)},e.createElement(t.Item,{className:"first-name",rules:[{required:!0,message:"Please input your first name!"}]},e.createElement(n,{placeholder:"First Name",onChange:e=>this.setState({firstName:e.target.value})})),e.createElement(t.Item,{className:"last-name",rules:[{required:!0,message:"Please input your last name!"}]},e.createElement(n,{placeholder:"Last Name",onChange:e=>this.setState({lastName:e.target.value})})),e.createElement(t.Item,{className:"email",rules:[{required:!0,message:"Please input your Email!"}]},e.createElement(n,{placeholder:"Email",onChange:e=>this.setState({email:e.target.value})})),e.createElement(t.Item,{className:"password",rules:[{required:!0,message:"Please input your Password!"}]},e.createElement(n,{type:"password",placeholder:"Password",onChange:e=>this.setState({password:e.target.value})})),e.createElement(t.Item,null,e.createElement(a,{type:"primary",htmlType:"submit",className:"auth-form-button"},"Register"))))}}class D extends e.Component{constructor(e){super(e),this.state={email:"",password:""}}handleSubmit(e){fetch(`${N}/user/login`,{method:"POST",body:JSON.stringify({user:{email:this.state.email,password:this.state.password}}),headers:new Headers({"Content-Type":"application/json"})}).then((e=>e.json())).then((e=>{console.log(e),this.props.updateToken(e.token,e.user.isAdmin)}))}render(){return e.createElement("div",{className:"login"},e.createElement("h1",null,"Log In"),e.createElement(t,{name:"normal_long",className:"login-form",onFinish:e=>this.handleSubmit(e)},e.createElement(t.Item,{className:"email",rules:[{required:!0,message:"Please input your Email!"}]},e.createElement(n,{placeholder:"Email",onChange:e=>this.setState({email:e.target.value})})),e.createElement(t.Item,{className:"password",rules:[{required:!0,message:"Please input your Password!"}]},e.createElement(n,{type:"password",placeholder:"Password",onChange:e=>this.setState({password:e.target.value})})),e.createElement(t.Item,null,e.createElement(a,{type:"primary",htmlType:"submit",className:"auth-form-button"},"Log in"))))}}var A="/assets/rainbow-icon.26a7f9b0.png";class R extends e.Component{constructor(e){super(e),this.state={toggle:!0}}render(){return e.createElement("div",{className:"card-login",id:"cardls"},e.createElement("img",{src:A,id:"auth-hero-img"}),this.state.toggle?e.createElement(D,{updateToken:this.props.updateToken}):e.createElement(v,{updateToken:this.props.updateToken}),e.createElement("br",null),e.createElement("p",{className:"link",onClick:()=>this.setState({toggle:!this.state.toggle})},this.state.toggle?"No Account? Click here to register.":"I have an account. Sign in."))}}const{TextArea:j}=n,I=({onChange:n,onSubmit:s,submitting:o,value:l})=>e.createElement(e.Fragment,null,e.createElement(t.Item,null,e.createElement(j,{rows:2,onChange:n,value:l,placeholder:"Add a comment"})),e.createElement(t.Item,null,e.createElement(a,{htmlType:"submit",loading:o,onClick:s,className:"add-comment-btn"},"Add Comment")));class $ extends e.Component{constructor(e){super(e),this.handleSubmit=()=>{this.state.value&&(this.setState({submitting:!0}),setTimeout((()=>{this.props.token&&(fetch(`${N}/comment/post/${this.props.rainbow.id}`,{method:"POST",headers:new Headers({"Content-Type":"application/json",Authorization:this.props.token}),body:JSON.stringify({comment:{body:this.state.value,likes:0}})}).then((e=>e.json())).then((e=>{console.log(e)})),this.setState({submitting:!1,value:""}),this.props.getComments())}),1e3))},this.handleChange=e=>{this.setState({value:e.target.value})},this.state={value:"",submitting:!1}}render(){const{submitting:t,value:n}=this.state;return e.createElement(s,{content:e.createElement(I,{onChange:this.handleChange,onSubmit:this.handleSubmit,submitting:t,value:n})})}}class P extends e.Component{constructor(e){super(e),this.getComments=()=>{this.props.token&&fetch(`${N}/comment/${this.props.rainbow.id}`,{method:"GET",headers:new Headers({"Content-Type":"application/json",Authorization:this.props.token})}).then((e=>e.json())).then((e=>{console.log(e),this.setState({commentsData:e})}))},this.likeComment=e=>{let t=e.likes+1;this.props.token&&fetch(`${N}/comment/${e.id}`,{method:"PUT",headers:new Headers({"Content-Type":"application/json",Authorization:this.props.token}),body:JSON.stringify({comment:{body:e.body,likes:t}})}).then((e=>e.json())).then((e=>{console.log(e)})),this.getComments()},this.state={likesCount:0,commentsData:null}}componentDidMount(){this.getComments()}render(){var t;return e.createElement(e.Fragment,null,null==(t=this.state.commentsData)?void 0:t.map(((t,n)=>e.createElement("div",{className:"comment-section",key:n},e.createElement(s,{author:e.createElement("b",null,"Comment Author"),content:e.createElement("p",null,t.body)}),e.createElement(o,{onClick:()=>this.likeComment(t)})," ",t.likes))),e.createElement($,{rainbow:this.props.rainbow,token:this.props.token,getComments:this.getComments}))}}class L extends e.Component{constructor(e){super(e),this.likeRainbow=e=>{let t=e.likes+1;this.props.token&&fetch(`${N}/rainbow/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:this.props.token},body:JSON.stringify({rainbow:{image:e.image,likes:t,lat:e.lat,long:e.long}})}).then((e=>console.log(e.json()))),this.setState({likesCount:t})},this.state={rainbowData:null,likesCount:this.props.rainbow.likes}}render(){return e.createElement("div",{className:"card-wrapper"},e.createElement(l,{className:"rainbow-card"},e.createElement("img",{src:this.props.rainbow.image,className:"rainbow-image"}),e.createElement("div",null,e.createElement(i,{twoToneColor:"#ff3c38",onClick:()=>this.likeRainbow(this.props.rainbow)})," ",this.state.likesCount),e.createElement(P,{rainbow:this.props.rainbow,token:this.props.token})))}}class x extends e.Component{constructor(e){super(e),this.getRainbows=e=>{e&&fetch(`${N}/rainbow/`,{method:"GET",headers:new Headers({"Content-Type":"application/json",Authorization:e})}).then((e=>e.json())).then((e=>{console.log(e),this.setState({rainbowData:e})}))},this.state={rainbowData:null}}componentDidMount(){let e=localStorage.getItem("token");this.getRainbows(e)}render(){var t;return e.createElement("div",{className:"rainbow-feed-wrapper"},null==(t=this.state.rainbowData)?void 0:t.map(((t,n)=>e.createElement(L,{rainbow:t,key:n,token:this.props.token}))))}}const M=r.icon({iconUrl:A,iconSize:[50,50],shadowSize:[10,10],iconAnchor:[25,25],shadowAnchor:[0,0],popupAnchor:[0,-10]});class U extends e.Component{constructor(e){super(e),this.getRainbows=e=>{e&&fetch(`${N}/rainbow/`,{method:"GET",headers:new Headers({"Content-Type":"application/json",Authorization:e})}).then((e=>e.json())).then((e=>{console.log(e),this.setState({rainbowData:e})}))},this.likeRainbow=e=>{if(this.props.token){let t=e.likes+1;fetch(`${N}/rainbow/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:this.props.token},body:JSON.stringify({rainbow:{image:e.image,likes:t,lat:e.lat,long:e.long}})}).then((e=>console.log(e.json())))}this.getRainbows(this.props.token)},this.reportRainbow=async e=>{if(this.state.modalVisible){if(e.preventDefault(),this.props.token){const e=await fetch(`${N}/rainbow/cloudsign`,{method:"GET",headers:{Authorization:this.props.token}}),{sig:t,ts:n}=await e.json(),a=document.getElementById("file-input").files[0],s=new FormData;s.append("file",a);const o=await(await fetch(`https://api.cloudinary.com/v1_1/rainbowconnector/image/upload?api_key=118619554811256&timestamp=${n}&signature=${t}&upload_preset=euqfw3n3`,{method:"POST",body:s})).json();console.log(o),o&&(this.setState({userRainbow:o.secure_url}),console.log(this.state.userRainbow),await(await fetch(`${N}/rainbow/report`,{method:"POST",headers:{Authorization:this.props.token,"Content-Type":"application/json"},body:JSON.stringify({rainbow:{image:this.state.userRainbow,likes:0,lat:this.state.selectedPosition[0],long:this.state.selectedPosition[1]}})})).json())}this.getRainbows(this.props.token)}},this.showModal=()=>{this.state.modalVisible||this.setState({modalVisible:!0}),console.log("modal triggered")},this.handleOk=()=>(this.state.confirmLoading||(this.setState({confirmLoading:!0}),this.forceUpdate()),setTimeout((()=>{this.setState({modalVisible:!1,confirmLoading:!1})}),2e3),null),this.handleCancel=()=>{console.log("clicked cancel button"),this.state.modalVisible&&this.setState({modalVisible:!1})},this.normFile=e=>(console.log("Upload event:",e),Array.isArray(e)?e:e&&e.fileList),this.state={rainbowData:null,userPosition:[this.props.lat,this.props.long],selectedPosition:[0,0],modalVisible:!1,modalText:"content",confirmLoading:!1,userRainbow:"#"}}componentDidMount(){let e=localStorage.getItem("token");this.getRainbows(e)}render(){return e.createElement("div",{className:"mapWrapper"},e.createElement(m,{id:"mapId",center:this.state.userPosition,zoom:5,scrollWheelZoom:!0,style:{width:"device-width",height:"device-height"}},e.createElement(c,null,(e=>(e.on("click",(t=>{let n;const{lat:a,lng:s}=t.latlng;this.setState({selectedPosition:[a,s]}),console.log("you clicked the map at LAT: "+a+"and LONG: "+s),n=r.marker([a,s],{icon:M});n.bindPopup('\n                <div className="reportPopup"><button class="delete-button">Report a Rainbow!</button></div>').on("popupopen",(()=>{h(".delete-button").on("click",(e=>{e.preventDefault(),this.showModal()}))})),n.addTo(e),n.openPopup(),e.on("click",(t=>{null!=n&&n.removeFrom(e)}))})),null))),e.createElement(d,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),e.createElement(c,null,(e=>{var t;return null==(t=this.state.rainbowData)||t.map(((t,n)=>{let a,s=[t.lat,t.long];a=r.marker(s,{icon:M});let o=`<div id="rainbowPopup"><img src=${t.image} width="250px" key=${n} />\n                <div id="rainbowDetails"><button class="delete-button" id="likeBtn">Like</button> <div id="likes">Likes: ${t.likes}</div></div> </div>`;const l=t;a.bindPopup(o).on("popupopen",(()=>{h(".delete-button").on("click",(e=>{e.preventDefault(),this.likeRainbow(l),a.closePopup()}))})),a.addTo(e)})),null}))),e.createElement(p,{title:"Report a Rainbow",visible:this.state.modalVisible,onOk:this.handleOk,confirmLoading:this.state.confirmLoading,onCancel:this.handleCancel},e.createElement("form",{encType:"multipart/form-data",onSubmit:this.reportRainbow},e.createElement("input",{id:"file-input",type:"file"}),e.createElement("br",null),"#"===this.state.userRainbow?e.createElement("p",null,"Upload an image of your rainbow!"):e.createElement("p",null,"success"),e.createElement("button",null,"Upload Image!"))))}}class O extends e.Component{constructor(t){super(t),this.getUsers=e=>{e&&fetch(`${N}/user/userinfo`,{method:"GET",headers:new Headers({"Content-Type":"application/json",Authorization:e})}).then((e=>e.json())).then((e=>{console.log(e),this.setState({userData:e})}))},this.deleteUser=e=>{this.props.token&&fetch(`${N}/user/delete/${e.id}`,{method:"DELETE",headers:new Headers({"Content-Type":"application/json",Authorization:this.props.token})}).then((e=>console.log(e.json()))),this.getUsers(this.props.token)},this.promoteAdmin=e=>{this.props.token&&fetch(`${N}/user/update/${e.id}`,{method:"PUT",headers:new Headers({"Content-Type":"application/json",Authorization:this.props.token}),body:JSON.stringify({user:{isAdmin:!0}})}).then((e=>console.log(e.json()))),this.getUsers(this.props.token)},this.userMapper=()=>{if(this.state.userData)return this.state.userData.map(((t,n)=>e.createElement("tr",{key:n},e.createElement("td",null,t.firstName),e.createElement("td",null,t.lastName),e.createElement("td",null,t.email),e.createElement("td",null," ",e.createElement(a,{onClick:()=>this.deleteUser(t)},"Delete User"),t.isAdmin?null:e.createElement(a,{onClick:()=>this.promoteAdmin(t)},"Promote to Admin")))))},this.state={userData:null}}componentDidMount(){const e=localStorage.getItem("token");this.getUsers(e)}render(){return e.createElement(e.Fragment,null,e.createElement("h1",{className:"admin-title"},"Users"),e.createElement("div",{className:"admin-table-wrapper"},e.createElement("table",{className:"admin-table"},e.createElement("thead",null,e.createElement("tr",null,e.createElement("th",null,"First Name"),e.createElement("th",null,"Last Name"),e.createElement("th",null,"Email"),e.createElement("th",null,"Actions"))),e.createElement("tbody",null,this.state.userData?this.userMapper():null))))}}class z extends e.Component{constructor(t){super(t),this.getRainbows=e=>{e&&fetch(`${N}/rainbow/`,{method:"GET",headers:new Headers({"Content-Type":"application/json",Authorization:e})}).then((e=>e.json())).then((e=>{console.log(e),this.setState({rainbowData:e})}))},this.deleteRainbow=e=>{this.props.token&&fetch(`${N}/rainbow/${e.id}`,{method:"DELETE",headers:new Headers({"Content-Type":"application/json",Authorization:this.props.token})}).then((e=>console.log(e.json()))),this.getRainbows(this.props.token)},this.rainbowMapper=()=>{if(this.state.rainbowData)return this.state.rainbowData.map(((t,n)=>e.createElement("tr",{key:n},e.createElement("td",null,e.createElement("img",{src:t.image,className:"rainbow-table-img"})),e.createElement("td",null,t.likes),e.createElement("td",null,Math.round(t.lat)),e.createElement("td",null,Math.round(t.long)),e.createElement("td",null," ",e.createElement(a,{onClick:()=>this.deleteRainbow(t)},"Delete Rainbow")))))},this.state={rainbowData:null}}componentDidMount(){const e=localStorage.getItem("token");this.getRainbows(e)}render(){return e.createElement(e.Fragment,null,e.createElement("h1",{className:"admin-title"},"Rainbows"),e.createElement("div",{className:"admin-table-wrapper"},e.createElement("table",{className:"admin-table"},e.createElement("thead",null,e.createElement("tr",null,e.createElement("th",null,"Rainbow Image"),e.createElement("th",null,"Number of Likes"),e.createElement("th",null,"Latitude (rounded)"),e.createElement("th",null,"Longitude (rounded)"),e.createElement("th",null,"Actions"))),e.createElement("tbody",null,this.state.rainbowData?this.rainbowMapper():null))))}}class F extends e.Component{constructor(t){super(t),this.getComments=e=>{e&&fetch(`${N}/comment/all`,{method:"GET",headers:new Headers({"Content-Type":"application/json",Authorization:e})}).then((e=>e.json())).then((e=>{console.log(e),this.setState({commentsData:e})}))},this.deleteComment=e=>{this.props.token&&fetch(`${N}/comment/${e.id}`,{method:"DELETE",headers:new Headers({"Content-Type":"application/json",Authorization:this.props.token})}).then((e=>console.log(e.json()))),this.getComments(this.props.token)},this.commentMapper=()=>{if(this.state.commentsData)return this.state.commentsData.map(((t,n)=>e.createElement("tr",{key:n},e.createElement("td",null,t.body),e.createElement("td",null,t.likes),e.createElement("td",null,t.rainbowId),e.createElement("td",null," ",e.createElement(a,{onClick:()=>this.deleteComment(t)},"Delete Comment")))))},this.state={commentsData:null}}componentDidMount(){const e=localStorage.getItem("token");this.getComments(e)}render(){return e.createElement(e.Fragment,null,e.createElement("h1",{className:"admin-title"},"Comments"),e.createElement("div",{className:"admin-table-wrapper"},e.createElement("table",{className:"admin-table"},e.createElement("thead",null,e.createElement("tr",null,e.createElement("th",null,"Comment Body"),e.createElement("th",null,"Number of Likes"),e.createElement("th",null,"Rainbow ID"),e.createElement("th",null,"Actions"))),e.createElement("tbody",null,this.state.commentsData?this.commentMapper():null))))}}class H extends e.Component{render(){return e.createElement("div",{className:"footer"},e.createElement("p",null,"- Someday we'll find it - the rainbow connection - the lovers, the dreamers, and me. -"),e.createElement("p",null,"© 2023, Jennifer Farrington"))}}class _ extends e.Component{render(){return e.createElement("div",{className:"nav-main"},e.createElement("ul",null,e.createElement("li",null,e.createElement(u,{to:"/map",className:"underline"},"Rainbow Map")," "),e.createElement("li",null,"| "),e.createElement("li",null,e.createElement(u,{to:"/feed",className:"underline"},"Rainbow Feed"))))}}const J=e.createElement(b,{className:"adminMenu"},e.createElement(b.Item,{key:"0"},e.createElement(u,{to:"/users"},"Users")),e.createElement(b.Divider,null),e.createElement(b.Item,{key:"1"},e.createElement(u,{to:"/rainbows"},"Rainbows")),e.createElement(b.Divider,null),e.createElement(b.Item,{key:"2"},e.createElement(u,{to:"/comments"},"Comments")));class G extends e.Component{constructor(e){super(e),this.state={collapsed:!0}}render(){return e.createElement(e.Fragment,null,e.createElement("h1",{id:"title"},"Rainbow Connector","true"===localStorage.getItem("isAdmin")&&""!=localStorage.getItem("token")?e.createElement(g.Button,{className:"logout-menu",onClick:()=>this.props.clearToken(),overlay:J,placement:"bottomCenter",icon:e.createElement(E,null)},"Log Out"):""!=localStorage.getItem("token")&&"false"==localStorage.getItem("isAdmin")?e.createElement(a,{className:"logout-menu",onClick:()=>this.props.clearToken()},"Log Out"):null))}}const{Header:V,Footer:q,Content:B}=k;class W extends e.Component{constructor(e){super(e),this.getLocation=()=>{navigator.geolocation.getCurrentPosition((e=>{let t=e.coords.latitude,n=e.coords.longitude;e&&(this.setState({lat:t,long:n}),console.log("location --\x3e",this.state.lat,this.state.long))}),(e=>console.log("locator failed")))},this.updateToken=(e,t)=>{localStorage.setItem("token",e),console.log("token ---\x3e",e),localStorage.setItem("isAdmin",t.toString()),this.setState({sessionToken:e,isAdmin:t}),console.log("isAdmin ---\x3e ",t)},this.clearToken=()=>{localStorage.clear(),this.setState({sessionToken:"",loggedIn:!1})},this.state={sessionToken:"",lat:35,long:-86,rainbowData:[],loggedIn:!1,isAdmin:!1}}componentDidMount(){if(localStorage.getItem("token")){let e=localStorage.getItem("token");this.setState({sessionToken:e,loggedIn:!0}),this.getLocation()}localStorage.getItem("isAdmin")&&(localStorage.getItem("isAdmin"),this.setState({isAdmin:!0}))}render(){return e.createElement(w,null,e.createElement(k,{className:"antd-layout"},e.createElement(V,{className:"header-section"},e.createElement(G,{clearToken:this.clearToken})),e.createElement(B,{className:"content-section"},""!=this.state.sessionToken?e.createElement(_,null):null,e.createElement("div",{className:"switch-routes"},e.createElement(f,null,e.createElement(C,{exact:!0,path:"/"},""!=this.state.sessionToken?e.createElement(y,{to:"/map"}):e.createElement(y,{to:"/auth"})),e.createElement(C,{exact:!0,path:"/auth"},""!=this.state.sessionToken?e.createElement(y,{to:"/map"}):e.createElement(R,{updateToken:this.updateToken})),e.createElement(C,{exact:!0,path:"/map"},""!=this.state.sessionToken?e.createElement(U,{token:this.state.sessionToken,lat:this.state.lat,long:this.state.long}):e.createElement(y,{to:"/"})),e.createElement(C,{exact:!0,path:"/feed"},""!=this.state.sessionToken?e.createElement(x,{token:this.state.sessionToken}):e.createElement(y,{to:"/"})),e.createElement(C,{exact:!0,path:"/users"},""!=this.state.sessionToken?e.createElement(O,{token:this.state.sessionToken}):e.createElement(y,{to:"/"})),e.createElement(C,{exact:!0,path:"/rainbows"},""!=this.state.sessionToken?e.createElement(z,{token:this.state.sessionToken}):e.createElement(y,{to:"/"})),e.createElement(C,{exact:!0,path:"/comments"},""!=this.state.sessionToken?e.createElement(F,{token:this.state.sessionToken}):e.createElement(y,{to:"/"}))))),e.createElement(q,{className:"footer-section"},e.createElement(H,null))))}}T.render(e.createElement(e.StrictMode,null,e.createElement(W,null)),document.getElementById("root"));
