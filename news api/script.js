// 8789d0da8eeb46ce94be5b0608ac3c35
const apikey = "8789d0da8eeb46ce94be5b0608ac3c35"

const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input")
const btn = document.getElementById("search-button")

btn.addEventListener('click', async (e) => {
    const query = searchField.value.trim()
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query)
            diplayBlogs(articles)
        } catch (error) {
            console.log(error)
        }
    }
})

async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=2024-01-12&sortBy=publishedAt&pageSize=12&apikey=${apikey}`;
        const response = await fetch(apiUrl)
        const data = await response.json()
        console.log(data)
        return data.articles
    } catch (error) {
        console.log(error)
        return []
    }
}

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=tesla&from=2024-01-12&sortBy=publishedAt&pageSize=12&apikey=${apikey}`;
        const response = await fetch(apiUrl)
        const data = await response.json()
        console.log(data)
        return data.articles
    } catch (error) {
        console.log(error)
        return []
    }
}

function diplayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div")
        blogCard.classList.add("blog-card")
        const img1 = document.createElement("img")
        img1.src = article.urlToImage;
        img1.alt = article.title
        const title = document.createElement("h2");
        // title.textContent = article.title;
        const TruncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "...." : article.title
        title.textContent = TruncatedTitle;
        const desc = document.createElement("p")
        const TruncatedDes = article.description.length > 120 ? article.description.slice(0, 120) + "...." : article.description

        desc.textContent = TruncatedDes;

        blogCard.appendChild(img1)
        blogCard.appendChild(title)
        blogCard.appendChild(desc)
        blogCard.addEventListener('click', () => {
            window.open(article.url, "_blank")
        })
        blogContainer.appendChild(blogCard)
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews()
        console.log(articles)
        diplayBlogs(articles);
    } catch (error) {
        console.log(error)
    }
})();