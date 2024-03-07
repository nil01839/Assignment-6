const loadCategoryData = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    showCategoryData(data.data.news_category);
}

const showCategoryData = categories =>{
     //console.log(categories);
    const categoriesContainer = document.getElementById('category-container');
    categories.forEach(category=>{
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('col')
        //categoryDiv.classList.add('hover:text-cyan-500', 'duration: 500');
        //console.log(category);
        //categoryDiv.innerText = category.category_name;
        categoryDiv.innerHTML = `
       <div onClick = "loadNewsByCategory('${category.category_id}')">${category.category_name}</div>`
        categoriesContainer.appendChild(categoryDiv);
    })

}
loadCategoryData();