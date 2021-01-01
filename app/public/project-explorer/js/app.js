//initialises webpage & links a js function to a specific page
function get_cookie (name){
    const keys = document.cookie.split(";");
    for (const key of keys){
        const cookies = key.split("=");
        if(cookies[0].trim() === name) return cookies[1].trim();
    }
}
const init = () => {


    
//navbar
{
console.log("http://localhost:4000/api/users/uqdecg701wb");
    //console.log("Index page");
    const id = get_cookie("uid");
    if(id){
        //i am trying to get the cookie id...so i have to truncate
        const user_data = "/api/users/" + id;  
        //console.log("api address - " +user_data);
        let uid = user_data;
         fetch(uid)
        .then(function(response){
            return response.json();
        })
        .then((data)=>{
            //console.log(data);
            //data.firstname brings out the first name
            let left_link = document.getElementById("left_link");
            left_link.classList.add("invisible");

            let right_link = document.getElementById("right_link");
            right_link.classList.add("invisible");

            let hi_link = document.getElementById("username");
            hi_link.classList.remove("invisible");
            hi_link.innerHTML="Hi, " +data.firstname;

            let logout_link = document.getElementById("logout");
            logout_link.classList.remove("invisible");


            logout_link.addEventListener("click", function signup(e){
                e.preventDefault();
                        const key = "uid";
                        const value = "";
                        const exp = new Date();
                        exp.setDate(exp.getDate() - 5);
                        document.cookie = `${key}=${value}; expires=${exp.toUTCString()}; path=/`;
                        console.log("logged out");
/*
                        let left_link = document.getElementById("left_link");
                        left_link.classList.remove("invisible");
            
                        let right_link = document.getElementById("right_link");
                        right_link.classList.remove("invisible");
            
                        let hi_link = document.getElementById("hi_link");
                        hi_link.classList.add("invisible");
            
                        let logout_link = document.getElementById("logout");
                        logout_link.classList.add("invisible");
*/
                        window.location.replace("/project-explorer/index.html");

                   
                }) 
        })
        .catch((err)=>{
            console.log("Error: ", err.message);
        })
    
        
    }
}
    const path = window.location.href;

    if (path.includes('register.html')) {
        initRegister();
    }

    else if (path.includes('login.html')) {
        initLogin();
    }

    else if (path.includes('index.html')) {
        initIndex();
    }
    else if (path.includes('createProject.html')) {
        initCreateProject();
    }
    else if (path.includes('viewProject.html')) {
        initviewProject();
    }
}

//parses web adress on load
window.addEventListener('DOMContentLoaded', () => {
    init()
})

const initRegister = () => {
    // 
    console.log("register page");
    const program_data = "/api/programs";
    let programs = program_data;
    
    //program list population
    fetch(programs)
    .then(function(response){
        return response.json();
    })
    .then((data)=>{
        let jsonData = data;//JSON.stringify(data);
        console.log(jsonData);
        var select = document.getElementById("program");
    jsonData.forEach((value, index) => {
        let option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
    });
    })
    .catch((err)=>{
        console.log("Error: ", err.message);
    })

    //graduation year list population
    const year_data = "/api/graduationYears";
    let years = year_data;
     fetch(years)
    .then(function(response){
        return response.json();
    })
    .then((data)=>{
        let jsonData = data.reverse();  //I honestly do not like years in ascending order
  
        var select = document.getElementById("graduationYear");
     
        jsonData.forEach((value, index) => {
            let option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            select.appendChild(option);
        });
    })
    .catch((err)=>{
        console.log("Error: ", err.message);
    })

    document.getElementById("submit_btn").addEventListener("click", function signup(e){
        
        e.preventDefault();
        const user = new Object();
        user.firstname = document.getElementById("firstName").value;
        user.lastname = document.getElementById("lastName").value;
        user.email = document.getElementById("email").value;
        user.password = document.getElementById("password").value;
        document.getElementById("program").value ? user.program = document.getElementById("program").value : user.program = "not_chosen" ;
        user.matricNumber = document.getElementById("matricNumber").value;
        document.getElementById("graduationYear").value ? user.graduationYear = document.getElementById("graduationYear").value : user.graduationYear = "not_chosen" ;
       
        console.log(user);

        fetch('/api/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(async response  =>  {
            const data = await response.json();
            if(response.status == 200) {
                console.log("Good response",data);
                console.log("User id - " , data.data.id);
                const key="uid";
                const value= data.data.id;

                const exp = new Date();
                exp.setDate(exp.getDate() + 5);
                document.cookie = `${key}=${value}; expires=${exp.toUTCString()}; path=/`;
                window.location.replace("/project-explorer/index.html");
            }
            else{
                let signup_error = document.getElementById('error_block');
                signup_error.innerHTML=data.errors.join("<br/>");
                signup_error.classList.add("text-danger");
                signup_error.classList.remove("invisible");
    
            }
        }  );
        
    })
}

const initLogin = () => {
    // 
    console.log("login page");
    document.getElementById("loginBtn").addEventListener("click", function signup(e){
        
        e.preventDefault();
        const user = new Object();
        user.email = document.getElementById("email").value;
        user.password = document.getElementById("password").value;
       
       
        console.log(user);

        fetch('/api/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(async response  =>  {
            const data = await response.json();
            if(response.status == 200) {
                console.log("Good response",data);
                console.log("User id - " , data.data.id);
                const key="uid";
                const value= data.data.id;

                const exp = new Date();
                exp.setDate(exp.getDate() + 5);
                document.cookie = `${key}=${value}; expires=${exp.toUTCString()}; path=/`;
                window.location.replace("/project-explorer/index.html");
            }
            else{
                let login_error = document.getElementById('error_block');
                login_error.innerHTML="Invalid email/password";
                login_error.classList.add("text-danger");
                login_error.classList.remove("invisible");
    
            }
        }  );
        
    })
}


const initIndex = () => {
    // 
    console.log("index page");
    const project_data = "/api/projects";
    let projects = project_data;
    
    //program list population
    fetch(projects)
    .then(function(response){
        return response.json();
    })
    .then((data)=>{
        let jsonData = data;//JSON.stringify(data);
        console.log(jsonData);
        let i=0;
        while(jsonData[i]){
           
           console.log("i "+i);
            let project_carousel = document.getElementById("project_bar");
            let border_section = document.createElement('section');
            project_carousel.appendChild(border_section);
 
            border_section.classList.add("card");
            border_section.classList.add("mb-2");
            border_section.style.width="16rem";
            console.log("round 1");

            let inner_section = document.createElement('section');
            inner_section.classList.add("card-body");
            
            border_section.appendChild(inner_section);
            let title = document.createElement('h5');
            title.classList.add("card-title");
            title.classList.add("text-primary");
            title.textContent = jsonData[i].name;
            console.log("round 2");
            inner_section.appendChild(title);
            console.log(jsonData[i].name);
            
            console.log("round 3");

            let subtitle = document.createElement('h6');
            subtitle.classList.add("card-subtitle");
            subtitle.classList.add("text-muted");
            subtitle.classList.add("mb-2");
            subtitle.textContent = jsonData[i].authors;
            inner_section.appendChild(subtitle);
            console.log("round 4");

            let text = document.createElement('p');
            text.classList.add("card-text");
            text.textContent = jsonData[i].abstract;
            inner_section.appendChild(text);
            console.log("round 5");

            let taglink = document.createElement('a');
            taglink.classList.add("card-link");
            let authors = document.createTextNode("#" + jsonData[i].tags);
            taglink.appendChild(authors);
            taglink.title = authors;
            console.log(authors);
            taglink.href = authors;

            //taglink.appendChild(authors);
            console.log("round 6");
            inner_section.appendChild(taglink);
            console.log("round 7");


            let project_id = jsonData[i].id;
            inner_section.addEventListener("click", function signup(e){
                e.preventDefault();
                console.log("link"+project_id);
                let link = "/project-explorer/viewProject.html?id="+project_id;
                window.location.replace(link);

                   
                }) 

            i=i+1;
        }
    })
    .catch((err)=>{
        console.log("Error: ", err.message);
    })
}

const initCreateProject = () => {
    console.log("Create project page");
    if(!get_cookie("uid")) window.location.replace("/project-explorer/login.html");
    document.getElementById("createProjectBtn").addEventListener("click", function signup(e){
        
        console.log("create project btn clicked");
        e.preventDefault();
        let project= new Object();

        project.name = document.getElementById("project_name").value;
        project.abstract = document.getElementById("project_abstract").value; 
        project.authors = document.getElementById("project_authors").value;;
        project.tags = document.getElementById("project_tags").value; 


        project.authors = project.authors.split(",");
        project.tags = project.tags.split(",");
       

        console.log(project);

        fetch('/api/projects',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then(async response  =>  {
            const data = await response.json();
            console.log("dataxx\n", data);
            if(response.status == 200) {
                console.log("Good response",data);
                window.location.replace("/project-explorer/index.html");
            }
            else{
                let signup_error = document.getElementById('error_block');
                console.log=data.errors;
                if(data.errors>0){
                signup_error.innerHTML=data.errors.join("<br/>");
                }
                else{
                    signup_error.innerHTML=data.errors.join;  
                }
                signup_error.classList.add("text-danger");
                signup_error.classList.remove("invisible");
    
            }
        }
    );
});


}

const initviewProject = () => {
    // 
    console.log("View project page");
    const project_data = "/api/projects";
    const p_ID = window.location.href.split('=')[1];
    console.log(p_ID);
    let projects = project_data;
    console.log(projects);

    fetch(projects)
    .then(function(response){
        return response.json();
    })
    .then((data)=>{
        /*
        let jsonData = data;//JSON.stringify(data);
        console.log(jsonData);
        */
       for(let i=0; i<data.length; i++){
           if(data[i].id == p_ID) jsonData=data[i];
       }
       console.log(jsonData);
        //console.log(jsonData);
        //console.log(jsonData[0].name);
        document.getElementById("project_name").innerHTML = jsonData.name; //name
        document.getElementById("project_abstract").innerHTML = jsonData.abstract; //abstract
          
          let author_list = document.getElementById("project_authors");
          author_list.setAttribute("name","project_authors");
          console.log("xxx");
        for (let i=0; i<jsonData.authors.length; i=i+1){
            
            console.log("authors" +jsonData.authors);
            let option = document.createElement('option');
            option.value = jsonData.authors[i];
            option.textContent = jsonData.authors[i];
            option.classList.add("list-group");
            option.classList.add("list-group-item");
            option.classList.add("list-group-flush");
            author_list.appendChild(option);
        }
        let tag_list = document.getElementById("project_tags");
        let Tags = document.createElement('option');
        Tags.setAttribute("name","project_tags");
        Tags.textContent = jsonData.tags; //tags
        Tags.textContent = "#" + Tags.textContent.split(" ").join(" #")
        //Tags.classList.add("list-group-item");
        Tags.classList.add("bg-light");
        Tags.classList.add("text-primary");
        tag_list.appendChild(Tags);
        author_list.appendChild(tag_list);

        const createdBy = document.getElementById("project_author");
        const createdBy_ID = jsonData.createdBy;
        const link = "/api/users/" + createdBy_ID ;
        let created_link = link;
        console.log(created_link);
        fetch(created_link)
        .then(function(response){
            return response.json();
        })
        .then((data)=>{
            console.log("api/users link");
            console.log(data);
            createdBy.innerHTML=data.firstname; //id doesnt exist
        })
        .catch((err)=>{
            console.log("Error: ", err.message);
        })
        
    })
    .catch((err)=>{
        console.log("Error: ", err.message);
    })
    
}


     