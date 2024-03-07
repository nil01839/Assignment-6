const loadCategoryData = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    showCategoryData(data.data.news_category);
}

const showCategoryData = categories =>{
     console.log(categories);
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

const loadNewsByCategory =async id =>{
    const url =`https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    showNewsByCategory(data.data);
    //initModal();
}

const excerpt = (text) => {
    return text.substring(0, 120) + '...';
}

const showNewsByCategory = allNews =>{
    //console.log(allNews);
    const newsByCategoryContainer = document.getElementById('show-news-by-caegory');
    newsByCategoryContainer.textContent = '';
    allNews.forEach(news=>{
        //console.log(news._id);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
        <!-- Card -->
        <div class="card">
          <img src="${news.image_url}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${news.title}</h5>
            <p class="card-text">${excerpt(news.details)}</p>
            <div>
                <div>Author: ${news.author.name}</div>
                <div>Date: ${news.author.published_date}</div>
                <div>Views: ${news.total_view}</div>
                <div>Rating: ${news.rating.number}</div>

                <button onClick="loadDetails('${news._id}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailModal">Show Details</button>

            </div>
          </div>
        </div>
        `
        newsByCategoryContainer.appendChild(newsDiv);
    })

}

const loadDetails = async(idd) =>{
    const url = `https://openapi.programming-hero.com/api/news/${idd}`
    const res = await fetch(url);
    const data = await res.json();
    showNewsDetails(data.data[0]);
}

const showNewsDetails = news =>{
    console.log(news);
    const modalTitle = document.getElementById('newsTitle');
    modalTitle.innerHTML = news.title;
    const detailsContainer = document.getElementById('news-details');
    detailsContainer.innerHTML = `
    <p>${news.details}</p>
    `
    
}
loadCategoryData();
loadNewsByCategory("08");

