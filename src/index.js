let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toysCollection  = document.getElementById('toy-collection')
  
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(getToys)

  function getToys(toys){
    toys.map((toy)=> {
      toysCollection.innerHTML +=
      `<div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes</p>
      <button class="like-btn" id=${toy.id}>Like <3</button>
      <button class="delete-btn" id=${toy.id}>Delete</button>
      </div>`
    })

  }



    toyFormContainer.addEventListener('submit', (e) => {
      e.preventDefault();
      const toyName = e.target.name.value
      const toyImage = e.target.image.value
      // debugger
      fetch('http://localhost:3000/toys', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Accept': "application/json"
        },
        body: JSON.stringify({
          name: toyName,
          image: toyImage,
          likes: 100
        })
      })

      .then(response => response.json())
      .then(newToy => {
        `<div class="card">
        <h2>${newToy.name}y</h2>
        <img src=${newToy.image} class="toy-avatar" />
        <p>${newToy.likes} likes </p>
        <button class="like-btn" id=${newToy.id}>Like <3</button>
        <button class="delete-btn" id=${newToy.id}>Delete</button>
        </div>`
      e.target.reset()
      })
      

      
    })

    toysCollection.addEventListener('click', (e) => {
      if(e.target.className === 'like-btn') {
        let currentLikes = parseInt(e.target.previousElementSibling.innerText)
        let newLikes = currentLikes + 1

        fetch(`http://localhost:3000/toys/${e.target.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          'Accept': "application/json"
        },
        body: JSON.stringify({
          likes: newLikes
        })
      })

      .then(response => response.json())
      .then(toy => {
        // debugger
        e.target.previousElementSibling.innerText = `${toy.likes} Likes`

      })

      }

      if(e.target.className === 'delete-btn') {
        fetch(`http://localhost:3000/toys/${e.target.id}`, {
        method: 'DELETE'
      })
      .then(response => e.target.parentElement.remove())
        
      }

    })

   



    









  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
