const categoriescontainer = document.getElementById("categories-container")
const newscontainer = document.getElementById("news-container");
const yourcartcontainer = document.getElementById("your-cart-container")
const loadCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(data => {
            //console.log(data.categories);
            const categories = data.categories;
            showategories(categories)

        })
        .catch(error => console.error(error));
}

//aber amra display korbo categories
const showategories = (categories) => {
    //console.log(categories);
    categories.forEach(cat => {
        categoriescontainer.innerHTML += `
    <button  id="${cat.id}" class="w-full flex justify-start hover:bg-green-500 hover:text-white rounded-sm p-2">
  ${cat.category_name}
</button>
    `
    })

}
//aber amra kono akta button a click krle bujhta pari 
categoriescontainer.addEventListener('click', (e) => {
    const allBtn = document.querySelectorAll("button")
    allBtn.forEach(button => {
        button.classList.remove("bg-green-500")
    })
    if (e.target.tagName === 'BUTTON') {
        showloading()
        e.target.classList.add("bg-green-500")

        newsbycategory(e.target.id);   
    }
})
///amra aber click korle display korbe ogula anbo
const newsbycategory = (categoryId) => {   
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
        .then(res => res.json())
        .then(data => {
            shownewsbycategory(data.plants)
        })
}
const shownewsbycategory = (articles) => {
///modal for click arm por
    newscontainer.innerHTML = "";
    articles.forEach(article => {
        newscontainer.innerHTML += `
    <div class=" card bg-white p-2 h-[530px] mb-3">
                    <div>
                        <img class="h-60 w-70 rounded-sm " src="${article.image}" alt="">
                    </div>
                    <div class="space-y-3">
                    

        <h1 onclick="loadworddetail(${article.id})" class="font-bold">${article.name}</h1>



                        <p class="text-gray-500 h-[130px]">${article.description}</p>
                    </div>
                    <div class=" flex justify-between py-4">
                        
               <p class=" bg-[#CFF0DC] rounded-full p-2">${article.category}</p>
                          <p class="text-lg font-semibold text-green-700">৳${article.price}</p>
                    </div>
                    <div><button class="bg-green-700 w-full rounded-full text-white"> Add to Cart</button></div>

                </div>
    `

    })
}







// aber jata kono kisute click na krlew display show kore ajonno  

const allnewsbycatageory = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then(res => res.json())
        .then(data => {
            //console.log(data.plants)
            allshownewsbycategory(data.plants)
        })
}


const allshownewsbycategory = (articles) => {
//amr akhne modal add kora
    newscontainer.innerHTML = "";
    articles.forEach(article => {
        newscontainer.innerHTML += `
    <div class=" card bg-white p-2  h-[530px] mb-3">
                    <div>
                        <img class="h-60 w-70 rounded-sm text-xl font-medium" src="${article.image}" alt="">
                    </div>
                    <div class=" my-2">
                    
                   <h1 onclick="loadworddetail(${article.id})" class="font-bold">${article.name}</h1>

                        <p class="text-gray-500 h-[190px]">${article.description}</p>
                    </div>
                    <div class=" flex justify-between py-4">
                        
                 <p class=" bg-[#CFF0DC] rounded-full p-2">${article.category}</p>
                          <p class="text-lg font-semibold text-green-700">৳${article.price}</p>
                    </div>
                    <div><button  id="${article.id}"   class="bg-green-700 w-full rounded-full text-white"> Add to Cart</button></div>

                </div>
    `
    })
}
////modal adddd krarar jonno function
const loadworddetail=async(id)=>{
    const url=`https://openapi.programming-hero.com/api/plant/${id}`
    const res= await fetch(url)
    const details=await res.json();
    displayloadworddetail(details.plants)
}
const displayloadworddetail = (id) => {
  const detailscontainer = document.getElementById("details-container");
  detailscontainer.innerHTML = `
    <div class="space-y-3">
      <h1 class="font-bold text-xl ">${id.name}</h1>
      <div class=" ">
        <img class="w-full max-w-[250px] max-h-[150px] rounded-md mx-auto" src="${id.image}" >

      </div>
      <div class="space-y-2 text-sm">
        <h4><span class="font-bold">Category:</span> ${id.category}</h4>
        <h2><span class="font-bold">Price:</span> ${id.price}</h2>
        <p><span class="font-bold">Description:</span> ${id.description}</p>
      </div>
    </div>`;
  document.getElementById("word_modal").showModal();
};



///crt display
const bookmarks = []

//  aber your cart niya
newscontainer.addEventListener('click', (e) => {
    if (e.target.innerText.trim() === "Add to Cart") {

        handlebooksmarks(e)
    }
})
const handlebooksmarks = (e) => {
    const card = e.target.closest(".card");


    const name = card.querySelector("h1").innerText;
    const price = card.querySelector("p.text-lg").innerText;
    const image = card.querySelector("img").src;

    // alert section added
    alert(`green-Earth-prep-nrtify-says\n${name} has been added to the cart`);



    bookmarks.push({
        title: name,
        prices: price,
    })

    showbooksmarks(bookmarks)

}
const showbooksmarks = (bookmarks) => {
    yourcartcontainer.innerHTML = "";

    let total = 0; 

    bookmarks.forEach((bookmark, index) => {
        const priceNumber = parseInt(bookmark.prices.slice(1)); 
        total += priceNumber;

        // cart item div
        const cartItem = document.createElement('div');
        cartItem.classList.add("flex", "justify-between", "items-center", "bg-white", "rounded-md", "p-4", "my-1");
        cartItem.innerHTML = `
            <div>
                <h1 class="font-semibold">${bookmark.title}</h1>
                <p class="text-green-700">${bookmark.prices}</p>
            </div>
            <div>
                <p class="text-red-500 cursor-pointer">
                    <i class="fa-solid fa-xmark"></i>
                </p>
            </div>
        `;

        // minus button click event
        const minusBtn = cartItem.querySelector("i");
        minusBtn.addEventListener('click', () => {
            //
            bookmarks.splice(index, 1); // 
            showbooksmarks(bookmarks); //
        });

        yourcartcontainer.appendChild(cartItem);
    });

    
    const totalPrice = bookmarks.reduce((sum, b) => sum + parseInt(b.prices.slice(1)), 0);
    document.getElementById("totall").innerText = `৳${totalPrice}`;
};
const showloading = () => {
    newscontainer.innerHTML += `
    <div class="bg-red-600 p-3 font-bold text-2xl">loading....</div>`
}
loadCategory();

allnewsbycatageory();