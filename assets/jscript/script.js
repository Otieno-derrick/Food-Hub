const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');


searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                         <div id="star"> 
                            <i class="fas fa-star checked"></i>
                            <i class="fas fa-star checked"></i>
                            <i class="fas fa-star checked"></i>
                            <i class="fas fa-star checked"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <div>
                        <i class="fas fa-cart"></i>
                        </div>

                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Oops invalid search!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}


function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}



window.onload = function() {  
  const slider = new AutoSlider("#main-slider");

};

class AutoSlider {
  constructor(element) {
      this.el = document.querySelector(element);
      this.image();
  }

  image() {
      this.slides = this.el.querySelectorAll(".slide");
      this.index = 0;
      this.timer = null;
      this.delay = 6500;
      this.action();
      this.addHoverListener();
  }

  _slideTo(slide) {
      const currentSlide = this.slides[slide];
      currentSlide.style.opacity = 1;

      for (let i = 0; i < this.slides.length; i++) {
          let slide = this.slides[i];
          if (slide !== currentSlide) {
              slide.style.opacity = 0;
          }
      }
  }

  action() {
      this.timer = setInterval(function () {
          this.index++;
          if (this.index == this.slides.length) {
              this.index = 0;
          }
          this._slideTo(this.index);
      }.bind(this), this.delay);
  }

  addHoverListener() {
      this.el.addEventListener("mouseover", function () {
          clearInterval(this.timer);
          this.timer = null;
      }.bind(this));
    
      this.el.addEventListener("mouseout", function () {
          this.action();
      }.bind(this));
  }
}