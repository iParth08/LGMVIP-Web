
const reset = document.querySelector("#reset");
const table = document.querySelector(".table");

const person = document.getElementById("name");
const email = document.getElementById("email");
const website = document.getElementById("website");
const profile = document.getElementById("profile");

const gen_male = document.getElementById("male");
const gen_female = document.getElementById("female");

const skills = document.getElementsByClassName("tick");

function nextEnroll(){
    let new_row = document.createElement("div");
    new_row.classList.add("row");

    let desc = document.createElement("div");
    desc.classList.add("desc-col");

    let image = document.createElement("div");
    image.classList.add("image-col");

    // variables
    let gender = '';
    let skill_set = '';
    let profile_pic = '';

    if(gen_female.checked){
        gender = gen_female.value;
    }
    else if(gen_male.checked){
        gender = gen_male.value;
    }
    else{
        gender = "Not Specified!";
    }

    for(let i=0; i<skills.length; i++){
        if(skills[i].checked){
            skill_set += skills[i].value + " ";
        }
    }

    // add image
    if(profile.value == ''){
        if(gender === 'Female'){
            profile_pic = 'img/female.webp';
        }else{
            profile_pic = 'img/male.jpg';
        }
    }else{
        profile_pic = profile.value;
    }
    // console.log(profile_pic);
    image.innerHTML = `<img src="${profile_pic}" alt="Profile">`;
    

    //  add details
    desc.innerHTML =
    `<p>${person.value}</p>  
    <p>${gender}</p>
    <a href="mailto:${email.value}">${email.value}</a><br />
    <a href="${website.value}" target="_blank">${website.value}</a>
    <p>${skill_set}</p>
    `;

    if(person.value == '' || email.value == ''){
        alert("Fill out Properly");
    }
    else{
        new_row.appendChild(desc);
        new_row.appendChild(image);
        table.appendChild(new_row);
        reset.click(); //reset form
    }
}

